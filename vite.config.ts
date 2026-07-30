import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import { defineConfig } from "vite";
import fs from "fs";

function injectSchemaPlugin() {
  return {
    name: "inject-schema",
    transformIndexHtml(html: string) {
      const apiPath = __dirname;
      const sitesPath = path.resolve(apiPath, "..");

      const schemaPath = path.join(sitesPath, "ReactHomePage", "Websiteschema.json");
      const schemaJson = fs.readFileSync(schemaPath, "utf-8");

      return html.replace(
        "</head>",
        `<script type="application/ld+json">${schemaJson}</script>\n</head>`
      );
    },
  };
}

export default defineConfig({
  plugins: [react(),
    // injectSchemaPlugin()
    , legacy({
      targets: ['defaults', 'iOS >= 13', 'Safari >= 13'],
    }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  // server: {
  //   proxy: {
  //     '/api/proxy/menu': {
  //       target: 'https://www.astroved.com/mainmenunew.json',
  //       changeOrigin: true,
  //       rewrite: () => '',
  //     },
  //   },
  // },
  base: '/ReactHome'
});