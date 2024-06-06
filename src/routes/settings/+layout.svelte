<script>
import { page } from "$app/stores";
import {
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
} from "flowbite-svelte";
$: activeUrl = $page.url.pathname;
</script>

<Sidebar activeClass="flex items-center p-2 text-base font-normal text-white bg-black dark:bg-white rounded-lg dark:text-black" nonActiveClass="flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" {activeUrl}>
    <SidebarWrapper divClass="overflow-y-auto py-4 px-3 bg-white rounded dark:bg-black">
        <SidebarGroup>
            <SidebarItem label="Profile" href="/settings/profile" />
        </SidebarGroup>
    </SidebarWrapper>
</Sidebar>

<slot />