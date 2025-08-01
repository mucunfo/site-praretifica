import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Preservar comentários de licença
        preserveModules: false,
        manualChunks: undefined,
        // Configurações para preservar comentários
        banner: (chunk) => {
          if (chunk.fileName.endsWith('.css')) {
            return '/* Site Praretifica - Built with Vite */'
          }
          return ''
        }
      }
    },
    // Preservar comentários de licença no CSS
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      format: {
        comments: /license|@preserve|@license|@cc_on/i
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Configurações do Sass
        // additionalData: `@import "css/variables";`
      }
    },
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@css': resolve(__dirname, './css'),
      '@js': resolve(__dirname, './js'),
      '@img': resolve(__dirname, './img')
    }
  },
  server: {
    port: 3000,
    open: true
  }
}) 