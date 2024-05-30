<script lang="ts">import { Register, Section } from "flowbite-svelte-blocks";
import { Button, Input, Label } from "flowbite-svelte";
import { enhance } from "$app/forms";
</script>

<Section name="login">
    <Register divClass="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="flex flex-col space-y-6" method="post" use:enhance>
                <h3 class="text-2xl font-bold text-black dark:text-white p-0">Login</h3>
                <Label class="space-y-2 text-black dark:text-white">
                    <span>username</span>
                    <Input class="dark:bg-gray-900" name="username" required type="text" />
                </Label>
                <Label class="space-y-2 text-black dark:text-white">
                    <span>password</span>
                    <Input class="dark:bg-gray-900" name="password" required type="password" />
                </Label>
                <Button class="w-full text-white dark:text-black bg-black dark:bg-white" type="submit">Sign in</Button>
                <p class="text-sm font-light text-black dark:text-white">
                    Don’t have an account yet? <a class="font-medium text-black hover:underline dark:text-white" href="/register">Sign up</a>
                </p>
            </form>
        </div>
    </Register>
</Section>