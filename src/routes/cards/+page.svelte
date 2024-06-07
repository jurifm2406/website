<script>
import Farbenglitschen from "$lib/components/Farbenglitschen.svelte";
import { TabItem, Tabs } from "flowbite-svelte";
</script>


<Tabs
    defaultClass="flex flex-wrap justify-center space-x-2 rtl:space-x-reverse"
    activeClasses="p-4 text-black border-b-2 font-bold dark:font-bold border-black dark:text-white dark:border-white"
    inactiveClasses="p-4 dark:hover:border-b hover:border-b border-black dark:border-white hover:text-black hover:border-black dark:hover:text-white text-black dark:text-white"
    contentClass="p-4 bg-white shadow-lg w-11/12 rounded-lg dark:bg-black dark:border dark:border-gray-600 mt-4 mx-auto"
>
    <TabItem title="farbenglitschen">
        <div class="w-full h-full bg-white dark:bg-black">
            <Farbenglitschen></Farbenglitschen>
        </div>
    </TabItem>
</Tabs>