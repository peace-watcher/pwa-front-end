import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
// vite는 이걸로 svg 가져와야함!
import svgr from "@svgr/rollup";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        sw: "./public/firebase-messaging-sw.js",
      },
    },
  },
});
