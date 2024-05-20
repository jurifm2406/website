import { redirect, type Handle } from "@sveltejs/kit"
import { pb } from "$lib/server/auth"

export const handle: Handle = async ({ event, resolve }) => {
    if (!event.url.pathname.startsWith("/login")) {
        if (!pb.authStore.isAuthRecord) {
            redirect(308, "/login")
        }
    }

    if (event.url.pathname.startsWith("/(admin)/admin")) {
        if (!pb.authStore.isAdmin) {
            redirect(308, "/login/admin")
        }
    }

    return resolve(event)
}