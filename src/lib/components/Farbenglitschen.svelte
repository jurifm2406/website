<script lang="ts">
    import { defaultButtonStyle } from "$lib/styles";
    import * as d3 from "d3";
    import { Button, Label, Popover, Range } from "flowbite-svelte";
    import { QuestionCircleOutline } from "flowbite-svelte-icons";
    import LineChart from "./LineChart.svelte";

    let players = 2;
    let spades = 13;
    let clubs = 13;
    let hearts = 13;
    let diamonds = 13;
    let jokers = 4;

    let displayGraph = false;
    let container: HTMLDivElement;
    let width: number;
    let height: number;
    let yVars: string[] = [];
    let reload = {};

    let history: Record<string, number>[] = [];

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
        const values: string[] = [
            "spades",
            "clubs",
            "hearts",
            "diamonds",
            "joker",
        ];
        let deck: string[] = [];
        for (let i = 0; i < values.length; i++) {
            const tempArr = new Array(counts[i]).fill(values[i]);
            deck = deck.concat(tempArr);
        }
        return deck;
    }

    function startGame() {
        yVars = [];
        displayGraph = false;
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
            let turnData: Record<string, number> = {};
            turnData.turn = turn;
            for (let i = 0; i < playerDecks.length; i++) {
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
                const PLAYER = `player${i + 1}`;
                turnData[PLAYER] = playerDecks[i].length;
                if (nonZeroCount < 2) {
                    console.log(history);
                    createGraph();
                    return;
                }
            }
            history.push(turnData);
            turn++;
        }
    }

    function createGraph() {
        let vars = [];

        for (let i = 0; i < players; i++) {
            vars.push(`player${i + 1}`);
        }

        yVars = vars;

        const box = d3.select(container).node()?.getBoundingClientRect();

        width = Math.round(box?.width || 928);
        height = Math.round(box?.height || 600);

        displayGraph = true;
        reload = {};
    }

    function reset() {
        yVars = [];
        players = 2;
        spades = 13;
        clubs = 13;
        hearts = 13;
        diamonds = 13;
        jokers = 4;
        displayGraph = false;
    }
</script>

<div class="grid w-full h-full" style="grid-template-columns: 2fr 1fr">
    <div class="w-full h-full" bind:this={container}>
        {#key reload}
            {#if displayGraph}
                <LineChart
                    chartHeight={height}
                    chartWidth={width}
                    data={history}
                    xVar="turn"
                    {yVars}
                />
            {/if}
        {/key}
    </div>
    <div id="sidebar">
        <Label class="float-left">players</Label>
        <p class="float-right">{players}</p>
        <Range bind:value={players} max="64" min="2" size="sm"></Range>
        <Label class="float-left">spades</Label>
        <p class="float-right">{spades}</p>
        <Range bind:value={spades} max="256" min="0" size="sm"></Range>
        <Label class="float-left">clubs</Label>
        <p class="float-right">{clubs}</p>
        <Range bind:value={clubs} max="256" min="0" size="sm"></Range>
        <Label class="float-left">hearts</Label>
        <p class="float-right">{hearts}</p>
        <Range bind:value={hearts} max="256" min="0" size="sm"></Range>
        <Label class="float-left">diamonds</Label>
        <p class="float-right">{diamonds}</p>
        <Range bind:value={diamonds} max="256" min="0" size="sm"></Range>
        <Label class="float-left">jokers</Label>
        <p class="float-right">{jokers}</p>
        <Range bind:value={jokers} max="64" min="0" size="sm"></Range>

        <Button class="w-full my-5 {defaultButtonStyle}" on:click={startGame}>
            start game
        </Button>
        <Button class="w-full {defaultButtonStyle}" on:click={reset}>
            reset
        </Button>
        <Button
            id="what"
            class="float-end !p-2 !mt-4 bg-black border border-black text-white hover:text-black dark:bg-white dark:border dark:border-white dark:text-black dark:hover:text-white dark:hover:bg-black"
            pill={true}
        >
            <QuestionCircleOutline size="sm" />
        </Button>
        <Popover
            class="[&_div]:bg-white [&_div]:border-black w-96 text-sm font-light py-2 px-3 bg-white shadow text-black dark:bg-black dark:border dark:text-white dark:[&_div]:bg-black"
            title="what's this?"
            triggeredBy="#what"
            placement="bottom-start"
        >
            farbenglitschen is an incredibly boring game where players just put
            cards in the middle one after another and the first one to put a
            card with the same suit as the first card down gets the entire
            stack, until there is only one player with all the cards. turns out,
            you can do some pretty interesting statistics with that.
        </Popover>
    </div>
</div>
