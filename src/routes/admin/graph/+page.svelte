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

$: relationOptions = data.relations
    .map((relation) => {
        return {
            value: relation.id,
            name: `${relation.person1.name} ↔ ${relation.person2.name}`,
        };
    })
    .sort();

$: personOptions = data.persons
    .map((person) => {
        return {
            value: person.id,
            name: person.name,
        };
    })
    .sort();

let person2Options: SelectOptionType<number>[] = [];

let removePersonSelected: number;
let editPersonSelected: number;
let removeRelationSelected: number;
let addRelationPerson1Selected: number;
let addRelationPerson2Selected: number;

$: if (addRelationPerson1Selected) {
    person2Options = personOptions
        .filter((person2) => {
            for (const relation of data.relations) {
                if (
                    (relation.person1.id === addRelationPerson1Selected &&
                        relation.person2.id === person2.value) ||
                    (relation.person1.id === person2.value &&
                        relation.person2.id === addRelationPerson1Selected)
                ) {
                    return false;
                }
                if (person2.value === addRelationPerson1Selected) {
                    return false;
                }
            }
            return true;
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
            class="flex flex-col space-y-4"
            method="post"
            use:enhance
        >
            <Label class="text-black dark:text-white">
                select a person
                <Select class={ defaultInputStyle } bind:value={removePersonSelected} items={personOptions} name="person" />
            </Label>
            { #if form?.removePersonIncomplete }
                <Helper color="red">Specify a person!</Helper>
            { /if }
            
            <Button class={ defaultButtonStyle } type="submit">remove person</Button>
        </form>
    </div>
    <div
        class="flex justify-center items-center text-center rounded shadow-lg dark:border dark:border-gray-700 p-5 bg-white dark:bg-black"
        style="grid-area: 1 / 2 / 2 / 3;"
    >
        <form
            action="?/addPerson"
            class="flex flex-col space-y-4"
            method="post"
            use:enhance
        >
            <Label class="text-black dark:text-white">
                type name
                <Input class={ defaultInputStyle } name="person" id="person" type="text" />
            </Label>

            <Button class={ defaultButtonStyle } type="submit">add person</Button>
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
            class="flex flex-col space-y-4"
            method="post"
            use:enhance
        >
            <Label class="text-black dark:text-white">
                select person 1
                <Select class={ defaultInputStyle } bind:value={addRelationPerson1Selected} items={personOptions} name="person1" />
            </Label>

            <Label class="text-black dark:text-white">
                select person 2
                <Select class={ defaultInputStyle } bind:value={addRelationPerson2Selected} items={person2Options} name="person2"></Select>
            </Label>

            { #if form?.addRelationIncomplete }
                <Helper color="red">Specify both persons!</Helper>
            { /if }

            <Button class={ defaultButtonStyle } type="submit">add relation</Button>
        </form>
    </div>
    <div
        class="flex justify-center text-center rounded shadow-lg dark:border dark:border-gray-700 p-5 bg-white dark:bg-black"
        style="grid-area: 2 / 2 / 3 / 3;"
    >
        <form
            action="?/editPerson"
            class="flex flex-col space-y-4"
            method="post"
            use:enhance
        >

            <Label class="text-black dark:text-white">
                select person
                <Select class={ defaultInputStyle } bind:value={editPersonSelected} items={personOptions} name="person" />
            </Label>

            <Label class="text-black dark:text-white">
                type new name
                <Input class={ defaultInputStyle } name="name" id="name" type="text" />
            </Label>

            { #if form?.editPersonIncomplete }
                <Helper color="red">
                    you need to specify a person and name
                </Helper>
            { /if }

            
            <Button class={ defaultButtonStyle } type="submit">rename</Button>
        </form>

    </div>
    <div
        class="flex justify-center items-center text-center rounded shadow-lg dark:border dark:border-gray-700 p-5 bg-white dark:bg-black"
        style="grid-area: 3 / 1 / 4 / 3;"
    >
        <form
            action="?/removeRelation"
            class="flex flex-col space-y-4"
            method="post"
            use:enhance
        >
            <Label class="text-black dark:text-white">
                choose relation
                <Select class={ defaultInputStyle } bind:value={removeRelationSelected} items={relationOptions} name="relation"/>
            </Label>
            
            <Button class={ defaultButtonStyle } type="submit">remove Relation</Button>
        </form>
    </div>
</div>
