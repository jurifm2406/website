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
        const password_confirm = formData.get("password_confirm");

        if (
            typeof username !== "string" ||
            username.length < 3 ||
            username.length > 31 ||
            !/^[a-z0-9_-]+$/.test(username)
        ) {
            return fail(422, {
                usernameInvalid: true,
            });
        }
        if (typeof name !== "string" && name !== null) {
            return fail(422, {
                unknownError: true,
            });
        }
        if (
            typeof password !== "string" ||
            password.length < 6 ||
            password.length > 255
        ) {
            return fail(422, {
                passwordInvalid: true,
            });
        }

        if (!password_confirm || password_confirm !== password) {
            return fail(422, {
                passwordMismatch: true,
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
            return fail(422, {
                userDuplicate: true,
            });
        }

        const colors: string[] = [];

        for (let i = 0; i < 5; i++) {
            colors.push(
                "#000000".replace(/0/g, () =>
                    (~~(Math.random() * 16)).toString(16),
                ),
            );
        }

        await prisma.user.create({
            data: {
                id: userId,
                name: name,
                username: username,
                password_hash: passwordHash,
                avatar: {
                    create: {
                        variant: "beam",
                        hex: colors,
                    },
                },
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
