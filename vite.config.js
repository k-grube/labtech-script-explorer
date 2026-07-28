import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  // gh-pages serves from /labtech-script-explorer/
  base: '/labtech-script-explorer/',
  plugins: [react(), nodePolyfills({ include: ['events', 'stream', 'string_decoder', 'timers', 'buffer'] })],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
})
