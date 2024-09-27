import { lucia } from "$lib/server/auth";
import { prisma } from "$lib/server/prisma";
import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const authentication: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get(lucia.sessionCookieName);
    if (!sessionId) {
        event.locals.user = null;
        event.locals.session = null;
        return resolve(event);
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session?.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes,
        });
    }

    if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes,
        });
    }
    event.locals.user = user;

    const avatar = await prisma.avatar.findFirst({
        where: {
            userId: event.locals.user?.id,
        },
        select: {
            variant: true,
            hex: true,
        },
    });

    const notifications = (
        await prisma.notificationsToUsers.findMany({
            where: {
                userId: event.locals.user?.id,
            },
            select: {
                notification: {
                    select: {
                        origin: {
                            select: {
                                id: true,
                                username: true,
                            },
                        },
                        id: true,
                        template: {
                            select: {
                                type: true,
                                content: true,
                            },
                        },
                        createdAt: true,
                    },
                },
            },
        })
    ).map((notification) => notification.notification);

    if (event.locals.user) {
        if (avatar) {
            event.locals.user.avatar = avatar;
        }
        event.locals.user.notifications = notifications;
    }

    event.locals.session = session;

    return resolve(event);
};

const authorization: Handle = async ({ event, resolve }) => {
    if (
        (event.url.pathname.startsWith("/login") ||
            event.url.pathname.startsWith("/register")) &&
        event.locals.user
    ) {
        return redirect(303, "/");
    }

    if (
        event.url.pathname !== "/" &&
        !event.url.pathname.startsWith("/login") &&
        !event.url.pathname.startsWith("/register") &&
        !event.locals.user
    ) {
        return redirect(303, "/");
    }

    if (
        event.url.pathname.startsWith("/admin") &&
        event.locals.user?.role !== "admin"
    ) {
        return redirect(303, "/");
    }

    return resolve(event);
};

export const handle: Handle = sequence(authentication, authorization);
