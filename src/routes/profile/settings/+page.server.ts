import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
    update: async (event) => {
        const data = Object.fromEntries(await event.request.formData());

        if (data.name && typeof data.name === "string") {
            const name = data.name;
            await prisma.user.update({
                where: {
                    username: event.locals.user?.username,
                },
                data: {
                    name,
                },
            });
        }

        if (
            typeof data.hex1 === "string" &&
            typeof data.hex2 === "string" &&
            typeof data.hex3 === "string" &&
            typeof data.hex4 === "string" &&
            typeof data.hex5 === "string"
        ) {
            await prisma.avatar.update({
                where: {
                    userId: event.locals.user?.id,
                },
                data: {
                    hex: [
                        data.hex1,
                        data.hex2,
                        data.hex3,
                        data.hex4,
                        data.hex5,
                    ],
                },
            });
        }
    },
    delete: async (event) => {
        await prisma.user.delete({
            where: {
                username: event.locals.user?.username,
            },
        });

        redirect(303, "/");
    },
} satisfies Actions;
