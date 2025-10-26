import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2022', // napi-rs wasi-browser.js output relies on top-level await
  },
  optimizeDeps: {
    exclude: ['oxc-parser'], // Don't pre-bundle WASM modules
    esbuildOptions: {
      target: 'es2022', // napi-rs wasi-browser.js output relies on top-level await
    },
  },
  // These two cross origin headers are used to fix the following error:
  // TypeError: Failed to execute 'decode' on 'TextDecoder': The provided ArrayBufferView value must not be shared.
  // But they block Vite's dev modules from loading
  /*
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  */
});
