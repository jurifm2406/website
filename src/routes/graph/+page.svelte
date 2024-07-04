<script>
import { onMount } from "svelte";
import {
    scaleLinear,
    scaleOrdinal,
    forceSimulation,
    forceLink,
    forceManyBody,
    forceCenter,
    zoom,
    zoomIdentity,
    drag,
    select,
    selectAll,
} from "d3";
import { dark } from "$lib/stores";
import { get } from "svelte/store";
import { Button, Popover } from "flowbite-svelte";
import QuestionCircleOutline from "flowbite-svelte-icons/QuestionCircleOutline.svelte";

let d3 = {
    zoom,
    zoomIdentity,
    scaleLinear,
    scaleOrdinal,
    select,
    selectAll,
    drag,
    forceSimulation,
    forceLink,
    forceManyBody,
    forceCenter,
};
let svg;
let container;
let width = 0;
let height = 0;
const nodeRadius = 6;

export let data;

$: color = get(dark) ? "#fff" : "#000";
$: links = data.links.map((d) => Object.create(d));
$: nodes = data.nodes.map((d) => Object.create(d));

dark.subscribe((value) => (color = value ? "#fff" : "#000"));

let transform = d3.zoomIdentity;
let simulation;
onMount(() => {
    ({ width, height } = d3.select(svg).node().getBoundingClientRect());

    simulation = d3
        .forceSimulation(nodes)
        .force(
            "link",
            d3
                .forceLink(links)
                .distance(100)
                .id((d) => d.id),
        )
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", simulationUpdate);

    d3.select(svg)
        .call(
            d3
                .drag()
                .container(svg)
                .subject(dragsubject)
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended),
        )
        .call(d3.zoom().on("zoom", zoomed));
});

function simulationUpdate() {
    simulation.tick();
    nodes = [...nodes];
    links = [...links];
}

function zoomed(currentEvent) {
    transform = currentEvent.transform;
    simulationUpdate();
}

function dragsubject(currentEvent) {
    const node = simulation.find(
        transform.invertX(currentEvent.x),
        transform.invertY(currentEvent.y),
        nodeRadius,
    );
    if (node) {
        node.x = transform.applyX(node.x);
        node.y = transform.applyY(node.y);
    }
    return node;
}

function dragstarted(currentEvent) {
    if (!currentEvent.active) simulation.alphaTarget(0.3).restart();
    currentEvent.subject.fx = transform.invertX(currentEvent.subject.x);
    currentEvent.subject.fy = transform.invertY(currentEvent.subject.y);
}

function dragged(currentEvent) {
    currentEvent.subject.fx = transform.invertX(currentEvent.x);
    currentEvent.subject.fy = transform.invertY(currentEvent.y);
}

function dragended(currentEvent) {
    if (!currentEvent.active) simulation.alphaTarget(0);
    currentEvent.subject.fx = null;
    currentEvent.subject.fy = null;
}

function resize() {
    ({ width, height } = svg.getBoundingClientRect());
}
</script>

<svelte:window on:resize={resize} />

<div class="w-full h-full" bind:this={container}>
    <Button id="what" class="absolute !p-2 !mt-4 bg-black border border-black text-white hover:text-black dark:bg-white dark:border dark:border-white dark:text-black dark:hover:text-white dark:hover:bg-black" pill={true}><QuestionCircleOutline size="sm" /></Button>
    <Popover class="[&_div]:bg-white [&_div]:border-black w-80 text-sm font-light py-2 px-3 bg-white shadow text-black dark:bg-black dark:border dark:text-white dark:[&_div]:bg-black" title="what's this?" triggeredBy="#what" placement="bottom-end">one day i realized i completely lost track of who is friends with who, so i made this graph (work in progress). the only criteria at the moment is that that people spend time with each other apart from a school context.</Popover>
    <svg bind:this={svg} class="w-full h-full">
        {#each links as link}
            <g stroke="#999" stroke-opacity="0.6">
                <line
                    x1={link.source.x}
                    y1={link.source.y}
                    x2={link.target.x}
                    y2={link.target.y}
                    transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
                >
                    <title>{link.source.id}</title>
                </line>
            </g>
        {/each}
    
        {#each nodes as point}
            <g class="node">
                <circle
                    fill={color}
                    r="6"
                    cx={point.x}
                    cy={point.y}
                    transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
                />
                <text
                    fill={color}
                    x={point.x}
                    y={point.y + 15}
                    transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
                    text-anchor="middle"
                    font-size="10px"
                >
                    {point.id}
                </text>
            </g>
        {/each}
    </svg>
</div>

