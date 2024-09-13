const config = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte-blocks/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}",
    ],

    plugins: [require("flowbite/plugin"), require("flowbite-typography")],

    darkMode: "class",

    theme: {
        extend: {},
    },
};

module.exports = config;
