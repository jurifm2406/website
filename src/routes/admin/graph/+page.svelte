<script lang="ts">
    import { enhance } from "$app/forms";
    import { defaultButtonStyle, defaultInputStyle } from "$lib/styles";
    import type { Person, Relation } from "$lib/types";
    import {
        Button,
        Helper,
        Input,
        Label,
        Select,
        type SelectOptionType,
    } from "flowbite-svelte";
    import type { ActionData } from "./$types";

    export let data: {
        relations: Relation[];
        persons: Person[];
    };

    export let form: ActionData;

    const personOptions = data.persons
        .map((person) => {
            return {
                value: person.id,
                name: person.name,
            };
        })
        .sort();

    let addRelationOptions: SelectOptionType<number>[] = [];
    let removeRelationOptions: SelectOptionType<number>[] = [];

    let removePersonSelected: number;
    let editPersonSelected: number;
    let removeRelationPerson1Selected: number;
    let removeRelationPerson2Selected: number;
    let addRelationPerson1Selected: number;
    let addRelationPerson2Selected: number;

    $: if (addRelationPerson1Selected) {
        addRelationOptions = filterOptions(
            personOptions,
            addRelationPerson1Selected,
            "exclude",
        );
    }

    $: if (removeRelationPerson1Selected) {
        removeRelationOptions = filterOptions(
            personOptions,
            removeRelationPerson1Selected,
            "match",
        );
    }

    function filterOptions(
        options: { value: number; name: string }[],
        compare: number,
        mode: "match" | "exclude",
    ) {
        return options
            .filter((person2) => {
                for (const relation of data.relations) {
                    if (
                        (relation.person1.id === compare &&
                            relation.person2.id === person2.value) ||
                        (relation.person1.id === person2.value &&
                            relation.person2.id === compare)
                    ) {
                        if (mode === "exclude") {
                            return false;
                        }
                        if (mode === "match") {
                            return true;
                        }
                    }
                    if (person2.value === compare) {
                        return false;
                    }
                }
                if (mode === "exclude") {
                    return true;
                }
                if (mode === "match") {
                    return false;
                }
            })
            .sort();
    }
</script>

<div class="grid grid-cols-2 grid-rows-3 gap-5 mx-auto" style="width: 70%;">
    <div
        class="flex justify-center items-center text-center rounded shadow-lg dark:border dark:border-gray-700 p-5 bg-white dark:bg-black"
        style="grid-area: 1 / 1 / 2 / 2;"
    >
        <form
            action="?/removePerson"
            class="flex flex-col space-y-4 w-3/4"
            method="post"
            use:enhance
        >
            <Label class="text-black dark:text-white">
                select a person
                <Select
                    bind:value={removePersonSelected}
                    class={defaultInputStyle}
                    items={personOptions}
                    name="person"
                />
            </Label>
            {#if form?.removePersonIncomplete}
                <Helper color="red">Specify a person!</Helper>
            {/if}

            <Button class={defaultButtonStyle} type="submit">
                remove person
            </Button>
        </form>
    </div>
    <div
        class="flex justify-center items-center text-center rounded shadow-lg dark:border dark:border-gray-700 p-5 bg-white dark:bg-black"
        style="grid-area: 1 / 2 / 2 / 3;"
    >
        <form
            action="?/addPerson"
            class="flex flex-col space-y-4 w-3/4"
            method="post"
            use:enhance
        >
            <Label class="text-black dark:text-white">
                type name
                <Input
                    class={defaultInputStyle}
                    id="person"
                    name="person"
                    type="text"
                />
            </Label>

            <Button class={defaultButtonStyle} type="submit">add person</Button>
            {#if form?.addPersonIncomplete}
                <Helper color="red">Specify a person!</Helper>
            {/if}
            {#if form?.addPersonDuplicate}
                <Helper color="red">Person already exists!</Helper>
            {/if}
        </form>
    </div>
    <div
        class="flex justify-center text-center rounded shadow-lg dark:border dark:border-gray-700 p-5 bg-white dark:bg-black"
        style="grid-area: 2 / 1 / 3 / 2;"
    >
        <form
            action="?/addRelation"
            class="flex flex-col space-y-4 w-3/4"
            method="post"
            use:enhance
        >
            <Label class="text-black dark:text-white">
                select person 1
                <Select
                    bind:value={addRelationPerson1Selected}
                    class={defaultInputStyle}
                    items={personOptions}
                    name="person1"
                />
            </Label>

            <Label class="text-black dark:text-white">
                select person 2
                <Select
                    bind:value={addRelationPerson2Selected}
                    class={defaultInputStyle}
                    items={addRelationOptions}
                    name="person2"
                ></Select>
            </Label>

            {#if form?.addRelationIncomplete}
                <Helper color="red">Specify both persons!</Helper>
            {/if}

            <Button class={defaultButtonStyle} type="submit">
                add relation
            </Button>
        </form>
    </div>
    <div
        class="flex justify-center text-center rounded shadow-lg dark:border dark:border-gray-700 p-5 bg-white dark:bg-black"
        style="grid-area: 2 / 2 / 3 / 3;"
    >
        <form
            action="?/editPerson"
            class="flex flex-col space-y-4 w-3/4"
            method="post"
            use:enhance
        >
            <Label class="text-black dark:text-white">
                select person
                <Select
                    bind:value={editPersonSelected}
                    class={defaultInputStyle}
                    items={personOptions}
                    name="person"
                />
            </Label>

            <Label class="text-black dark:text-white">
                type new name
                <Input
                    class={defaultInputStyle}
                    id="name"
                    name="name"
                    type="text"
                />
            </Label>

            {#if form?.editPersonIncomplete}
                <Helper color="red">
                    you need to specify a person and name
                </Helper>
            {/if}

            <Button class={defaultButtonStyle} type="submit">rename</Button>
        </form>
    </div>
    <div
        class="flex justify-center items-center text-center rounded shadow-lg dark:border dark:border-gray-700 p-5 bg-white dark:bg-black"
        style="grid-area: 3 / 1 / 4 / 3;"
    >
        <form
            action="?/removeRelation"
            class="flex flex-col space-y-4 w-3/4"
            method="post"
            use:enhance
        >
            <div class="flex flex-row w-full space-x-8">
                <Label class="text-black dark:text-white w-full">
                    choose person 1
                    <Select
                        bind:value={removeRelationPerson1Selected}
                        class={defaultInputStyle}
                        items={personOptions}
                        name="relation"
                    />
                </Label>
                <Label class="text-black dark:text-white w-full">
                    choose person 2
                    <Select
                        bind:value={removeRelationPerson2Selected}
                        class={defaultInputStyle}
                        items={removeRelationOptions}
                        name="relation"
                    />
                </Label>
            </div>
            <Button class={defaultButtonStyle} type="submit">
                remove Relation
            </Button>
        </form>
    </div>
</div>
