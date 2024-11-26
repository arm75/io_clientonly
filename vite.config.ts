import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        host: '0.0.0.0', // needed for the Docker Container port mapping to work
        strictPort: true,
        port: 5173, // needed for Docker also, you can replace this port with any port
        hmr: {
            overlay: false, // Set to supress 'Connecting...' and 'Connected.' messages in console log.
        },
    },
    build: {
        sourcemap: false,
        minify: 'esbuild',
    },
})
