import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://127.0.0.1:80/",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
  // server: {
  //   host: 'chat-back-laravel.test-1', // node container in docker
  //   origin: 'http://127.0.0.1:8000', // exposed node container address
  // },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:80',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      'laravel-breeze-react': resolve(__dirname, 'laravel-breeze-react'),
      'laravel-breeze-react-src': resolve(__dirname, 'laravel-breeze-react/src/'),
      'components': resolve(__dirname, 'laravel-breeze-react/src/components/'),
      'pages': resolve(__dirname, 'laravel-breeze-react/src/pages/'),
      'lib': resolve(__dirname, 'laravel-breeze-react/src/lib/'),
      'hooks': resolve(__dirname, 'laravel-breeze-react/src/hooks/'),
      'images': resolve(__dirname, 'laravel-breeze-react/src/images/'),
    }
  },
})
