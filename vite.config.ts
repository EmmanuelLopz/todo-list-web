import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.EXPO_PUBLIC_API_URL || 'http://localhost:8080'

  return {
    plugins: [react()],
    envPrefix: ['VITE_', 'EXPO_PUBLIC_'],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/auth':   { target: backendUrl, changeOrigin: true },
        '/lists':  { target: backendUrl, changeOrigin: true },
        '/list':   { target: backendUrl, changeOrigin: true },
        '/tasks':  { target: backendUrl, changeOrigin: true },
        '/task':   { target: backendUrl, changeOrigin: true },
        '/colors':     { target: backendUrl, changeOrigin: true },
        '/priorities': { target: backendUrl, changeOrigin: true },
      },
    },
  }
})
