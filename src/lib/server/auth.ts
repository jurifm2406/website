import { dev } from "$app/environment";
import { prisma } from "$lib/server/prisma";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev,
        },
    },
    getUserAttributes: (attributes: DatabaseUserAttributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            username: attributes.username,
            name: attributes.name,
            admin: attributes.admin,
        };
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string;
    name?: string;
    admin: boolean;
}
