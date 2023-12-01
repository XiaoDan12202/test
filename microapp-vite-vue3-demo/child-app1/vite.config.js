import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: `${
    process.env.NODE_ENV === "production" ? "http://www.micro-zoe.com" : ""
  }/system/`,
  plugins: [vue()],
  server: {
    host: false,
    port: "3002"
  }
});
