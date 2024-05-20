import { pb } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { ClientResponseError } from "pocketbase";

export const actions: Actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const username = data.get("username");
        const password = data.get("password");
        let success = true;

        if (typeof username === "string" && typeof password === "string") {
            try {
                await pb.collection("users").authWithPassword(username, password);
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
