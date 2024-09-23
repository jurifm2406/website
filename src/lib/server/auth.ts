import { dev } from "$app/environment";
import { prisma } from "$lib/server/prisma";
import type { NotificationType, Role } from "$lib/types";
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
            id: attributes.id,
            username: attributes.username,
            name: attributes.name,
            role: attributes.role,
            avatar: attributes.avatar,
            notifications: attributes.notifications,
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
    id: string;
    username: string;
    name?: string;
    role: Role;
    avatar: {
        variant: "beam" | "bauhaus";
        hex: string[];
    };
    notifications: {
        id: number;
        template: {
            type: NotificationType;
            content: string;
        };
        origin: {
            username: string;
        } | null;
        createdAt: Date;
    }[];
}
