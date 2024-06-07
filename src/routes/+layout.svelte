<script lang="ts">
import "../app.css";
import { goto } from "$app/navigation";
import {
    Avatar,
    DarkMode,
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
        await goto("/", {
            replaceState: true,
            invalidateAll: true,
        });
    }
}

export let data: LayoutData;
</script>

<div class="relative px-8 h-screen">
    <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b shadow bg-white dark:bg-black">
        <NavBrand href="/">
            <span id="subject" class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">franz münzner</span>
        </NavBrand>
        <NavHamburger />
        <NavUl ulClass="flex flex-col items-center p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium">
            <NavLi class="text-black md:hover:text-black hover:text-black dark:text-white" active={true} href="/">home</NavLi>
            { #if data.user !== null }
                <NavLi class="text-black md:hover:text-black hover:text-black dark:text-white" href="/graph">graph</NavLi>
                <NavLi class="text-black md:hover:text-black dark:text-white hover:text-black" href="/cards">cards</NavLi>
                { #if data.user.admin }
                    <NavLi class="text-black md:hover:text-black hover:text-black dark:text-white" href="/admin/graph">admin graph</NavLi>
                { /if }
                <NavLi class="text-black md:hover:text-black hover:text-black dark:text-white">
                    <div class="flex items-center md:order-2">
                        <Avatar id="avatar-menu" src={data.user.avatar}/>
                    </div>
                    <Dropdown class="dark:bg-black dark:border dark:border-gray-600 dark:rounded" placement="bottom" triggeredBy="#avatar-menu">
                        <DropdownItem>
                            <span class="block text-sm font-bold text-black dark:text-white">{ data.user.username }</span>
                        </DropdownItem>
                        <DropdownItem class="text-black dark:text-white" href="/settings">settings</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem class="text-black dark:text-white" on:click={logout}>log out</DropdownItem>
                    </Dropdown>
                </NavLi>
            { :else }
                <NavLi>
                    <div class="flex items-center md:order-2">
                        <Avatar id="avatar-menu" src="" />
                        <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
                    </div>
                    <Dropdown class="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-black" placement="bottom" triggeredBy="#avatar-menu">
                        <DropdownHeader>
                            <span class="block text-sm font-bold text-black dark:text-white">not logged in</span>
                        </DropdownHeader>
                        <DropdownItem class="text-black dark:text-white" href="/login">log in</DropdownItem>
                    </Dropdown>
                </NavLi>
            { /if }
            <NavLi>
                <DarkMode />
            </NavLi>
        </NavUl>
    </Navbar>
    <div class="overflow-scroll pt-24 w-full h-full">
        <slot />
    </div>
</div>

