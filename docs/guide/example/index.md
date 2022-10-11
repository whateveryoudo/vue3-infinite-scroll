<!--
 * @Author: ykx
 * @Date: 2022-10-10 10:20:25
 * @LastEditTime: 2022-10-11 16:44:29
 * @LastEditors: your name
 * @Description:
 * @FilePath: \vue3-infinite-scroll\docs\guide\example\index.md
-->

# 默认配置

<ClientOnly>
<BaseScroll style="margin-top: 10px"></BaseScroll>
</ClientOnly>

## 代码示例

```vue
<template>
  <Vue3InfiniteScroll class="out-wrapper">
    <div v-for="(text, index) in listData" :key="index" class="list-item">
      {{ text }}
    </div>
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
