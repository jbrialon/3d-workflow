import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  root: "src/",
  publicDir: "../static/",
  base: "./",
  server: {
    host: true,
    open: true,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [vue(), glsl()],
});
