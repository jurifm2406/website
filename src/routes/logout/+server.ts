import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals }) => {
    locals.pb.authStore.clear();

    return new Response("Logout successful", { status: 200 });
}