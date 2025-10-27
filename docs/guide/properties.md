<!--
 * @Author: ykx
 * @Date: 2022-10-11 14:56:45
 * @LastEditTime: 2022-10-13 00:27:00
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \vue3-infinite-scroll\docs\guide\properties.md
-->
# 属性

## listData

- type: `Array`

无缝滚动 list 数据。

slot模式下需要传入，普通模式下无需传入(单步滚动下建议传入)


## height

- type: `Number` | `String`
- required: `false`
- default：`100%`

滚动容器高度(水平滚动下无需指定)

## width

- type: `Number` | `String`
- required: `false`
- default：`100%`

滚动容器宽度(垂直滚动下无需指定）

## scrollOption

### step

- type: `Number`
- required: `false`
- default：`1`

数值越大速度滚动越快。

### hoverStop

- type: `Boolean`
- required: `false`
- default：`false`

是否启用鼠标 hover 控制。

### dir

- type: `String`
- required: `false`
- default：`up`

方向: down 往下 up 往上 left 向左 right 向右。

### singleStepDis

- type: `Number`
- required: `false`
- default：`0`

单步运动停止的距离(默认值 0 是无缝不停止的滚动)，普通模式下需要传入指定距离，slot模式下无效（使用singleDataCount）

### singleDataCount

- type: `Number`
- required: `false`
- default：`0`

每次移动的元素个数，仅在slot模式下生效

### waitTime

- type: `Number`
- required: `false`
- default：`1000`

单步停止等待时间(默认值 1000ms)。