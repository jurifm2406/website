<script lang="ts">
import { enhance } from "$app/forms";
import type { Person, Relation } from "$lib/types";
import {
    Button,
    Helper,
    Input,
    Label,
    Select,
    type SelectOptionType,
} from "flowbite-svelte";

export let data: {
    relations: Relation[];
    persons: Person[];
};

export let form;

const relationOptions: SelectOptionType<number>[] = data.relations.map(
    (relation) => {
        return {
            value: relation.id,
            name: `${relation.person1.name} &harr; ${relation.person2.id}`,
        };
    },
);

const personOptions: SelectOptionType<number>[] = data.persons.map((person) => {
    return {
        value: person.id,
        name: person.name,
    };
});

let person2Options: SelectOptionType<number>[] = [];

let removePersonSelected: number;
let editPersonSelected: number;
let removeRelationSelected: number;
let addRelationPerson1Selected: number;
let addRelationPerson2Selected: number;

$: if (addRelationPerson1Selected) {
    person2Options = personOptions.filter((person2) => {
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
    });
}
</script>

<div class="grid grid-cols-2 grid-rows-3 gap-5 mx-auto" style="width: 70%;">
    <div
        class="flex justify-center items-center text-center rounded border-2 border-black p-5 bg-gray-500"
        style="grid-area: 1 / 1 / 2 / 2;"
    >
        <form
            action="?/removePerson"
            class="grid"
            method="post"
            use:enhance
        >
            <Label>
                select a person
                <Select bind:value={removePersonSelected} class="select" items={personOptions} name="person" />
            </Label>
            {#if form?.removePersonIncomplete}
                <Helper color="red">Specify a person!</Helper>
            {/if}
            
            <Button class="btn variant-filled" type="submit">remove person</Button>
        </form>
    </div>
    <div
        class="flex justify-center items-center text-center rounded border-2 border-black p-5 bg-gray-500"
        style="grid-area: 1 / 2 / 2 / 3;"
    >
        <form
            action="?/addPerson"
            class="grid"
            method="post"
            use:enhance
        >
            <Label for="person">type name</Label>
            <Input class="input" name="person" id="person" type="text" /><br />

            <Button class="btn variant-filled" type="submit">add person</Button>
            {#if form?.addPersonIncomplete}
                <Helper color="red">Specify a person!</Helper>
            {/if}
            {#if form?.addPersonDuplicate}
                <Helper color="red">Person already exists!</Helper>
            {/if}
        </form>
    </div>
    <div
        class="flex justify-center text-center rounded border-2 bg-gray-500 border-black p-5"
        style="grid-area: 2 / 1 / 3 / 2;"
    >
        <form
            action="?/addRelation"
            class="grid"
            method="post"
            use:enhance
        >
            <Label>
                select person 1
                <Select bind:value={addRelationPerson1Selected} items={personOptions} name="person1" />
            </Label>

            <Label>
                select person 2
                <Select bind:value={addRelationPerson2Selected} items={person2Options} name="person2"></Select>
            </Label>

            <Button class="btn variant-filled" type="submit">add relation</Button>
        </form>
    </div>
    <div
        class="flex justify-center text-center rounded border-2 bg-gray-500 border-black p-5"
        style="grid-area: 2 / 2 / 3 / 3;"
    >
        <form
            action="?/editPerson"
            class="grid"
            method="post"
            use:enhance
        >

            <Label>
                select person
                <Select bind:value={editPersonSelected} items={personOptions} name="person" />
            </Label>

            <Label for="name">type new name</Label>
            <Input class="input" name="name" id="name" type="text" />

            
            <Button class="btn variant-filled" type="submit">rename</Button>
        </form>

    </div>
    <div
        class="flex justify-center items-center text-center rounded border-2 bg-gray-500 border-black p-5"
        style="grid-area: 3 / 1 / 4 / 3;"
    >
        <form
            action="?/removeRelation"
            class="grid"
            method="post"
            use:enhance
        >
            <Label>
                choose relation
                <Select bind:value={removeRelationSelected} items={relationOptions} name="relation"/>
            </Label>
            
            <Button class="btn variant-filled" type="submit">Remove Relation</Button>
        </form>
    </div>
</div>
