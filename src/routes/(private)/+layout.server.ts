import { pb } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export function load() {
    if (pb.authStore.model === null) {
        redirect(308, "/login");
    }
}
