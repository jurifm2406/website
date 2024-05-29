<script lang="ts">
    import { enhance } from "$app/forms";
    import { Button, Helper, Input, Label } from "flowbite-svelte";
    import { Register, Section } from "flowbite-svelte-blocks";

    export let form;
</script>

<Section name="register">
    <Register>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="flex flex-col space-y-6" method="post" use:enhance>
                <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Create an account</h3>
                <Label class="space-y-2">
                    <span>username</span>
                    <Input name="username" required type="text" />
                </Label>
                { #if form?.usernameMissing }
                    <Helper color="red">
                        username is missing
                    </Helper>
                { /if }
                <Label class="space-y-2">
                    <span>name</span>
                    <Input name="name" required type="text" />
                </Label>
                <Label class="space-y-2">
                    <span>password</span>
                    <Input name="password" required type="password" />
                </Label>
                { #if form?.passwordMissing }
                    <Helper color="red">
                        password is missing
                    </Helper>
                { /if }
                <Label class="space-y-2">
                    <span>confirm password</span>
                    <Input name="password" required type="password" />
                </Label>
                { #if form?.passwordMismatch }
                    <Helper color="red">
                        passwords do not match
                    </Helper>
                { /if }
                <Button class="w-full1" type="submit">Create an account</Button>
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
                    Already have an account? <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/login">Login here</a>
                </div>
            </form>
        </div>
    </Register>
</Section>
