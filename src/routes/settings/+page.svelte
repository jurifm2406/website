<script lang="ts">
import {
    alertButtonStyle,
    defaultButtonStyle,
    defaultInputStyle,
} from "$lib/styles.js";
import { Button, Input, Label, Modal } from "flowbite-svelte";
import { Section } from "flowbite-svelte-blocks";
import { ExclamationCircleOutline } from "flowbite-svelte-icons";
import ColorPicker from "svelte-awesome-color-picker";
import Avatar from "svelte-boring-avatars";
import type { PageData } from "./$types";
export let data: PageData;

const avatar = data.user?.avatar;

let hex1 = avatar?.hex1;
let hex2 = avatar?.hex2;
let hex3 = avatar?.hex3;
let hex4 = avatar?.hex4;
let hex5 = avatar?.hex5;

$: hexValues = [hex1, hex2, hex3, hex4, hex5];

let popupModal = false;
</script>

<Section name="crudcreateform">
    <h2 class="mb-4 text-xl font-bold text-black dark:text-white">edit profile</h2>
    <form action="?/update" method="post" class="mb-4 sm:mb-6">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="flex sm:col-span-2">
                <Avatar
                size={100}
                name={ data.user?.username }
                variant={ data.user?.avatar.variant }
                colors={ hexValues }/>
                <div class="grid gap-2 grid-cols-2 grid-rows-2 dark:cp-dark float-right dark:float-right ml-auto">
                    <ColorPicker bind:hex={hex1}
                                 name="hex1" />
                    <ColorPicker bind:hex={hex2}
                                 name="hex2" />
                    <ColorPicker bind:hex={hex3}
                                 name="hex3" />
                    <ColorPicker bind:hex={hex4}
                                 name="hex4" />
                    <ColorPicker bind:hex={hex5}
                                 name="hex5" />
                </div>
            </div>
            <div>
                <Label for="username" class="mb-2">username</Label>
                <Input type="text" id="username" name="username" class={ defaultInputStyle } placeholder="username" value={ data.user?.username } disabled />
            </div>
            <div>
                <Label for="name" class="mb-2">full name</Label>
                <Input type="text" id="name" name="name" class={ defaultInputStyle } value={ data.user?.name } />
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