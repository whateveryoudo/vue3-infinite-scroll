<!--
 * @Author: ykx
 * @Date: 2022-10-10 10:20:25
 * @LastEditTime: 2022-10-11 16:43:40
 * @LastEditors: your name
 * @Description:
 * @FilePath: \vue3-infinite-scroll\docs\guide\example\direction.md
-->

# 水平滚动

<ClientOnly>
<HorizontalScroll style="margin-top: 10px"></HorizontalScroll>
</ClientOnly>

## 代码示例

```vue
<template>
  <Vue3InfiniteScroll
    class="out-wrapper"
    :listData="listData"
    :scrollOption="{ dir: 'right', singleDataCount: 1 }"
  >
    <template #custom-render="{ item }">
      <div class="list-item">{{ item.title }}</div>
    </template>
  </Vue3InfiniteScroll>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Vue3InfiniteScroll from "vue3-infinite-scroll";
const listData = reactive([
  { title: "测试1" },
  { title: "测试2" },
  { title: "测试3" },
  { title: "测试4" },
]);
</script>

<style scoped lang="less">
.out-wrapper {
  overflow: hidden;
  width: 390px;
  height: 120px;
  .list-items-wrapper {
    display: flex;
    margin: 0;
    padding: 0;
  }
  .list-item {
    width: 120px;
    margin-top: 0;
    height: 120px;
    margin-right: 10px;
    background-color: #bbb;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
```
