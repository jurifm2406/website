<script lang="ts">
    import { page } from "$app/stores";
    import {
        Button,
        Helper,
        Input,
        Label,
        Modal,
        Select,
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch,
    } from "flowbite-svelte";
    import { writable } from "svelte/store";
    import type { ActionData, PageData } from "./$types";
    import Avatar from "svelte-boring-avatars";
    import {
        alertButtonStyle,
        defaultInputStyle,
        primaryButtonStyle,
    } from "$lib/styles";
    import { applyAction, enhance } from "$app/forms";
    import { ExclamationCircleOutline } from "flowbite-svelte-icons";
    import { roles } from "$lib/types";

    let searchTerm = "";

    let editModal = false;
    let deleteModal = false;

    let openRow: number;

    const selectionRoles = roles.map((role) => {
        return { value: role, name: role };
    });

    let editUserRoleSelected = "";
    let editUserName = "";

    function openEditModal(user) {
        editModal = true;
        editUserRoleSelected = user.role;
        editUserName = user.name;
    }

    export let data: PageData;
    $: activeUrl = $page.url.pathname;
    const activeClass =
        "flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-black bg-black dark:bg-white border dark:border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white";
    const nonActiveClass =
        "flex items-center p-2 text-base font-normal text-black rounded-lg dark:text-white border border-white hover:border-black dark:border-black dark:hover:border-white dark:hover:border-white";
    const inputClass =
        "bg-white border border-gray-300 text-black text-sm rounded-lg block w-80 p-2.5 ps-10 dark:bg-black dark:placeholder-white dark:text-white focus:ring-0 focus:border-black dark:focus:ring-0 dark:focus:border-white dark:border-gray-700";
    const tableColor = "text-white dark:text-black";
    const headCellClass = "px-6 py-3 text-black dark:text-white noselect";
    const bodyCellClass =
        "px-6 py-4 whitespace-nowrap font-medium text-black dark:text-white";

    const sortKey = writable("username"); // default sort key
    const sortDirection = writable(1); // default sort direction (ascending)
    const items = writable(data.users.slice()); // make a copy of the items array

    // Define a function to sort the items
    const sortTable = (key: string) => {
        // If the same key is clicked, reverse the sort direction
        if ($sortKey === key) {
            sortDirection.update((val) => -val);
        } else {
            sortKey.set(key);
            sortDirection.set(1);
        }
    };

    $: filteredItems = $items.filter(
        (item) =>
            item.username.toLowerCase().indexOf(searchTerm.toLowerCase()) !==
            -1,
    );

    $: {
        const key = $sortKey;
        const direction = $sortDirection;
        filteredItems = [...filteredItems].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            if (aVal < bVal) {
                return -direction;
            } else if (aVal > bVal) {
                return direction;
            }
            return 0;
        });
    }

    const toggleRow = (i) => {
        openRow = openRow === i ? null : i;
    };

    export let form: ActionData;
</script>

