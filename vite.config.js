import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
            ssr: "resources/js/ssr.tsx",
        }),
        react(),
        tailwindcss(),
    ],
    optimizeDeps: {
        exclude: ["some-lib"],
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
});
