<!--
 * @Author: ykx
 * @Date: 2022-10-10 11:29:43
 * @LastEditTime: 2022-10-12 12:50:17
 * @LastEditors: Please set LastEditors
 * @Description: TODO:手动控制采用css??
 * @FilePath: \vue3-infinite-scroll\src\components\infinite-scroll.vue
-->
<template>
  <div ref="overflowWrap" class="infinite-scroll-wrapper">
    <div class="scroll-wrapper" ref="scrollWrap" :style="scrollStyle" @mouseenter="enter" @mouseleave="leave">
      <div ref="originWrap" :class="['origin-wrapper', isHorizontal && 'horizontal']"
        :style="isHorizontal ? { float: 'left' } : {}">
        <!-- 这里渲染容器暂不设置margin,减少计算样式 -->
        <template v-if="renderItem">
          <div v-for="(item, index) in calcData" :key="(item as any)[rowKey] || index" class="scroll-row-item">
            <slot name="custom-render" :item="item" />
          </div>
        </template>
        <slot v-else />
      </div>
      <div class="copy-wrapper" v-if="!renderItem && showCopyElem" :style="isHorizontal ? { float: 'left' } : {}">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  PropType,
  onMounted,
  nextTick,
  computed,
  onBeforeMount,
  useSlots,
  watch,
  reactive,
} from "vue";
import type { ScrollOption } from "./type";
const props = defineProps({
  rowKey: {
    type: String,
    default: "id",
  },
  listData: {
    type: Array,
    default: () => [],
  },
  scrollOption: {
    type: Object as PropType<ScrollOption>,
  },
});
const emits = defineEmits(["rowScrollEnd"]);
const defaultOption = {
  dir: "up",
  step: 1,
  singleDataCount: 0, // 默认移动条数(仅在自定义渲染条件下生效)
  singleStepDis: 0, // 单步距离
  hoverStop: true,
  waitTime: 1000,
  autoPlay: true,
  loop: true,
  slideIndex: 0, // 滚动索引
};
const lastDir = ref('');
const tempSlideIndex = ref(0);
const showCopyElem = ref(false);
const yPos = ref(0);
const xPos = ref(0);
// 显示容器大小
const wrapperW = ref(0);
const wrapperH = ref(0);
// 实际容器大小
const scrollWrapperW = ref(0);
const scrollWrapperH = ref(0);
// const delay = ref(0);
// const ease = ref("ease-in");
const overflowWrap = ref<HTMLDivElement>();
const scrollWrap = ref<HTMLDivElement>();
const originWrap = ref<HTMLDivElement>();
const reqFrame = ref();
const singleTimer = ref();
const slots = useSlots();
// 是否内部slot渲染
const renderItem = computed(() => {
  return !!slots["custom-render"];
});
const isHorizontal = computed(() => {
  return ["right", "left"].includes(mergeOption.value.dir);
});

// 计算单步距离长度
const calcSingleStepDis = computed(() => {
  const perRowItem = originWrap.value?.querySelector(".scroll-row-item") as any;
  return renderItem.value && mergeOption.value.singleDataCount > 0
    ? mergeOption.value.singleDataCount *
    (perRowItem
      ? isHorizontal.value
        ? perRowItem.offsetWidth
        : perRowItem.offsetHeight
      : 0)
    : mergeOption.value.singleStepDis;
});
const realStep = computed(() => {
  let tempStep = mergeOption.value.step;
  const singleStep = calcSingleStepDis.value;
  if (singleStep > 0 && singleStep % tempStep > 0) {
    console.error(
      "如果设置了单步滚动,step需是单步大小的约数,否则无法保证单步滚动结束的位置是否准确。~~~~~"
    );
  }
  return tempStep;
});
const calcData = ref(props.listData);


