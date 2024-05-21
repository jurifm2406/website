// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";

export const actions = {
    default: async (event: import('./$types').RequestEvent) => {
        const data = await event.request.formData();
        const username = data.get("username");
        const password = data.get("password");
        let success = true;

        if (typeof username === "string" && typeof password === "string") {
            try {
                await event.locals.pb.collection("users").authWithPassword(username, password);
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
            redirect(308, "/");
        }
    },
};
;null as any as Actions;