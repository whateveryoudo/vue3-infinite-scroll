<!--
 * @Author: ykx
 * @Date: 2022-10-11 14:22:35
 * @LastEditTime: 2022-10-13 02:45:33
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \vue3-infinite-scroll\docs\guide\example\speed.md
-->


# 滚动速度配置

<ClientOnly>
<SpeedScroll style="margin-top: 10px"></SpeedScroll>
</ClientOnly>

## 代码示例

```vue
<template>
  <Vue3InfiniteScroll
    class="out-wrapper"
    :listData="listData"
    :scrollOption="{ step: 2 }"
  >
    <template #custom-render="{ item }">
      <div>{{ item }}</div>
    </template>
  </Vue3InfiniteScroll>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Vue3InfiniteScroll from "vue-next-infinite-scroll";
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
  .list-item{
    height:25px;
    line-height: 25px;
  }
}
</style>
```

