<script lang="ts">import { Register, Section } from "flowbite-svelte-blocks";
import { Button, Helper, Input, Label } from "flowbite-svelte";
import { enhance } from "$app/forms";
import { defaultButtonStyle, defaultInputStyle } from "$lib/styles";
import type { ActionData } from "./$types";

export let form: ActionData
</script>

<Section name="login">
    <Register divClass="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="flex flex-col space-y-6" method="post" use:enhance>
                <h3 class="text-2xl font-extrabold text-black dark:text-white p-0">login</h3>
                <Label class="space-y-2 text-black dark:text-white">
                    <span>username</span>
                    <Input class={ defaultInputStyle } name="username" required type="text" />
                </Label>
                <Label class="space-y-2 text-black dark:text-white">
                    <span>password</span>
                    <Input class={ defaultInputStyle } name="password" required type="password" />
                </Label>
                <Button class="{ defaultButtonStyle }" type="submit">login</Button>
                { #if form?.incorrect}
                    <Helper color="red">
                        invalid username or password
                    </Helper>
                { /if }
                <p class="text-sm font-light text-black dark:text-white">
                    don’t have an account yet? <a class="font-medium text-black hover:underline dark:text-white" href="/register">register here</a>
                </p>
            </form>
        </div>
    </Register>
</Section>