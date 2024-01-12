import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import commonJs from "vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    commonJs(),
    react({
      babel: {
        presets: ["@babel/preset-env", "@babel/preset-typescript"],
        plugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
      },
    }),
  ],
  optimizeDeps: {
    include: ["tdv-core", "tdv-react"],
  },
  resolve: {
    alias: {
      "tdv-core/validators": path.resolve(__dirname, "libs/tdv-core/dist/validators"),
    },
  },
});
