import { defineConfig } from "@solidjs/start/config";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
  vite: { plugins: [suidPlugin()] },
  server: { experimental: { websocket: true } },
}).addRouter({
  name: "ws",
  type: "http",
  handler: "./src/api/ws.ts",
  target: "server",
  base: "/ws",
});
