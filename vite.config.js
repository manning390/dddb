import laravel from "laravel-vite-plugin";
import preprocess from "svelte-preprocess";
import { defineConfig } from "vite";
import { resolve } from 'path';
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        svelte({
            preprocess: preprocess({ postcss: true }),
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "resources/js"),
            ziggy: resolve(__dirname, "vendor/tightenco/ziggy/dist/index.es"),
        },
        dedupe: ['svelte', 'svelte/transition', 'svelte/internal'],
        extensions: [".js", ".ts", ".svelte", ".json"],
    },
});