<div class="w-full mt-5">
    <Sidebar {activeClass} {activeUrl} asideClass="w-64 fixed" {nonActiveClass}>
        <SidebarWrapper class="bg-white dark:bg-black">
            <SidebarGroup>
                <SidebarItem href="/admin/graph" label="graph" />
                <SidebarItem href="/admin/users" label="users" />
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
    <div class="ml-64 py-4">
        <TableSearch
            bind:inputValue={searchTerm}
            divClass="shadow-lg dark:border dark:border-gray-700 rounded-lg"
            {inputClass}
            placeholder="search by username"
        >
            <Table color="custom" customeColor={tableColor} hoverable>
                <TableHead class="border-t-0">
                    <TableHeadCell class={headCellClass}>avatar</TableHeadCell>
                    <TableHeadCell
                        class={headCellClass}
                        on:click={() => sortTable("username")}
                    >
                        username
                    </TableHeadCell>
                    <TableHeadCell
                        class={headCellClass}
                        on:click={() => sortTable("name")}
                    >
                        full name
                    </TableHeadCell>
                    <TableHeadCell
                        class={headCellClass}
                        on:click={() => sortTable("role")}
                    >
                        role
                    </TableHeadCell>
                </TableHead>
                <TableBody tableBodyClass="divide-y border-t-0">
                    {#each filteredItems as user, i}
                        <TableBodyRow
                            class="border-b-0 border-white dark:border-black"
                            on:click={() => toggleRow(i)}
                        >
                            <TableBodyCell class={bodyCellClass}>
                                <Avatar
                                    size={40}
                                    name={user.username}
                                    variant={user.avatar?.variant}
                                    colors={user.avatar?.hex}
                                />
                            </TableBodyCell>
                            <TableBodyCell class={bodyCellClass}>
                                {user.username}
                            </TableBodyCell>
                            <TableBodyCell class={bodyCellClass}>
                                {user.name}
                            </TableBodyCell>
                            <TableBodyCell class={bodyCellClass}>
                                {user.role}
                            </TableBodyCell>
                        </TableBodyRow>
                        {#if openRow === i}
                            <TableBodyRow
                                class="border-b-0 border-white dark:border-black"
                            >
                                <TableBodyCell colspan="5">
                                    <div class="w-full flex justify-between">
                                        <Button
                                            on:click={() => openEditModal(user)}
                                            class="{primaryButtonStyle} mx-auto w-1/3"
                                        >
                                            edit
                                        </Button>

                                        <Modal
                                            bind:open={editModal}
                                            size="xs"
                                            class="bg-white shadow-lg dark:bg-black dark:border dark:border-gray-700"
                                            outsideclose
                                            classBackdrop="bg-transparent dark:bg-transparent"
                                        >
                                            <form
                                                class="text-center"
                                                method="post"
                                                action="?/edit"
                                                use:enhance={({ formData }) => {
                                                    formData.set("id", user.id);
                                                    return async ({
                                                        result,
                                                        update,
                                                    }) => {
                                                        update({
                                                            invalidateAll: true,
                                                            reset: true,
                                                        });
                                                        await applyAction(
                                                            result,
                                                        );
                                                        editModal = false;
                                                    };
                                                }}
                                            >
                                                <h3
                                                    class="text-black dark:text-white mb-5"
                                                >
                                                    edit account
                                                </h3>
                                                <Label
                                                    class="text-black dark:text-white mb-4"
                                                >
                                                    full name
                                                    <Input
                                                        class={defaultInputStyle}
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        bind:value={editUserName}
                                                    />
                                                </Label>
                                                <Select
                                                    bind:value={editUserRoleSelected}
                                                    class="{defaultInputStyle} mb-4"
                                                    items={selectionRoles}
                                                    name="role"
                                                />
                                                <Button
                                                    type="submit"
                                                    class="{primaryButtonStyle} me-2"
                                                >
                                                    confirm
                                                </Button>
                                                <Button
                                                    on:click={() =>
                                                        (editModal = false)}
                                                    class="{primaryButtonStyle} ms-2"
                                                >
                                                    cancel
                                                </Button>
                                                {#if form?.error}
                                                    <Helper color="red">
                                                        an error occurred
                                                    </Helper>
                                                {/if}
                                            </form>
                                        </Modal>

                                        <Button
                                            on:click={() =>
                                                (deleteModal = true)}
                                            class="{alertButtonStyle} mx-auto w-1/3"
                                        >
                                            delete
                                        </Button>

                                        <Modal
                                            bind:open={deleteModal}
                                            size="xs"
                                            class="bg-white shadow-lg dark:bg-black dark:border dark:border-gray-700"
                                            outsideclose
                                            classBackdrop="bg-transparent dark:bg-transparent"
                                        >
                                            <form
                                                class="text-center"
                                                method="post"
                                                action="?/delete"
                                                use:enhance={({ formData }) => {
                                                    formData.set("id", user.id);
                                                    return async ({
                                                        result,
                                                        update,
                                                    }) => {
                                                        update({
                                                            invalidateAll: true,
                                                        });
                                                        await applyAction(
                                                            result,
                                                        );
                                                        deleteModal = false;
                                                    };
                                                }}
                                            >
                                                <ExclamationCircleOutline
                                                    class="mx-auto mb-4 text-black w-12 h-12 dark:text-white"
                                                />
                                                <h3
                                                    class="text-black dark:text-white mb-5"
                                                >
                                                    Do you really want to delete
                                                    this account?
                                                </h3>
                                                <Button
                                                    type="submit"
                                                    class="{alertButtonStyle} me-2"
                                                >
                                                    yes please
                                                </Button>
                                                <Button
                                                    on:click={() =>
                                                        (deleteModal = false)}
                                                    class="{primaryButtonStyle} ms-2"
                                                >
                                                    no thanks
                                                </Button>
                                                {#if form?.error}
                                                    <Helper color="red">
                                                        an error occurred
                                                    </Helper>
                                                {/if}
                                            </form>
                                        </Modal>
                                    </div>
                                </TableBodyCell>
                            </TableBodyRow>
                        {/if}
                    {/each}
                </TableBody>
            </Table>
        </TableSearch>
    </div>
</div>
