<script lang="ts">
import { defaultButtonStyle } from "$lib/styles";
import * as d3 from "d3";
import { Button, Label, Range } from "flowbite-svelte";

let players = 2;
let spades = 13;
let clubs = 13;
let hearts = 13;
let diamonds = 13;
let jokers = 4;

let history: { person: string; turn: number; cards: number }[] = [];

function fisherYatesShuffle(array: string[]): string[] {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

function generatePlayerDecks(deck: string[], players: number) {
    const result = [];
    for (let i = players; i > 0; i--) {
        result.push(deck.splice(0, Math.ceil(deck.length / i)));
    }
    return result;
}

function createDeck(counts: number[]) {
    const values: string[] = ["spades", "clubs", "hearts", "diamonds", "joker"];
    let deck: string[] = [];
    for (let i = 0; i < values.length; i++) {
        const tempArr = new Array(counts[i]).fill(values[i]);
        deck = deck.concat(tempArr);
    }
    return deck;
}

function startGame() {
    history = [];
    let stack: string[] = [];
    const deck: string[] = createDeck([
        spades,
        clubs,
        hearts,
        diamonds,
        jokers,
    ]);
    const shuffledDeck = fisherYatesShuffle(deck);
    const playerDecks = generatePlayerDecks(shuffledDeck, players);

    let turn = 0;
    while (true) {
        for (let i = 0; i < playerDecks.length; i++) {
            history.push({
                person: `Person ${i + 1}`,
                turn: turn,
                cards: playerDecks[i].length,
            });
            const card = playerDecks[i].pop();
            if (card !== undefined) {
                stack.push(card);
            }
            if (
                stack.length > 1 &&
                (stack[0] === stack[stack.length - 1] || card === "joker")
            ) {
                playerDecks[i] = stack.concat(playerDecks[i]);
                stack = [];
            }
            let nonZeroCount = 0;
            for (const p of playerDecks) {
                if (p.length > 0) {
                    nonZeroCount++;
                }
            }
            if (nonZeroCount < 2) {
                createGraph();
                return;
            }
            turn++;
        }
    }
}

function createGraph() {
    const data = structuredClone(history);
    d3.select("#graph").html("");
    // Specify the chart’s dimensions.
    const width = 928;
    const height = 600;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 30;

    // Create the positional scales.
    const x = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.turn))
        .range([marginLeft, width - marginRight]);

    const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.cards)])
        .nice()
        .range([height - marginBottom, marginTop]);

    // Create the SVG container.
    const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr(
            "style",
            "max-width: 100%; height: auto; overflow: visible; font: 10px sans-serif;",
        );

    // Add the horizontal axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(
            d3
                .axisBottom(x)
                .ticks(width / 80)
                .tickSizeOuter(0),
        );

    // Add the vertical axis.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
            g
                .selectAll(".tick line")
                .clone()
                .attr("x2", width - marginLeft - marginRight)
                .attr("stroke-opacity", 0.1),
        )
        .call((g) =>
            g
                .append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("cards"),
        );

    // Compute the points in pixel space as [x, y, z], where z is the name of the series.
    const points = data.map((d) => [x(d.turn), y(d.cards), d.person]);

    // Group the points by series.
    const groups = d3.rollup(
        points,
        (v) => Object.assign(v, { z: v[0][2] }),
        (d) => d[2],
    );

    let color: string;

    if (localStorage.getItem("color-theme") === "dark") {
        color = "#FFF";
    } else {
        color = "#000";
    }

    // Draw the lines.
    const line = d3.line();

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .selectAll("path")
        .data(groups.values())
        .join("path")
        .style("mix-blend-mode", "multiply")
        .attr("d", line);

    d3.select("#graph").append(() => svg.node());
}
</script>
<div class="grid w-full h-full" style="grid-template-columns: 2fr 1fr">
    <div id="graph"></div>
    <div id="sidebar">
        <Label class="float-left">players</Label><p class="float-right">{players}</p>
        <Range size="sm" min="2" max="64" bind:value={players}></Range>
        <Label class="float-left">spades</Label><p class="float-right">{spades}</p>
        <Range size="sm" min="0" max="256" bind:value={spades}></Range>
        <Label class="float-left">clubs</Label><p class="float-right">{clubs}</p>
        <Range size="sm" min="0" max="256" bind:value={clubs}></Range>
        <Label class="float-left">hearts</Label><p class="float-right">{hearts}</p>
        <Range size="sm" min="0" max="256" bind:value={hearts}></Range>
        <Label class="float-left">diamonds</Label><p class="float-right">{diamonds}</p>
        <Range size="sm" min="0" max="256" bind:value={diamonds}></Range>
        <Label class="float-left">jokers</Label><p class="float-right">{jokers}</p>
        <Range size="sm" min="0" max="64" bind:value={jokers}></Range>

        <Button class="w-full my-5 { defaultButtonStyle }" on:click={startGame}>start game</Button>
    </div>
</div>

