/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/warsztat_pieknych_wlosow/",
  plugins: [react(), tailwindcss()],
  server: { port: 3000 },
  resolve: {
    alias: {
      "@api": resolve(__dirname, "./src/@api"),
      "@constants": resolve(__dirname, "./src/@constants"),
      "@context": resolve(__dirname, "./src/@context"),
      "@helpers": resolve(__dirname, "./src/@helpers"),
      "@hooks": resolve(__dirname, "./src/@hooks"),
      "@models": resolve(__dirname, "./src/@types"),
      "@languages": resolve(__dirname, "./src/@languages"),
      "@ui": resolve(__dirname, "./src/@ui"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["test/setupTests.ts"],
  },
});
