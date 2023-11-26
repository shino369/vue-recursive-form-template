import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { dirname, resolve } from 'node:path'

// https://vitejs.dev/config/
export default ({ mode }: { mode: 'development' | 'production' }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return defineConfig({
    plugins: [
      vue(),
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './public/locales/*.json'), // provide a path to the folder where you'll store translation data (see below)
        runtimeOnly: false,
        strictMessage: false
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // build: { // build config no need to set too many I guess

    // },
    base: '/vue-recursive-form-template/',
    server: {
      port: 3000,
      proxy: {
        '/hqdemo/rest_api/tms': 'http://localhost:80'

        //   //   // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
        //   //   '/foo': 'http://localhost:4567',
        //   //   // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
        //   '/api': 'hqdemo/rest_api/tms/'
        //   //   // with RegEx: http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
        //   //   '^/fallback/.*': {
        //   //     target: 'http://jsonplaceholder.typicode.com',
        //   //     changeOrigin: true,
        //   //     rewrite: (path) => path.replace(/^\/fallback/, ''),
        //   //   },
        //   //   // Using the proxy instance
        //   //   '/api': {
        //   //     target: 'http://jsonplaceholder.typicode.com',
        //   //     changeOrigin: true,
        //   //     configure: (proxy, options) => {
        //   //       // proxy will be an instance of 'http-proxy'
        //   //     },
        //   //   },
        //   //   // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
        //   //   '/socket.io': {
        //   //     target: 'ws://localhost:5174',
        //   //     ws: true,
        //   //   },
      }
    }
  })
}
