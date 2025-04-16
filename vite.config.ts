
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Provide process.env for Next.js components
    "process.env": {
      NODE_ENV: mode,
      __NEXT_ROUTER_BASEPATH: "",
      __NEXT_SCROLL_RESTORATION: false,
      __NEXT_I18N_SUPPORT: false,
      __NEXT_HAS_REWRITES: false,
    }
  },
}));
