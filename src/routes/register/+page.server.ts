import { lucia } from "$lib/server/auth";
import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import { hash } from "bcrypt";
import { generateIdFromEntropySize } from "lucia";

import type { Actions } from "./$types";

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get("username");
        const name = formData.get("name");
        const password = formData.get("password");

        if (
            typeof username !== "string" ||
            username.length < 3 ||
            username.length > 31 ||
            !/^[a-z0-9_-]+$/.test(username)
        ) {
            return fail(400, {
                message: "Invalid username",
            });
        }
        if (typeof name !== "string" && name !== null) {
            return fail(400, {
                message: "An error occured",
            });
        }
        if (
            typeof password !== "string" ||
            password.length < 6 ||
            password.length > 255
        ) {
            return fail(400, {
                message: "Invalid password",
            });
        }

        const userId = generateIdFromEntropySize(10); // 16 characters long
        const passwordHash = await hash(password, 10);

        const exists = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (exists) {
            return fail(400, {
                message: "user already exists",
            });
        }

        await prisma.user.create({
            data: {
                id: userId,
                name: name,
                username: username,
                password_hash: passwordHash,
            },
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes,
        });

        redirect(302, "/");
    },
};
