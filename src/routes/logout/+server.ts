import { lucia } from "$lib/server/auth";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, cookies }) => {
    if (!locals.session) {
        return new Response(null, {
            status: 400,
        });
    }

    await lucia.invalidateSession(locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
    });

    return new Response(null, {
        status: 200,
    });
};
