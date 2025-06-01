import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
        open: 'src/pages/student.html',
    },
    build: {
        rollupOptions: {
            input: {
                login: resolve(__dirname, 'src/pages/login.html'),
                dashboard: resolve(__dirname, 'src/pages/dashboard.html'),
            },
        },
    },
});