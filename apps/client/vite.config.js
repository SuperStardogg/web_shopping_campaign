import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'


const pathAlias = {
  '@': path.resolve(__dirname, './src'),
  '#': path.resolve(__dirname, './types'),
  '@root': path.resolve(__dirname, './'),
}
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: pathAlias,
  },
  plugins: [vue(), Pages({
    dirs: 'src/pages',
  })],
})
