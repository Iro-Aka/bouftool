import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import ReactCompiler from "babel-plugin-react-compiler";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [ReactCompiler],
      targets: { electron: "39" }
    }
  }), tsconfigPaths()],
});
