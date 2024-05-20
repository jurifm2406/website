<script>
    import { pb } from "$lib/server/auth";
    import { redirect } from "@sveltejs/kit";
    import "../app.css";
    import { AppShell } from "@skeletonlabs/skeleton";
</script>

<div class="relative flex justify-center">
    <AppShell>
        <svelte:fragment slot="header">
            <a href="/" class="btn variant-glass">Home</a>
            <a href="/graph" class="btn variant-glass">Graph</a>
            <button on:click={pb.authStore.clear(); redirect(308, "/login")}>Logout</button>
        </svelte:fragment>
        <slot/>
    </AppShell>
</div>
