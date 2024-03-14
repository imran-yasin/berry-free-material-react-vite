import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import generatedAliases from "./generate-aliases";
export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        ...generatedAliases,
      },
    },
    build: {
      outDir: "build",
    },
    plugins: [react()],
    
  };
});
