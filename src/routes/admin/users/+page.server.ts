import { prisma } from "$lib/server/prisma";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            avatar: true,
            username: true,
            name: true,
            role: true,
        },
    });

    return {
        users: users,
    };
};

export const actions: Actions = {
    edit: async (event) => {
        const data = await event.request.formData();
        const id = data.get("id");
        const name = data.get("name");
        const role = data.get("role");

        if (
            typeof id === "string" &&
            typeof name === "string" &&
            (role === "user" || role === "admin")
        ) {
            await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                    role: role,
                },
            });
        }
    },
    delete: async (event) => {
        const data = await event.request.formData();
        const id = data.get("id");

        if (typeof id === "string") {
            await prisma.user.delete({
                where: {
                    id,
                },
            });
        } else {
            return fail(500, { error: true });
        }
    },
};
