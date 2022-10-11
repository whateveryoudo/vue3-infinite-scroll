<!--
 * @Author: ykx
 * @Date: 2022-10-11 14:24:55
 * @LastEditTime: 2022-10-11 14:28:29
 * @LastEditors: your name
 * @Description: 数据动态改变
 * @FilePath: \vue3-infinite-scroll\docs\.vitepress\components\ChangeDataScroll.vue
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
