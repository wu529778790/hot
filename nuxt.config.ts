// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import { resolve } from "node:path";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  pages: true, // 启用页面路由
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    "#": resolve(__dirname, "./server"),
  },
  nitro: {
    experimental: {
      database: true,
    },
    database: {
      default: {
        connector: "better-sqlite3",
        options: { 
          database: process.env.NODE_ENV === 'test' ? ':memory:' : './db.sqlite',
        },
      },
    },
  },
});
