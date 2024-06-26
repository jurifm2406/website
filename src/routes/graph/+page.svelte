<script lang="ts">
import {
    create,
    drag,
    forceCenter,
    forceLink,
    forceManyBody,
    forceSimulation,
    select,
    zoom,
} from "d3";
import { onMount } from "svelte";
import type { PageData } from "./$types";

export let data: PageData;

let color = "#000";

onMount(async () => {
    if (localStorage.getItem("color-theme") === "dark") {
        color = "#FFF";
    }

    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    const rect = select("#graph").node().getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    // Create the SVG container.
    const svg = create("svg").attr("width", width).attr("height", height);

    // Create a simulation with several forces.
    const simulation = forceSimulation(nodes)
        .force(
            "link",
            forceLink(links)
                .distance(60)
                .id((d) => d.id),
        )
        .force("charge", forceManyBody().strength(-150))
        .force("center", forceCenter(width / 2, height / 2))
        .on("tick", ticked);

    const g = svg.append("g");

    function handleZoom(e) {
        g.attr("transform", e.transform);
    }

    svg.call(zoom().on("zoom", handleZoom));

    // Add a line for each link, and a circle for each node.
    const link = g
        .append("g")
        .selectAll()
        .data(links)
        .join("line")
        .attr("stroke", "#9ca3af")
        .attr("stroke-opacity", "0.6");

    const node = g
        .append("g")
        .selectAll()
        .data(nodes)
        .join((enter) => {
            const g = enter.append("g");

            g.append("circle")
                .attr("fill", color)
                .attr("stroke-width", "1.5")
                .attr("r", 5);

            g.append("text")
                .style("fill", color)
                .attr("font", "monospace")
                .attr("font-size", "10px")
                .attr("transform", "translate(8, 2)")
                .text((d) => d.id);

            return g; // Return the 'g' element to be used in the selection
        });

    // Add a drag behavior.
    node.call(
        drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended),
    );

    // Set the position attributes of links and nodes each time the simulation ticks.
    function ticked() {
        link.attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    }

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    select("#graph").append(() => svg.node());
});
</script>

<div class="flex w-full h-full" id="graph"></div>
