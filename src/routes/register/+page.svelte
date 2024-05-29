<script lang="ts">
    import { Section, Register } from "flowbite-svelte-blocks";
    import { Button, Label, Helper, Input } from "flowbite-svelte";
    import { enhance } from "$app/forms";

    export let form;
</script>

<Section name="register">
    <Register>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="flex flex-col space-y-6" method="post" use:enhance>
                <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Create an account</h3>
                <Label class="space-y-2">
                    <span>username</span>
                    <Input type="text" name="username" required />
                </Label>
                { #if form?.usernameMissing }
                    <Helper color="red">
                        username is missing
                    </Helper>
                { /if }
                <Label class="space-y-2">
                    <span>name</span>
                    <Input type="text" name="name" required />
                </Label>
                <Label class="space-y-2">
                    <span>password</span>
                    <Input type="password" name="password" required />
                </Label>
                { #if form?.passwordMissing }
                    <Helper color="red">
                        password is missing
                    </Helper>
                { /if }
                <Label class="space-y-2">
                    <span>confirm password</span>
                    <Input type="password" name="password" required />
                </Label>
                { #if form?.passwordMismatch }
                    <Helper color="red">
                        passwords do not match
                    </Helper>
                { /if }
                <Button type="submit" class="w-full1">Create an account</Button>
                { #if form?.userExists }
                    <Helper color="red">
                        user already exists
                    </Helper>
                { /if }
                { #if form?.unknownError }
                    <Helper color="red">
                        an error occurred
                    </Helper>
                { /if }
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                </div>
            </form>
        </div>
    </Register>
</Section>
