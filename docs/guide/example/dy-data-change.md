<!--
 * @Author: ykx
 * @Date: 2022-10-11 14:22:35
 * @LastEditTime: 2022-10-13 02:45:25
 * @LastEditors: Please set LastEditors
 * @Description: 
-->


# 动态数据改变

<ClientOnly>
<ChangeDataScroll style="margin-top: 10px"></ChangeDataScroll>
</ClientOnly>

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
import Vue3InfiniteScroll from "vue-next-infinite-scroll";
const listData = reactive([
  { title: "测试1" },
  { title: "测试2" },
  { title: "测试3" },
  { title: "测试4" },
]);
setTimeout(() => {
  listData[2].title = "改变了的标题";
  listData.push({
    title: '测试5'
  })
}, 2000);
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
