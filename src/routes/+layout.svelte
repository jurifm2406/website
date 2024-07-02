<script lang="ts">
    import "../app.css";
    import { goto } from "$app/navigation";
    import {
        DarkMode,
        Avatar as DefaultAvatar,
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl,
        Navbar,
    } from "flowbite-svelte";
    import Avatar from "svelte-boring-avatars";
    import type { LayoutData } from "./$types";
    import { dark } from "$lib/stores";
    import { onMount } from "svelte";

    async function logout() {
        const response = await fetch("/logout", {
            method: "POST",
            body: "",
            headers: {
                "content-type": "application/json",
            },
        });

        if (response.ok) {
            await goto("/", {
                replaceState: true,
                invalidateAll: true,
            });
        }
    }

    let dropdownOpen = false;

    export let data: LayoutData;

    const variants = ["beam", "bauhaus"] as const;
    type Variant = (typeof variants)[number];

    function parseVariant(unsafeVariant: string): Variant {
        const maybeVariant: unknown = JSON.parse(unsafeVariant);
        const variant = variants.find(
            (validVariant) => validVariant === maybeVariant,
        );
        if (variant) {
            // `sheepName` comes from the list of `sheepNames` so the compiler is happy.
            return variant;
        }
        throw new Error("Not a valid variant!");
    }

    const avatar = data.user?.avatar
        ? {
              variant: data.user.avatar.variant,
              hex1: data.user.avatar.hex1,
              hex2: data.user.avatar.hex2,
              hex3: data.user.avatar.hex3,
              hex4: data.user.avatar.hex4,
              hex5: data.user.avatar.hex5,
          }
        : {
              variant: "",
              hex1: "",
              hex2: "",
              hex3: "",
              hex4: "",
              hex5: "",
          };

    onMount(() => {
        dark.set(localStorage.getItem("color-theme") === "dark");
    });
</script>

<div class="relative px-8 h-screen">
    <Navbar
        class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b shadow bg-white dark:bg-black"
    >
        <NavBrand href="/">
            <span
                class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
                id="subject">franz münzner</span
            >
        </NavBrand>
        <NavHamburger />
        <NavUl
            ulClass="flex flex-col items-center p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium"
        >
            <NavLi
                active={true}
                class="text-black md:hover:text-black hover:text-black dark:text-white"
                href="/">home</NavLi
            >
            {#if data.user !== null}
                <NavLi
                    class="text-black md:hover:text-black hover:text-black dark:text-white"
                    href="/graph">graph</NavLi
                >
                <NavLi
                    class="text-black md:hover:text-black dark:text-white hover:text-black"
                    href="/cards">cards</NavLi
                >
                {#if data.user.admin}
                    <NavLi
                        class="text-black md:hover:text-black hover:text-black dark:text-white"
                        href="/admin/graph">admin graph</NavLi
                    >
                {/if}
                <NavLi
                    class="text-black md:hover:text-black hover:text-black dark:text-white"
                >
                    <div class="flex items-center md:order-2">
                        <Avatar
                            size={40}
                            name={data.user?.username}
                            variant={parseVariant(
                                JSON.stringify(avatar.variant),
                            )}
                            colors={[
                                avatar?.hex1,
                                avatar?.hex2,
                                avatar?.hex3,
                                avatar?.hex4,
                                avatar?.hex5,
                            ]}
                        />
                    </div>
                    <Dropdown
                        bind:open={dropdownOpen}
                        class="dark:bg-black dark:border dark:border-gray-600 dark:rounded"
                        placement="bottom"
                    >
                        <DropdownItem>
                            <span
                                class="block text-sm font-bold text-black dark:text-white"
                                >{data.user.username}</span
                            >
                        </DropdownItem>
                        <DropdownItem
                            class="text-black dark:text-white"
                            href="/settings">settings</DropdownItem
                        >
                        <DropdownDivider />
                        <DropdownItem
                            class="text-black dark:text-white"
                            on:click={logout}>log out</DropdownItem
                        >
                    </Dropdown>
                </NavLi>
            {:else}
                <NavLi>
                    <div class="flex items-center md:order-2">
                        <button on:click={() => (dropdownOpen = !dropdownOpen)}>
                            <DefaultAvatar src="" />
                        </button>
                    </div>
                    <Dropdown
                        bind:open={dropdownOpen}
                        class="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-black"
                        placement="bottom"
                    >
                        <DropdownHeader>
                            <span
                                class="block text-sm font-bold text-black dark:text-white"
                                >not logged in</span
                            >
                        </DropdownHeader>
                        <DropdownItem
                            class="text-black dark:text-white"
                            href="/login">log in</DropdownItem
                        >
                    </Dropdown>
                </NavLi>
            {/if}
            <NavLi
                on:click={() =>
                    dark.set(localStorage.getItem("color-theme") === "dark")}
            >
                <DarkMode />
            </NavLi>
        </NavUl>
    </Navbar>
    <div class="overflow-scroll pt-24 w-full h-full">
        <slot />
    </div>
</div>
