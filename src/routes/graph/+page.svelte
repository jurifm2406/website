<script>
    import { dark } from "$lib/stores";
    import { get } from "svelte/store";
    import { Button, Popover, Spinner } from "flowbite-svelte";
    import QuestionCircleOutline from "flowbite-svelte-icons/QuestionCircleOutline.svelte";
    import NetworkGraph from "$lib/components/NetworkGraph.svelte";
    export let data;

    $: color = get(dark) ? "#fff" : "#000";
    dark.subscribe((value) => (color = value ? "#fff" : "#000"));
</script>

<div class="w-full h-full">
    {#await data.graph}
        <div class="text-center h-full flex items-center justify-center">
            <Spinner />
        </div>
    {:then graph}
        <Button
            id="what"
            class="absolute !p-2 !mt-4 bg-black border border-black text-white hover:text-black dark:bg-white dark:border dark:border-white dark:text-black dark:hover:text-white dark:hover:bg-black"
            pill={true}><QuestionCircleOutline size="sm" /></Button
        >
        <Popover
            class="[&_div]:bg-white [&_div]:border-black w-80 text-sm font-light py-2 px-3 bg-white shadow text-black dark:bg-black dark:border dark:text-white dark:[&_div]:bg-black"
            title="what's this?"
            triggeredBy="#what"
            placement="bottom-end"
            >one day i realized i completely lost track of who is friends with
            who, so i made this graph (work in progress). the only criteria at
            the moment is that that people spend time with each other apart from
            a school context.</Popover
        >
        <NetworkGraph {color} rawLinks={graph.links} rawNodes={graph.nodes} />
    {/await}
</div>
