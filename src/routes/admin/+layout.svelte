<script>
    import "../../app.css";
    import { AppShell } from "@skeletonlabs/skeleton";
</script>

<div class="relative flex justify-center">
    <AppShell>
        <svelte:fragment slot="header">
            <a class="btn variant-glass" href="/admin">Home</a>
            <a class="btn variant-glass" href="/admin/graph">Graph</a>
            <a class="btn variant-glass" href="/logout">Logout</a>
        </svelte:fragment>
        <slot/>
    </AppShell>
</div>