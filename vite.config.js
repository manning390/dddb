import laravel from "laravel-vite-plugin";
import preprocess from "svelte-preprocess";
import { defineConfig } from "vite";
import { resolve } from 'path';
import { svelte } from "@sveltejs/vite-plugin-svelte";

const projectRoot = resolve(__dirname);

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
            "@": resolve(projectRoot, "resources/js"),
            ziggy: resolve(projectRoot, "vendor/tightenco/ziggy/dist/index.es"),
        },
        extensions: [".js", ".svelte", ".json"],
    },
});
