// @ts-nocheck
import { pb } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";

export async function load() {
    if (pb.authStore.isAdmin) {
        redirect(308, "/admin");
    }
}

export const actions = {
    default: async (event: import('./$types').RequestEvent) => {
        const data = await event.request.formData();
        const username = data.get("username");
        const password = data.get("password");
        let success = true;

        if (typeof username === "string" && typeof password === "string") {
            try {
                await pb.admins.authWithPassword(username, password);
            } catch (error) {
                if (error instanceof ClientResponseError) {
                    console.error(error.message);
                }
                success = false;
            }
        } else {
            console.error("Username and password must be strings!");
            success = false;
        }

        if (success) {
            redirect(308, "/admin");
        }
    },
};
;null as any as Actions;