import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/mvavilin-JSFE2025Q3/',

  server: { open: true },

  plugins: [tsconfigPaths()],
});
