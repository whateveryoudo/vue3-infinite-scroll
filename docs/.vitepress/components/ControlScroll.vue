<!--
 * @Author: ykx
 * @Date: 2022-10-11 15:25:12
 * @LastEditTime: 2022-10-13 02:43:36
 * @LastEditors: Please set LastEditors
 * @Description: 手动控制滚动
 * @FilePath: \vue3-infinite-scroll\docs\.vitepress\components\ControlScroll.vue
-->
<template>
  <Vue3InfiniteScroll
    ref="scrollElem"
    class="out-wrapper"
    :listData="listData"
    :scrollOption="scrollOption"
    @rowScrollEnd="handleRowScrollEnd"
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

  <div class="btn-wrapper">
    <a @click="handlePrev">&lt;——后退</a>
    <a @click="handleNext" style="margin-left: 20px;margin-right: 20px">前进——&gt;</a>
    {{curItem}}
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import { Vue3InfiniteScroll } from "vue-next-infinite-scroll";
const listData = reactive([
  { title: "测试1" },
  { title: "测试2" },
  { title: "测试3" },
  { title: "测试4" },
]);
const scrollElem = ref();
const scrollOption = reactive({
  dir: "right",
  singleDataCount: 1,
  step: 5,
  autoPlay: false,
  dir: 'right'
});
const curItem = ref('');
const handleNext = () => {
  scrollOption.dir = 'right';
  scrollElem.value && scrollElem.value.perMove();
};
const handlePrev = () => {
  scrollOption.dir = 'left';
  scrollElem.value && scrollElem.value.perMove();
};
const handleRowScrollEnd = (item: any) => {
  console.log(item);
  curItem.value = JSON.stringify(item);
};
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
.btn-wrapper{
  margin-top: 10px;
  a{
    cursor: pointer;
  }
}
</style>
