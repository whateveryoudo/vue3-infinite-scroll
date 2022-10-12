<!--
 * @Author: ykx
 * @Date: 2022-10-10 11:08:56
 * @LastEditTime: 2022-10-13 02:43:47
 * @LastEditors: Please set LastEditors
 * @Description: 基础组件显示
 * @FilePath: \vue3-infinite-scroll\docs\.vitepress\components\SpeedScroll.vue
-->
<template>
  <Vue3InfiniteScroll
    class="out-wrapper"
    :listData="listData"
    :scrollOption="{ step: 2 }"
  >
    <!-- <div v-for="(text, index) in listData" :key="index" class="list-item">
      {{ text }}
    </div> -->
    <template #custom-render="{ item }">
      <div>{{ item }}</div>
    </template>
  </Vue3InfiniteScroll>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Vue3InfiniteScroll } from "vue-next-infinite-scroll";
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
