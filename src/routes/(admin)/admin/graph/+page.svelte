<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import type { Person, Relation } from "$lib/types";

    export let data: { persons: Person[]; relations: Relation[] };

    let selectedPerson1 = "";
    let person2Options: Person[] = [];

    $: if (selectedPerson1) {
        person2Options = data.persons.filter(person2 => {
                for (let relation of data.relations) {
                    if (relation.person1.id === selectedPerson1 && relation.person2.id === person2.id || relation.person1.id === person2.id && relation.person2.id === selectedPerson1) {
                        return false;
                    }
                    if (person2.id === selectedPerson1) {
                        return false;
                    }
                }
                return true;
            }
        );
    }
</script>

<div class="grid grid-cols-2 grid-rows-3 gap-5 mx-auto" style="width: 70%;">
    <div
        class="flex justify-center items-center text-center rounded border border-black p-5"
        style="grid-area: 1 / 1 / 2 / 2;"
    >
        <form
            action="?/removePerson"
            method="post"
            use:enhance
            class="grid"
        >
            <select class="select" name="person">
                <option value="" selected disabled>Select Person</option>
                { #each data.persons as person }
                    <option value="{person.id}">{person.name}</option>
                { /each    }
            </select>
            <button class="btn variant-filled" type="submit">remove person</button>
            <br />
            {#if $page.form?.removePersonIncomplete}
                <p class="text-error-500">Specify a person!</p>
            {/if}
        </form>
    </div>
    <div
        class="flex justify-center items-center text-center rounded border border-black p-5"
        style="grid-area: 1 / 2 / 2 / 3;"
    >
        <form
            action="?/addPerson"
            method="post"
            use:enhance
            class="grid"
        >
            <input class="input" name="person" type="text" /><br />
            <button class="btn variant-filled" type="submit">add person</button>
            {#if $page.form?.addPersonIncomplete}
                <p class="text-error-500">Specify a person!</p>
            {/if}
            {#if $page.form?.addPersonDuplicate}
                <p class="text-error-500">Person already exists!</p>
            {/if}
        </form>
    </div>
    <div
        class="flex justify-center text-center rounded border border-black p-5"
        style="grid-area: 2 / 1 / 3 / 2;"
    >
        <form
            action="?/addRelation"
            method="post"
            use:enhance
            class="grid"
        >
            <select class="select" name="person1" bind:value={selectedPerson1}>
                <option value="" disabled selected>Select Person</option>
                { #each data.persons as person }
                    <option value="{person.id}">{person.name}</option>
                { /each    }
            </select>

            <select class="select" name="person2">
                <option value="" disabled selected>Select Person</option>
                { #if selectedPerson1 }
                    { #each person2Options as person }
                        <option value="{person.id}">{person.name}</option>
                    { /each    }
                { /if    }
            </select>

            <button class="btn variant-filled" type="submit">add relation</button>
        </form>
    </div>
    <div
        class="flex justify-center text-center rounded border border-black p-5"
        style="grid-area: 2 / 2 / 3 / 3;"
    >
        <form
            action="?/editPerson"
            method="post"
            use:enhance
            class="grid"
        >
            <select class="select" name="person">
                <option value="" selected disabled>Select Person</option>
                { #each data.persons as person }
                    <option value="{person.id}">{person.name}</option>
                { /each  }
            </select>

            <input class="input" name="name" type="text" />

            <button class="btn variant-filled" type="submit">rename</button>
        </form>

    </div>
    <div
        class="flex justify-center items-center text-center rounded border border-black p-5"
        style="grid-area: 3 / 1 / 4 / 3;"
    >
        <form
            action="?/removeRelation"
            method="post"
            use:enhance
            class="grid"
        >
            <select class="select" name="relation">
                <option value="" disabled selected>Select Relation</option>
                { #each data.relations as relation }
                    <option value="{relation.id}">{relation.person1.name} &harr; {relation.person2.name}</option>
                { /each    }
            </select>

            <button class="btn variant-filled" type="submit">Remove Relation</button>
        </form>
    </div>
</div>
