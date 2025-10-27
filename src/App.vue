<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Vue3InfiniteScroll } from './components'
import type { ScrollOption } from './components/type'
const buttonList = reactive([
  {
    label: '默认配置',
    value: 'default',
  },
  {
    label: '水平方向',
    value: 'horizontal',
  },
  {
    label: '动态数据改变',
    value: 'dynamic',
  },
  {
    label: '手动控制单步滚动',
    value: 'manual',
  }
])
const activeKey = ref('default')
const handleClick = (value: string) => {
  activeKey.value = value
}
const step1 = ref(0.5)
const listData1 = reactive([
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
const listData2 = reactive([
  { title: "测试1" },
  { title: "测试2" },
  { title: "测试3" },
  { title: "测试4" },
]);
const handleBlurStep1 = (e: Event) => {
  const target = e.target as HTMLInputElement
  step1.value = parseFloat(target.value)
}
const handleIncreaseStep1 = () => {
  step1.value += 0.5
}
const handleDecreaseStep1 = () => {
  step1.value -= 0.5
}

const listData3 = reactive([
  { title: "测试1" },
  { title: "测试2" },
  { title: "测试3" },
  { title: "测试4" },
]);

const handleDecreaseFirstValue = () => {
  listData3.shift()
}
const handleAddDynamicValue = () => {
  listData3.push({ title: `测试${listData3.length + 1}` })
}

const listData4 = reactive([
  { title: "测试1" },
  { title: "测试2" },
  { title: "测试3" },
  { title: "测试4" },
]);
const curItem = ref('');
const scrollElem4 = ref();
const scrollOption = reactive<ScrollOption>({
  dir: "right",
  singleDataCount: 1,
  step: 5,
  autoPlay: false
});
const handleNext = () => {
  scrollOption.dir = "right";
  scrollElem4.value && scrollElem4.value.perMove();
};
const handlePrev = () => {
  scrollOption.dir = "left";
  scrollElem4.value && scrollElem4.value.perMove();
};
const handleRowScrollEnd = (item: any) => {
  console.log(item);
  curItem.value = JSON.stringify(item.value);
};
</script>

<template>
  <div class="demo-wrapper">
    <h3>使用示例</h3>
    <div class="button-list">
      <button v-for="item in buttonList" :key="item.value" @click="handleClick(item.value)">{{ item.label }}</button>
    </div>
    <div class="demo-content demo1" v-if="activeKey === 'default'">
      <div class="title">默认配置</div>
      <div class="content">
        <Vue3InfiniteScroll style="margin-bottom: 10px;" :height="120" :scrollOption="{ step: step1 }">
          <div v-for="(text, index) in listData1" :key="index" class="list-item">
            {{ text }}
          </div>
        </Vue3InfiniteScroll>
        <span class="setting-wrapper">
          滚动速度：step(默认0.5)： <input type="text" @blur="handleBlurStep1" :value="step1">
          <button @click="handleDecreaseStep1">-</button>
          <button @click="handleIncreaseStep1">+</button>
        </span>

      </div>
    </div>
    <div class="demo-content demo2" v-if="activeKey === 'horizontal'">
      <div class="title">水平方向</div>
      <div class="content" style="height:120px">
        <Vue3InfiniteScroll :width="390" :listData="listData2" :scrollOption="{ dir: 'right', singleDataCount: 1 }">
          <template #custom-render="{ item }">
            <div class="list-item">{{ (item as any).title }}</div>
          </template>
        </Vue3InfiniteScroll>
      </div>
    </div>
    <div class="demo-content demo3" v-if="activeKey === 'dynamic'">
      <div class="title">动态数据改变</div>
      <div class="content" style="height:120px">
        <Vue3InfiniteScroll :width="390" style="margin-bottom: 10px;" :listData="listData3"
          :scrollOption="{ dir: 'right', singleDataCount: 1 }">
          <template #custom-render="{ item }">
            <div class="list-item">{{ (item as any).title }}</div>
          </template>
        </Vue3InfiniteScroll>
        <span class="setting-wrapper">
          <button @click="handleDecreaseFirstValue">减少第一项</button>
          <button @click="handleAddDynamicValue">增加一项</button>
        </span>
      </div>
    </div>
    <div class="demo-content demo4" v-if="activeKey === 'manual'">
      <div class="title">手动控制单步滚动</div>
      <div class="content" style="height:120px">
        <Vue3InfiniteScroll ref="scrollElem4" :width="390" style="margin-bottom: 10px;" :listData="listData4"
          :scrollOption="scrollOption">
          <template #custom-render="{ item }">
            <div class="list-item">{{ (item as any).title }}</div>
          </template>
        </Vue3InfiniteScroll>
        <div class="btn-wrapper">
          <a @click="handlePrev"><-后退</a>
          <a @click="handleNext" style="margin-left: 20px;margin-right: 20px">前进-></a>
          {{ curItem }}
        </div>  
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.demo-wrapper {
  .button-list {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;

    button {
      cursor: pointer;
    }
  }

  .title {
    margin-bottom: 10px;
  }

  .setting-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    button {
      cursor: pointer;
    }
  }

  .demo-content.demo2 {
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

  .demo-content.demo3 {
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

  .demo-content.demo4 {
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

    .btn-wrapper {
      margin-top: 10px;

      a {
        cursor: pointer;
      }
    }
  }

}
</style>
