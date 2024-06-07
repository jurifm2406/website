<script lang="ts">
import { alertButtonStyle, defaultButtonStyle } from "$lib/styles.js";
import { Button, Input, Label, Modal } from "flowbite-svelte";
import { Section } from "flowbite-svelte-blocks";
import { ExclamationCircleOutline } from "flowbite-svelte-icons";
import type { PageData } from "./$types";

let popupModal = false;
export let data: PageData;
</script>

<Section name="crudcreateform">
    <h2 class="mb-4 text-xl font-bold text-black dark:text-white">edit profile</h2>
    <form action="?/update" method="post" class="mb-4 sm:mb-6">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
                <Label for="username" class="mb-2">username</Label>
                <Input type="text" id="username" placeholder="Product brand" value={ data.user?.username } disabled />
            </div>
            <div>
                <Label for="name" class="mb-2">full name</Label>
                <Input type="text" id="name" placeholder="person doe" value={ data.user?.name } required />
            </div>
            <Button type="submit" class="sm:col-span-2 { defaultButtonStyle }">apply</Button>
            <Button on:click={() => (popupModal = true)} type="button" class="sm:col-span-2 {alertButtonStyle}">delete account</Button>
            <Modal bind:open={popupModal} size="xs" class="bg-white shadow-lg dark:bg-black dark:border dark:shadow-none">
                <div class="text-center">
                    <ExclamationCircleOutline class="mx-auto mb-4 text-black w-12 h-12 dark:text-white" />
                    <h3 class="mb-5 text-lg font-normal text-black dark:text-white">are you sure you want to delete your account?</h3>
                    <Button type="submit" formaction="?/delete" class="me-2 { alertButtonStyle }">yes, i'm sure</Button>
                    <Button class={ defaultButtonStyle } on:click={() => popupModal = false}>no, cancel</Button>
                </div>
            </Modal>
        </div>
    </form>
</Section>