import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    resolve: {
        alias: [{find: '@', replacement: '/resources/ts'}]
    },
    plugins: [
        react(),
        laravel({
            input: ['resources/ts/app.tsx'],
            refresh: true,
        }),
    ],
});