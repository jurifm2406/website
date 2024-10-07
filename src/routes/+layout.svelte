<script lang="ts">
    import "../app.css";
    import { goto } from "$app/navigation";
    import {
        DarkMode,
        Avatar as PlaceholderAvatar,
        Dropdown,
        DropdownDivider,
        DropdownHeader,
        DropdownItem,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl,
        Navbar,
        P,
    } from "flowbite-svelte";
    import Avatar from "svelte-boring-avatars";
    import type { LayoutData } from "./$types";
    import { dark } from "$lib/stores";
    import { onMount } from "svelte";
    import { BellSolid } from "flowbite-svelte-icons";

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

    export let data: LayoutData;

    onMount(() => {
        dark.set(localStorage.getItem("color-theme") === "dark");
    });

    const notificationColor = {
        social: "green",
        technical: "blue",
        warning: "red",
    };
</script>

<div class="relative px-8 h-screen">
    <Navbar
        class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b shadow bg-white dark:bg-black"
    >
        <NavBrand href="/">
            <span
                class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
                id="subject"
            >
                franz münzner
            </span>
        </NavBrand>
        <NavHamburger />
        <NavUl
            ulClass="flex flex-col items-center p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium"
        >
            <NavLi
                active={true}
                class="text-black md:hover:text-black hover:text-black dark:text-white"
                href="/"
            >
                home
            </NavLi>
            {#if data.user !== null}
                <NavLi
                    class="text-black md:hover:text-black hover:text-black dark:text-white"
                    href="/graph"
                >
                    graph
                </NavLi>
                <NavLi
                    class="text-black md:hover:text-black dark:text-white hover:text-black"
                    href="/cards"
                >
                    cards
                </NavLi>
                <NavLi
                    class="text-black md:hover:text-black hover:text-black dark:text-white"
                >
                    <BellSolid size="lg" />
                    <Dropdown
                        class="dark:bg-black dark:border dark:border-gray-600 dark:rounded"
                        placement="bottom"
                    >
                        {#if data.user?.notifications.length === 0}
                            <div class="pb-2 pt-2 pl-5 pr-5">
                                <P>nothing to see here</P>
                            </div>
                        {:else}
                            {#each data.user?.notifications as notification}
                                <div
                                    class="pb-2 pt-2 pl-5 pr-5 border-l-4 border-{notificationColor[
                                        notification.template.type
                                    ]}"
                                >
                                    <P>
                                        {notification.template.content.replace(
                                            "%origin%",
                                            notification.origin
                                                ? notification.origin.username
                                                : "",
                                        )}
                                    </P>
                                </div>
                            {/each}
                        {/if}
                    </Dropdown>
                </NavLi>
                <NavLi
                    class="text-black md:hover:text-black hover:text-black dark:text-white"
                >
                    <div class="flex items-center md:order-2">
                        <Avatar
                            size={40}
                            name={data.user?.username}
                            variant={data.user.avatar.variant}
                            colors={data.user.avatar.hex}
                        />
                    </div>
                    <Dropdown
                        class="dark:bg-black dark:border dark:border-gray-600 dark:rounded"
                        placement="bottom"
                    >
                        <DropdownItem>
                            <span
                                class="block text-sm font-bold text-black dark:text-white text-center"
                            >
                                {data.user.username}
                            </span>
                        </DropdownItem>
                        <DropdownDivider />
                        {#if data.user.role === "admin"}
                            <DropdownItem
                                class="text-black dark:text-white text-center"
                                href="/admin/graph"
                            >
                                admin dashboard
                            </DropdownItem>
                        {/if}
                        <DropdownItem
                            class="text-black dark:text-white text-center"
                            href="/profile/settings"
                        >
                            settings
                        </DropdownItem>
                        <DropdownDivider />
                        <DropdownItem
                            class="text-black dark:text-white text-center"
                            on:click={logout}
                        >
                            log out
                        </DropdownItem>
                    </Dropdown>
                </NavLi>
            {:else}
                <NavLi>
                    <div id="avatar" class="flex items-center md:order-2">
                        <PlaceholderAvatar />
                    </div>
                    <Dropdown
                        class="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-black"
                        placement="bottom"
                    >
                        <DropdownHeader>
                            <span
                                class="block text-sm font-bold text-black dark:text-white"
                            >
                                not logged in
                            </span>
                        </DropdownHeader>
                        <DropdownItem
                            class="text-black dark:text-white"
                            href="/login"
                        >
                            log in
                        </DropdownItem>
                        <DropdownItem
                            class="text-black dark:text-white"
                            href="/register"
                        >
                            register
                        </DropdownItem>
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
