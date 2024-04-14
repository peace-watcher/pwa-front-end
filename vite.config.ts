import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

// vite는 이걸로 svg 가져와야함!
import svgr from "@svgr/rollup";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"], // 정적 자산 포함
      manifest: {
        short_name: "안전Dream",
        name: "안전Dream",
        description: "흉기난동에서 안전한 삶! 안전Dream",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        dir: "ltr",
        start_url: ".",
        display: "standalone",
        orientation: "any",
        scope: "/",
        icons: [
          {
            src: "/safeDream.png",
            type: "image/x-icon",
            sizes: "512x512",
            purpose: "any maskable",
          },
          {
            src: "/safeDream.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/safeDream.png",
            type: "image/png",
            sizes: "480x288",
            purpose: "any maskable",
          },
        ],
      },
    }),
    tsconfigPaths(),
    svgr(),
  ],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: "./index.html",
  //       sw: "./public/firebase-messaging-sw.js",
  //     },
  //   },
  // },
});
