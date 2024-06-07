<script lang="ts">
import { enhance } from "$app/forms";
import { defaultButtonStyle, defaultInputStyle } from "$lib/styles";
import { Button, Helper, Input, Label } from "flowbite-svelte";
import { Register, Section } from "flowbite-svelte-blocks";

export let form;
</script>

<Section name="register">
    <Register divClass="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <form class="flex flex-col space-y-6" method="post" use:enhance>
                <h3 class="text-xl font-extrabold text-black dark:text-white p-0">create an account</h3>
                <Label class="space-y-2 text-black dark:text-white">
                    <span>username</span>
                    <Input class={ defaultInputStyle } name="username" required type="text" />
                </Label>
                { #if form?.usernameInvalid }
                    <Helper color="red">
                        username is missing
                    </Helper>
                { /if }
                <Label class="space-y-2 text-black dark:text-white">
                    <span>name</span>
                    <Input class={defaultInputStyle} name="name" required type="text" />
                </Label>
                <Label class="space-y-2 text-black dark:text-white">
                    <span>password</span>
                    <Input class={ defaultInputStyle } name="password" required type="password" />
                </Label>
                { #if form?.passwordInvalid }
                    <Helper color="red">
                        password is missing
                    </Helper>
                { /if }
                <Label class="space-y-2 text-black dark:text-white">
                    <span>confirm password</span>
                    <Input class={ defaultInputStyle } name="password_confirm" required type="password" />
                </Label>
                { #if form?.passwordMismatch }
                    <Helper color="red">
                        passwords do not match
                    </Helper>
                { /if }
                <Button class="w-full { defaultButtonStyle }" type="submit">register</Button>
                { #if form?.userDuplicate }
                    <Helper color="red">
                        user already exists
                    </Helper>
                { /if }
                { #if form?.unknownError }
                    <Helper color="red">
                        an error occurred
                    </Helper>
                { /if }
                <div class="text-sm text-black dark:text-white">
                    already have an account? <a class="font-semibold hover:underline text-black dark:text-white" href="/login">login here</a>
                </div>
            </form>
        </div>
    </Register>
</Section>
