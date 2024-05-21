<script>
    import "../../app.css";
    import { AppShell } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";

    async function logout() {
        const formData = new FormData();
        const response = await fetch("/logout", { method: "POST", body: formData });
        if (response.ok) {
            goto('/login', { replaceState: true });
        }
    }
</script>

<div class="relative flex justify-center">
    <AppShell>
        <svelte:fragment slot="header">
            <a href="/" class="btn variant-glass">Home</a>
            <a href="/graph" class="btn variant-glass">Graph</a>
            <button on:click={logout}>Logout</button>
        </svelte:fragment>
        <slot/>
    </AppShell>
</div>
