<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";

    export let data;

let selectedPerson1 = "";
let person2Options = [];

$: if (selectedPerson1) {
    person2Options = data.persons.filter((person2) => {
        for (let relation of data.relations) {
            if (
                (relation.person1.id === selectedPerson1 &&
                    relation.person2.id === person2.id) ||
                (relation.person1.id === person2.id &&
                    relation.person2.id === selectedPerson1)
            ) {
                return false;
            }
            if (person2.id === selectedPerson1) {
                return false;
            }
        }
        return true;
    });
}
</script>

<div class="grid grid-cols-2 grid-rows-3 gap-5 mx-auto" style="width: 70%;">
    <div
        class="flex justify-center items-center text-center rounded border border-black p-5"
        style="grid-area: 1 / 1 / 2 / 2;"
    >
        <form
            action="?/removePerson"
            class="grid"
            method="post"
            use:enhance
        >
            <select class="select" name="person">
                <option disabled selected value="">Select Person</option>
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
            class="grid"
            method="post"
            use:enhance
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
            class="grid"
            method="post"
            use:enhance
        >
            <select bind:value={selectedPerson1} class="select" name="person1">
                <option disabled selected value="">Select Person</option>
                { #each data.persons as person }
                    <option value="{person.id}">{person.name}</option>
                { /each    }
            </select>

            <select class="select" name="person2">
                <option disabled selected value="">Select Person</option>
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
            class="grid"
            method="post"
            use:enhance
        >
            <select class="select" name="person">
                <option disabled selected value="">Select Person</option>
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
            class="grid"
            method="post"
            use:enhance
        >
            <select class="select" name="relation">
                <option disabled selected value="">Select Relation</option>
                { #each data.relations as relation }
                    <option value="{relation.id}">{relation.person1.name} &harr; {relation.person2.name}</option>
                { /each    }
            </select>

            <button class="btn variant-filled" type="submit">Remove Relation</button>
        </form>
    </div>
</div>
