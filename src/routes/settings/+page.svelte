<script lang="ts">
import {
    alertButtonStyle,
    defaultButtonStyle,
    defaultInputStyle,
} from "$lib/styles.js";
import {
    Avatar,
    Button,
    Fileupload,
    Input,
    Label,
    Modal,
} from "flowbite-svelte";
import { Section } from "flowbite-svelte-blocks";
import { ExclamationCircleOutline } from "flowbite-svelte-icons";
import type { PageData } from "./$types";

let value;
let popupModal = false;
export let data: PageData;
</script>

<Section name="crudcreateform">
    <h2 class="mb-4 text-xl font-bold text-black dark:text-white">edit profile</h2>
    <form action="?/update" method="post" class="mb-4 sm:mb-6">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="flex sm:col-span-2">
                <Avatar size="lg" src={ data.user?.avatar }></Avatar>
                <Label class="space-y-2 mb-2 ml-4 w-full flex items-end">
                    <div class="text-black dark:text-white w-full">
                        upload new avatar
                        <Fileupload bind:value class="mt-2 block disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right focus:border-black focus:border border-gray-300 focus:ring-black dark:focus:border-white dark:focus:ring-white dark:placeholder-black dark:border-gray-600 dark:border border text-sm rounded-lg p-0 dark:text-white dark:bg-black text-black bg-white w-full" />
                    </div>
                </Label>
            </div>
            <div>
                <Label for="username" class="mb-2">username</Label>
                <Input type="text" id="username" class={ defaultInputStyle } placeholder="Product brand" value={ data.user?.username } disabled />
            </div>
            <div>
                <Label for="name" class="mb-2">full name</Label>
                <Input type="text" id="name" class={ defaultInputStyle } placeholder="person doe" value={ data.user?.name } required />
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