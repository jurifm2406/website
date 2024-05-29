<script lang="ts">import { Section, Register } from "flowbite-svelte-blocks";
import { Button, Label, Input } from "flowbite-svelte";
import { enhance } from "$app/forms";
</script>

<Section name="login">
    <Register>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="flex flex-col space-y-6" method="post" use:enhance>
                <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Login</h3>
                <Label class="space-y-2">
                    <span>username</span>
                    <Input type="text" name="username" required />
                </Label>
                <Label class="space-y-2">
                    <span>password</span>
                    <Input type="password" name="password" required />
                </Label>
                <Button type="submit" class="w-full1">Sign in</Button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p>
            </form>
        </div>
    </Register>
</Section>