// 监听外层数据变化
watch(
  props.listData,
  (newVal) => {
    stopMove();
    calcData.value = newVal; // 重置数据，防止计算宽度错误
    initMove();
  },
  { flush: "post" }
);
const mergeOption = computed(() => {
  return { ...defaultOption, ...props.scrollOption };
});
// 滚动容器样式
const scrollStyle = computed(() => {
  return {
    transform: `translate(${xPos.value}px,${yPos.value}px)`,
    transition: `all ease-in 0ms`,
    overflow: "hidden",
  };
});
// 单频移动操作
const perMove = () => {
  const { dir, waitTime, autoPlay } = mergeOption.value;
  // 需要移动的距离
  const needMoveX = scrollWrapperW.value / 2;
  const needMoveY = scrollWrapperH.value / 2;

  switch (dir) {
    case "up":
      if (Math.abs(yPos.value) >= needMoveY) {
        yPos.value = 0;
      }
      yPos.value -= realStep.value;
      break;
    case "down":
      if (yPos.value >= 0) {
        yPos.value = needMoveY * -1;
      }
      yPos.value += realStep.value;
      break;
    case "left":
      if (Math.abs(xPos.value) >= needMoveX) {
        xPos.value = 0;
      }
      xPos.value -= realStep.value;
      break;
    case "right":
      if (xPos.value >= 0) {
        xPos.value = needMoveX * -1;
      }
      xPos.value += realStep.value;
      break;
  }
  if (singleTimer.value) {
    clearTimeout(singleTimer.value);
  }
  if (calcSingleStepDis.value > 0) {
    if (
      Math.abs(isHorizontal.value ? xPos.value : yPos.value) %
      calcSingleStepDis.value <
      realStep.value
    ) {
      if (!lastDir.value || lastDir.value === dir) {
        if (["up", "right"].includes(dir)) { // 数据后退
          tempSlideIndex.value -= 1;
        } else {
          tempSlideIndex.value += 1;
        }
      }
      lastDir.value = dir
      // 临界点判断
      let realIndex = tempSlideIndex.value;
      const total = props.listData.length * 2
      if (realIndex <= 0) {
        tempSlideIndex.value = total;
        realIndex = total - 1;
      } else {
        if (realIndex > total) {
          tempSlideIndex.value = realIndex = 1;
        }
        realIndex -= 1;
      }
      emits("rowScrollEnd", props.listData[realIndex % props.listData.length]); // 单行滚动结束
      // 符合条件暂停waitTime
      singleTimer.value = setTimeout(() => {
        autoPlay && perMove();
      }, waitTime);
    } else {
      perMove();
    }
  } else {
    perMove();
  }
};
const startMove = () => {
  reqFrame.value = requestAnimationFrame(perMove);
};
const initMove = async () => {
  await nextTick();
  if (!overflowWrap.value || !scrollWrap.value || !originWrap.value) {
    return;
  }
  const { loop, autoPlay } = mergeOption.value;
  wrapperH.value = overflowWrap.value.offsetHeight;
  wrapperW.value = overflowWrap.value.offsetWidth;
  // 判断数据长度是否支持滚动

  const originWrapW = originWrap.value.offsetWidth; // 保留基础宽度
  const canImove = isHorizontal.value
    ? wrapperW.value <= originWrapW
    : wrapperH.value <= originWrap.value.offsetHeight;
  if (!canImove) {
    return;
  }
  // 内部自定义渲染
  if (renderItem.value && mergeOption.value.loop) {
    // 数据copy
    const tempData = props.listData.map((item: any) => {
      if (item instanceof Object) {
        return {
          ...item,
          [props.rowKey]: item[props.rowKey]
            ? `copy_${item[props.rowKey]}`
            : item[props.rowKey],
        };
      }
      return item;
    });
    calcData.value = [...props.listData, ...tempData];
  } else {
    showCopyElem.value = loop;
  }
  await nextTick();
  if (isHorizontal.value && loop) {
    // 水平方向 & 循环滚动（手动设置宽度，防止横向换行）
    scrollWrap.value.style.width = originWrapW * 2 + "px";
  }
  scrollWrapperH.value = scrollWrap.value.offsetHeight;
  scrollWrapperW.value = scrollWrap.value.offsetWidth;
  autoPlay && startMove();
};
const stopMove = () => {
  if (singleTimer.value) clearTimeout(singleTimer.value);
  reqFrame.value && cancelAnimationFrame(reqFrame.value || "");
};
const enter = () => {
  if (mergeOption.value.autoPlay && mergeOption.value.hoverStop) {
    stopMove();
  }
};
const leave = () => {
  if (mergeOption.value.autoPlay && mergeOption.value.hoverStop) {
    startMove();
  }
};
defineExpose({ perMove });
// 初始化滚动
onMounted(() => {
  tempSlideIndex.value = mergeOption.value.slideIndex; // 初始index的值
  initMove();
});
onBeforeMount(() => {
  stopMove();
});
</script>

<style scoped lang="less">
.origin-wrapper.horizontal {
  display: flex;
}
</style>
