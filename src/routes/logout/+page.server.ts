import { pb } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export function load() {
    pb.authStore.clear();

    redirect(308, "/login")
}