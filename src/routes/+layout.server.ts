import { prisma } from "$lib/server/prisma";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
    if (event.locals.user) {
        event.locals.user.avatar = await prisma.avatar.findUnique({
            where: {
                userId: event.locals.user.id,
            },
        });
        console.log(event.locals.user);
    }

    return {
        user: event.locals.user,
    };
};
