<script lang="ts">
    import "../app.css"
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode, Avatar, Dropdown, DropdownHeader, DropdownItem } from 'flowbite-svelte';
    import type { PageData } from "./$types"

    export let data: PageData;
</script>

<div class="relative px-8 mb-14">
    <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
        <NavBrand href="/">
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Franz Münzner</span>
        </NavBrand>
        <NavHamburger />
        <NavUl>
            <NavLi href="/" active={true}>Home</NavLi>
            <NavLi href="/graph">Graph</NavLi>
            <NavLi>
                { #if data.user}
                    <div class="flex items-center md:order-2">
                        <Avatar id="avatar-menu" src="/static/favicon.png" />
                        <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
                    </div>
                    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
                        <DropdownHeader>
                            <span class="block text-sm">{ data.user.username }</span>
                        </DropdownHeader>
                        <DropdownItem href="">Log out</DropdownItem>
                    </Dropdown>
                { /if }
            </NavLi>
            <NavLi>
                <DarkMode />
            </NavLi>
        </NavUl>
    </Navbar>
</div>

<slot />
