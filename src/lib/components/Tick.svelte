<script lang="ts">
export let x: number;
export let y: number;
export let value: number;
export let direction: string;
export let format = true;
export let color = "#000";
const xTranslation = direction === "horizontal" ? x - 10 : x;
function nFormatter(num: number, digits: number) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

    const item = lookup
        .slice()
        .reverse()
        .find((item) => num >= item.value);

    return item
        ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
        : "0";
}
const valueLabel = format ? nFormatter(value, 1) : value;
</script>

<g transform={"translate(" + xTranslation + ", " + y + ")"}>
    <text
        y={direction === "horizontal" ? 0 : 20}
        font-size="13px"
        text-anchor={direction === "horizontal" ? "end" : "middle"}
        alignment-baseline="middle"
        fill={color}
    >
        {valueLabel}
    </text>
    {#if direction === "horizontal"}
        <line x1={2} x2={8} y1={0} y2={0} stroke={color} stroke-width="1" />
    {:else}
        <line x1={0} x2={0} y1={2} y2={8} stroke={color} stroke-width="1" />
    {/if}
</g>
