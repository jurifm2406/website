<script>
import Farbenglitschen from "$lib/components/Farbenglitschen.svelte";
import { TabItem, Tabs } from "flowbite-svelte";
</script>


<Tabs
    defaultClass="flex flex-wrap justify-center space-x-2 rtl:space-x-reverse"
    activeClasses="p-4 text-black border-b-2 font-bold dark:font-bold border-black dark:text-white dark:border-white"
    inactiveClasses="p-4 dark:hover:border-b hover:border-b border-black dark:border-white hover:text-black hover:border-black dark:hover:text-white text-black dark:text-white"
>
    <TabItem title="farbenglitschen">
        <div class="w-full h-full">
            <Farbenglitschen></Farbenglitschen>
        </div>
    </TabItem>
</Tabs>