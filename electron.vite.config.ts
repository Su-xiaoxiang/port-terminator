import { resolve } from 'node:path'

import { defineConfig } from 'electron-vite'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    build: {
      externalizeDeps: true
    },

    resolve: {
      alias: {
        '@main': resolve('src/main'),
        '@shared': resolve('src/shared')
      }
    }
  },

  preload: {
    build: {
      externalizeDeps: true
    },

    resolve: {
      alias: {
        '@shared': resolve('src/shared')
      }
    }
  },

  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared')
      }
    },

    plugins: [react(), tailwindcss()]
  }
})
