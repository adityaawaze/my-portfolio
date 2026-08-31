import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import { seoInject } from './vite-plugin-seo'

// https://vite.dev/config/
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [inspectAttr(), react(), seoInject()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
