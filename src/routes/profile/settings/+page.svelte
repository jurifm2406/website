<script lang="ts">
    import {
        alertButtonStyle,
        primaryButtonStyle,
        defaultInputStyle,
    } from "$lib/styles.js";
    import { Button, Input, Label, Modal } from "flowbite-svelte";
    import { Section } from "flowbite-svelte-blocks";
    import { ExclamationCircleOutline } from "flowbite-svelte-icons";
    import ColorPicker from "svelte-awesome-color-picker";
    import Avatar from "svelte-boring-avatars";
    import type { PageData } from "./$types";

    export let data: PageData;

    const avatar = data.user?.avatar
        ? data.user.avatar
        : {
              variant: "beam",
              hex: ["", "", "", "", ""],
          };

    $: hexValues = avatar.hex;

    let popupModal = false;
</script>

<Section name="crudcreateform">
    <h2 class="mb-4 text-xl font-bold text-black dark:text-white">
        edit profile
    </h2>
    <form action="?/update" class="mb-4 sm:mb-6" method="post">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="flex sm:col-span-2">
                <Avatar
                    colors={hexValues}
                    name={data.user?.username}
                    size={100}
                    variant={avatar.variant}
                />
                <div
                    class="grid gap-2 grid-cols-2 grid-rows-2 dark:cp-dark float-right dark:float-right ml-auto"
                >
                    <ColorPicker bind:hex={hexValues[0]} name="hex1" />
                    <ColorPicker bind:hex={hexValues[1]} name="hex2" />
                    <ColorPicker bind:hex={hexValues[2]} name="hex3" />
                    <ColorPicker bind:hex={hexValues[3]} name="hex4" />
                    <ColorPicker bind:hex={hexValues[4]} name="hex5" />
                </div>
            </div>
            <div>
                <Label class="mb-2" for="username">username</Label>
                <Input
                    class={defaultInputStyle}
                    disabled
                    id="username"
                    name="username"
                    placeholder="username"
                    type="text"
                    value={data.user?.username}
                />
            </div>
            <div>
                <Label class="mb-2" for="name">full name</Label>
                <Input
                    class={defaultInputStyle}
                    id="name"
                    name="name"
                    type="text"
                    value={data.user?.name}
                />
            </div>
            <Button class="sm:col-span-2 {primaryButtonStyle}" type="submit">
                apply
            </Button>
            <Button
                class="sm:col-span-2 {alertButtonStyle}"
                on:click={() => (popupModal = true)}
                type="button"
            >
                delete account
            </Button>
            <Modal
                bind:open={popupModal}
                class="bg-white shadow-lg dark:bg-black dark:border dark:shadow-none"
                size="xs"
            >
                <div class="text-center">
                    <ExclamationCircleOutline
                        class="mx-auto mb-4 text-black w-12 h-12 dark:text-white"
                    />
                    <h3
                        class="mb-5 text-lg font-normal text-black dark:text-white"
                    >
                        are you sure you want to delete your account?
                    </h3>
                    <Button
                        class="me-2 {alertButtonStyle}"
                        formaction="?/delete"
                        type="submit"
                    >
                        yes, i'm sure
                    </Button>
                    <Button
                        class={primaryButtonStyle}
                        on:click={() => (popupModal = false)}
                    >
                        no, cancel
                    </Button>
                </div>
            </Modal>
        </div>
    </form>
</Section>
