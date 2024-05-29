<script>
    import "../../app.css";
    import { AppShell } from "@skeletonlabs/skeleton";
</script>

<div class="relative flex justify-center">
    <AppShell>
        <svelte:fragment slot="header">
            <a href="/admin" class="btn variant-glass">Home</a>
            <a href="/admin/graph" class="btn variant-glass">Graph</a>
            <a href="/logout" class="btn variant-glass">Logout</a>
        </svelte:fragment>
        <slot/>
    </AppShell>
</div>