import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    gloabls: true,
    environment: "jsdom",
  },
  plugins: [react()],
});
