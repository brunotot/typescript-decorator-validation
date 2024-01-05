import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["tdv-core", "tdv-react"],
  },
  resolve: {
    alias: {
      "tdv-core/validators": path.resolve(__dirname, "libs/tdv-core/dist/validators"),
    },
  },
});
