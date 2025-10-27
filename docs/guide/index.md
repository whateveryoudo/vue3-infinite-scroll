<!--
 * @Author: ykx
 * @Date: 2022-10-10 10:20:06
 * @LastEditTime: 2022-10-13 02:44:29
 * @LastEditors: Please set LastEditors
 * @Description: 指引目录
 * @FilePath: \vue3-infinite-scroll\docs\guide\index.md
-->
# 安装

```bash
npm install vue-next-infinite-scroll --save
# 或
yarn install vue-next-infinite-scroll --save
# 或
pnpm install vue-next-infinite-scroll --save
```

## 组件注册

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";
// 全局注册
import Vue3InfiniteScroll from "vue-next-infinite-scroll";
import "vue-next-infinite-scroll/lib/style.css"; // 注意样式引入

const app = createApp(App);
app.use(Vue3InfiniteScroll);
app.mount("#app");
```

```js
// 局部注册（推荐）
import { Vue3InfiniteScroll } from "vue-next-infinite-scroll";
import "vue-next-infinite-scroll/lib/style.css"; // 注意样式引入
```

## 组件中使用
::: tip
**两种使用方式说明：**

- **直接使用（普通模式）**：直接在 slot 中渲染内容，单步滚动时需传入 `singleStepDis` 指定距离(你需要自己手动计算每项的高度)
- **slot 渲染模式**：通过 `custom-render` 插槽自定义渲染，单步滚动时需传入 `singleDataCount` 指定单次滚动条数
:::
### 直接使用

<ClientOnly>
<BaseScroll style="margin-top: 10px"></BaseScroll>
</ClientOnly>

```vue
<template>
  <Vue3InfiniteScroll
    class="out-wrapper"
    :height="120"
  >
    <div v-for="(text, index) in listData" :key="index" class="list-item">
      {{ text }}
    </div>
  </Vue3InfiniteScroll>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Vue3InfiniteScroll from "vue-next-infinite-scroll";
import "vue-next-infinite-scroll/lib/style.css"; // 注意样式引入

const listData = reactive([
  "我是一段测试文字1",
  "我是一段测试文字2",
  "我是一段测试文字3",
  "我是一段测试文字4",
  "我是一段测试文字5",
  "我是一段测试文字6",
  "我是一段测试文字7",
  "我是一段测试文字8",
  "我是一段测试文字9",
  "我是一段测试文字10",
  "我是一段测试文字11",
  "我是一段测试文字12",
]);
</script>

<style scoped lang="less">
.out-wrapper {
  .list-item {
    height: 25px;
    line-height: 25px;
  }
}
</style>
```

### slot 渲染

<ClientOnly>
<BaseScroll style="margin-top: 10px"></BaseScroll>
</ClientOnly>

```vue
<template>
  <Vue3InfiniteScroll
    class="out-wrapper"
    :listData="listData"
    :height="120"
  >
    <template #custom-render="{ item }">
      <div>{{ item }}</div>
    </template>
  </Vue3InfiniteScroll>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Vue3InfiniteScroll from "vue-next-infinite-scroll";
import "vue-next-infinite-scroll/lib/style.css"; // 注意样式引入

const listData = reactive([
  "我是一段测试文字1",
  "我是一段测试文字2",
  "我是一段测试文字3",
  "我是一段测试文字4",
  "我是一段测试文字5",
  "我是一段测试文字6",
  "我是一段测试文字7",
  "我是一段测试文字8",
  "我是一段测试文字9",
  "我是一段测试文字10",
  "我是一段测试文字11",
  "我是一段测试文字12",
]);
</script>

<style scoped lang="less">
.out-wrapper {
  .list-item {
    height: 25px;
    line-height: 25px;
  }
}
</style>
```
