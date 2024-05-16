import { pb } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export function load() {
    if (!pb.authStore.isAdmin) {
        redirect(308, "/login/admin");
    }
}
