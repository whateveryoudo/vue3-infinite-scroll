/*
 * @Description:
 * @Autor: ykx
 * @Date: 2022-10-12 09:44:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-13 01:04:20
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'lib',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'Vu3InfiniteScroll',
      // the proper extensions will be added
      fileName: 'Vu3InfiniteScroll'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
