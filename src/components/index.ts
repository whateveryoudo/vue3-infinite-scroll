/*
 * @Author: ykx
 * @Date: 2022-10-10 11:29:16
 * @LastEditTime: 2022-10-13 00:37:36
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \vue3-infinite-scroll\src\components\index.ts
 */
import InfiniteScroll from './infinite-scroll.vue'
import { App } from 'vue'
export * from './type'

const install = (app: App) => {
  app.component('Vue3InfiniteScroll', InfiniteScroll)
}
export default {
  install
}
export { InfiniteScroll as Vue3InfiniteScroll }
