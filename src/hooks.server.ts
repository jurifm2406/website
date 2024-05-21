import { redirect, type Handle } from "@sveltejs/kit"
import PocketBase from "pocketbase"

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase('http://127.0.0.1:8090');

    // load the store data from the request cookie string
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
    } catch (_) {
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
    }

    if (!event.url.pathname.startsWith("/login")) {
        if (!event.locals.pb.authStore.isAuthRecord) {
            redirect(308, "/login")
        }
    } 
    
    /*else if (event.url.pathname.startsWith("/login")) {
        if (event.locals.pb.authStore.isAdmin) {
            redirect(308, "/admin")
        } else {
            redirect(308, "/")
        }
    }*/

    if (event.url.pathname.startsWith("/(admin)/admin")) {
        if (!event.locals.pb.authStore.isAdmin) {
            redirect(308, "/login/admin")
        }
    }

    const response = await resolve(event);

    // send back the default 'pb_auth' cookie to the client with the latest store state
    response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie());

    return response;
}