<!--
 * @Author: ykx
 * @Date: 2022-10-10 17:43:24
 * @LastEditTime: 2022-10-11 14:22:07
 * @LastEditors: your name
 * @Description: 水平滚动
 * @FilePath: \vue3-infinite-scroll\docs\.vitepress\components\HorizontalScroll.vue
-->
<template>
  <Vue3InfiniteScroll
    class="out-wrapper"
    :listData="listData"
    :scrollOption="{ dir: 'right', singleDataCount: 1 }"
  >
    <!-- <ul class="list-items-wrapper">
      <li v-for="(item, index) in listData" :key="index" class="list-item">
        {{ item.title }}
      </li>
    </ul> -->
    <!-- <div v-for="(item, index) in listData" :key="index" class="list-item">
      {{ item.title }}
    </div> -->

    <template #custom-render="{ item }">
      <div class="list-item">{{ item.title }}</div>
    </template>
  </Vue3InfiniteScroll>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Vue3InfiniteScroll from "../../../src/components/index";
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
    margin:0;
    padding:0;
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
