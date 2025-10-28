import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        ciso: {
          type: "module",
          name: "ciso",
          entry: "http://localhost:5001/remoteEntry.js",
        }
      },
      exposes: {
        './auth': './src/modules/auth/index.ts',
      },
      shared: ['react', 'react-dom', 'keycloak-js'],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: { port: 5000 },
});
