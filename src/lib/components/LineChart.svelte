<script lang="ts">
import { scaleLinear, scaleOrdinal } from "d3";
import { dark } from "$lib/stores";
import { get } from "svelte/store";
import Tick from "./Tick.svelte";

export let chartWidth: number;
export let chartHeight: number;
export let data: Record<string, number>[];
export let xVar: string;
export let yVars: string[];
const paddings = {
    top: 50,
    left: 50,
    right: 50,
    bottom: 50,
};
$: color = get(dark) ? "#fff" : "#000";
$: xScale = scaleLinear()
    .domain([
        Math.min(...data.map((d) => d[xVar])),
        Math.max(...data.map((d) => d[xVar])),
    ])
    .range([paddings.left, chartWidth - paddings.right]);
$: yScale = scaleLinear()
    .domain([
        Math.min(...data.map((d) => Math.min(...yVars.map((yVar) => d[yVar])))),
        Math.max(...data.map((d) => Math.max(...yVars.map((yVar) => d[yVar])))),
    ])
    .range([chartHeight - paddings.bottom, paddings.top])
    .nice();
$: yGrid = yScale.ticks(10);
$: xGrid = xScale.ticks(10);
$: colorScale = scaleOrdinal().domain(yVars).range(selectColor(yVars.length));

dark.subscribe((value) => {
    color = value ? "#fff" : "#000";
});

function selectColor(amount: number): string[] {
    if (amount < 1) amount = 1; // defaults to one color - avoid divide by zero
    let colors: string[] = [];

    for (let i = 0; i < amount; i++) {
        colors.push(`hsl(${(i * (360 / amount)) % 360},100%,50%)`);
    }
    return colors;
}
</script>

<svg width={chartWidth} height={chartHeight}>
    <g>
        {#each data as turn, i}
            {#each yVars as yVar}
                {#if i < data.length - 1}
                    <line
                        x1={xScale(data[i][xVar])}
                        x2={xScale(data[i + 1][xVar])}
                        y1={yScale(data[i][yVar])}
                        y2={yScale(data[i + 1][yVar])}
                        stroke={colorScale(yVar)}
                        stroke-width="2"
                    />
                {/if}
            {/each}
        {/each}
    </g>
    <g>
        <line
            x1={paddings.left}
            x2={chartWidth - paddings.right}
            y1={chartHeight - paddings.bottom}
            y2={chartHeight - paddings.bottom}
            stroke={color}
            stroke-width="2"
        />
        <line
            x1={paddings.left}
            x2={paddings.left}
            y1={paddings.top}
            y2={chartHeight - paddings.bottom}
            stroke={color}
            stroke-width="2"
        />
    </g>
    <g>
        {#each yGrid.slice(1) as gridLine}
            <Tick
                x={paddings.left}
                y={yScale(gridLine)}
                value={gridLine}
                direction={"horizontal"}
                {color}
            />
        {/each}
    </g>
    <g>
        {#each xGrid as gridLine}
            <Tick
                x={xScale(gridLine)}
                y={chartHeight - paddings.bottom}
                value={gridLine}
                direction={"vertical"}
                {color}
            />
        {/each}
    </g>
</svg>
