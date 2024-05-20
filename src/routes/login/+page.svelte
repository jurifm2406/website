<script>
import { enhance } from "$app/forms";
import "../../app.css";
</script>

<div class="flex justify-center items-center h-screen w-screen text-center">
    <form class="border-2 p-2 rounded-xl grid auto-rows-min gap-3" method="post" use:enhance>
        <h3 class="text-center h3">Login</h3>

        <label class="label" for="username">
            <span>username</span>
        </label>
        <input class="input" type="text" placeholder="" name="username" id="username" />

        <label for="password" class="label">
            <span>password</span>
        </label>
        <input class="input" type="password" placeholder="" name="password" id="password" />
        <button type="submit" class="btn variant-outline btn-sm">Login</button>
    </form>
</div>