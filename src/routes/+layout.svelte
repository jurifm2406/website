<script lang="ts">
    import "../app.css";
    import { goto } from "$app/navigation";
    import {
        Avatar,
        DarkMode,
        Dropdown,
        DropdownHeader,
        DropdownItem,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl,
        Navbar
    } from "flowbite-svelte";
    import type { LayoutData } from "./$types";

    async function logout() {
        const response = await fetch("/logout", {
            method: "POST",
            body: "",
            headers: {
                "content-type": "application/json",
            },
        });

        if (response.ok) {
            goto("/", {
                replaceState: true,
                invalidateAll: true,
            });
        }
    }

    export let data: LayoutData;
</script>

<div class="relative px-8 mb-14">
    <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
        <NavBrand href="/">
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">franz münzner</span>
        </NavBrand>
        <NavHamburger />
        <NavUl ulClass="flex flex-col items-center p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
            <NavLi active={true} href="/">home</NavLi>
            { #if data?.user !== null }
                <NavLi href="/graph">graph</NavLi>
                <NavLi>
                    <div class="flex items-center md:order-2">
                        <Avatar id="avatar-menu" src="" />
                        <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
                    </div>
                    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
                        <DropdownHeader>
                            <span class="block text-sm">{ data.user.username }</span>
                        </DropdownHeader>
                        <DropdownItem on:click={logout}>log out</DropdownItem>
                    </Dropdown>
                </NavLi>
            { :else }
                <NavLi>
                    <div class="flex items-center md:order-2">
                        <Avatar id="avatar-menu" src="" />
                        <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
                    </div>
                    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
                        <DropdownHeader>
                            <span class="block text-sm">not logged in</span>
                        </DropdownHeader>
                        <DropdownItem href="/login">log in</DropdownItem>
                    </Dropdown>
                </NavLi>
            { /if }
            <NavLi>
                <DarkMode />
            </NavLi>
        </NavUl>
    </Navbar>
</div>

<slot />
