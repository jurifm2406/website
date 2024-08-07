<script lang="ts">
    export let rawNodes: {
        id: string;
        group: number;
    }[];
    export let rawLinks: {
        source: string;
        target: string;
        value: number;
    }[];
    export let color: string;

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
        type Simulation,
    } from "d3";
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
    let svg: SVGSVGElement;
    let width = 0;
    let height = 0;
    const nodeRadius = 6;

    let links = rawLinks.map((d) => Object.create(d));
    let nodes = rawNodes.map((d) => Object.create(d));

    let transform = d3.zoomIdentity;
    let simulation: Simulation<any, any>;
    onMount(() => {
        const rect = d3.select(svg).node()?.getBoundingClientRect();

        ({ width, height } = rect ? rect : { width: 500, height: 500 });

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
