/*
 * @Author: ykx
 * @Date: 2022-10-10 10:02:36
 * @LastEditTime: 2022-10-11 15:35:33
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue3-infinite-scroll\docs\.vitepress\theme\index.ts
 */
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import BaseScroll from '../components/BaseScroll.vue'
import HorizontalScroll from '../components/HorizontalScroll.vue'
import SpeedScroll from '../components/SpeedScroll.vue'
import ChangeDataScroll from '../components/ChangeDataScroll.vue'
import ControlScroll from '../components/ControlScroll.vue'
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('BaseScroll', BaseScroll);
        app.component('HorizontalScroll', HorizontalScroll);
        app.component('SpeedScroll', SpeedScroll);
        app.component('ChangeDataScroll', ChangeDataScroll);
        app.component('ControlScroll', ControlScroll);
    }
} 

