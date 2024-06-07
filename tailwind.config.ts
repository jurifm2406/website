const config = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte-blocks/**/*.{html,js,svelte,ts}",
    ],

    plugins: [require("flowbite/plugin"), require("flowbite-typography")],

    darkMode: "class",

    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#FFFFFF",
                    100: "#FFFFFF",
                    200: "#FFFFFF",
                    300: "#FFFFFF",
                    400: "#FFFFFF",
                    500: "#FFFFFF",
                    600: "#FFFFFF",
                    700: "#FFFFFF",
                    800: "#FFFFFF",
                    900: "#FFFFFF",
                },
            },
        },
    },
};

module.exports = config;
