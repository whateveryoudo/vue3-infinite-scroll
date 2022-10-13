<!--
 * @Author: ykx
 * @Date: 2022-10-11 14:33:23
 * @LastEditTime: 2022-10-13 17:59:49
 * @LastEditors: your name
 * @Description:
 * @FilePath: \vue3-infinite-scroll\docs\guide\usage.md
-->

# 使用

## 组件注册

```js
// **main.js**
// 1.全局注册
import Vue from "vue";
import scroll from "vue-next-infinite-scroll";
Vue.use(scroll);
// 使用指定名称
Vue.use(scroll, { componentName: "infinite-scroll" });

// 2.局部注册
import { defineComponent } from "vue";
import Vue3InfiniteScroll from "vue-next-infinite-scroll";
import "vue-next-infinite-scroll/lib/style.css"; // 注意样式引入
export default defineComponent({
  components: {
    Vue3InfiniteScroll,
  },
});
```

## 组件中使用
::: tip
两者普通滚动相同，单步停顿下，普通模式需要传入指定距离，无需传入数据源，slot模式需要传入数据个数，数据源。
:::
### 直接使用

<ClientOnly>
<BaseScroll style="margin-top: 10px"></BaseScroll>
</ClientOnly>

```vue
<template>
  <Vue3InfiniteScroll
    class="out-wrapper"
    :scrollOption="{ singleStepDis: 130 }"
  >
    <div v-for="(text, index) in listData" :key="index" class="list-item">
      {{ text }}
    </div>
  </Vue3InfiniteScroll>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Vue3InfiniteScroll from "vue-next-infinite-scroll";
import "vue-next-infinite-scroll/lib/style.css"; // 注意样式引入
const listData = reactive([
  "我是一段测试文字1",
  "我是一段测试文字2",
  "我是一段测试文字3",
  "我是一段测试文字4",
  "我是一段测试文字5",
  "我是一段测试文字6",
  "我是一段测试文字8",
  "我是一段测试文字9",
  "我是一段测试文字10",
  "我是一段测试文字11",
  "我是一段测试文字12",
]);
</script>

<style scoped lang="less">
.out-wrapper {
  height: 120px;
  overflow: hidden;
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
    :scrollOption="{ singleDataCount: 1 }"
  >
    <template #custom-render="{ item }">
      <div>{{ item }}</div>
    </template>
  </Vue3InfiniteScroll>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Vue3InfiniteScroll from "vue3-infinite-scroll";
const listData = reactive([
  "我是一段测试文字1",
  "我是一段测试文字2",
  "我是一段测试文字3",
  "我是一段测试文字4",
  "我是一段测试文字5",
  "我是一段测试文字6",
  "我是一段测试文字8",
  "我是一段测试文字9",
  "我是一段测试文字10",
  "我是一段测试文字11",
  "我是一段测试文字12",
]);
</script>

<style scoped lang="less">
.out-wrapper {
  height: 120px;
  overflow: hidden;
  .list-item {
    height: 25px;
    line-height: 25px;
  }
}
</style>
```
