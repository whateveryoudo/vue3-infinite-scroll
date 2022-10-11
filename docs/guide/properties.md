<!--
 * @Author: ykx
 * @Date: 2022-10-11 14:56:45
 * @LastEditTime: 2022-10-11 15:07:54
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue3-infinite-scroll\docs\guide\properties.md
-->
# 属性

## listData

- type: `Array`

无缝滚动 list 数据。

slot模式下需要传入，普通模式下无需传入

## scrollOption

### step

- type: `Number`
- required: `false`
- default：`1`

数值越大速度滚动越快。

step 值不建议太小,不然会有卡顿效果(如果设置了单步滚动,step 需是单步大小的约数,否则无法保证单步滚动结束的位置是否准确。比如单步设置的 30,step 不能为 4)。

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

单步运动停止的距离(默认值 0 是无缝不停止的滚动)，普通模式下需要传入指定距离，slot模式下需传入每次移动的数量

### waitTime

- type: `Number`
- required: `false`
- default：`1000`

单步停止等待时间(默认值 1000ms)。