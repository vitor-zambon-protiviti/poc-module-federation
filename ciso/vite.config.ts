import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { federation } from '@module-federation/vite';

export default defineConfig({
  base: './', //importante: para que seja carregado corretamente no shell
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'ciso',
      filename: 'remoteEntry.js',
      remotes: {
        shell: {
          type: "module",
          name: "shell",
          entry: "http://localhost:5000/remoteEntry.js",
        }
      },
      exposes: {
        './Main': './src/App.jsx'
      },
      shared: ['react', 'react-dom', 'keycloak-js'],
    })
  ],
  build: {
    target: 'esnext',
    minify: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: { port: 5001 }
});
