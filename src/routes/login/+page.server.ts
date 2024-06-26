// routes/login/+page.server.ts
import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { compare } from "bcrypt";

import { prisma } from "$lib/server/prisma";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get("username");
        const password = formData.get("password");

        if (
            typeof username !== "string" ||
            username.length < 3 ||
            username.length > 31 ||
            !/^[a-z0-9_-]+$/.test(username)
        ) {
            return fail(400, {
                incorrect: true,
            });
        }
        if (
            typeof password !== "string" ||
            password.length < 6 ||
            password.length > 255
        ) {
            return fail(400, {
                incorrect: true,
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!existingUser) {
            return fail(400, {
                incorrect: true,
            });
        }

        const validPassword = await compare(
            password,
            existingUser.password_hash,
        );

        if (!validPassword) {
            return fail(400, {
                incorrect: true,
            });
        }

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes,
        });

        redirect(302, "/");
    },
};
