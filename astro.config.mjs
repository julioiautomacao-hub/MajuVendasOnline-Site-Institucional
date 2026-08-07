// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    // gera termos-de-uso.html em vez de termos-de-uso/index.html
    format: "file",
  },
});
