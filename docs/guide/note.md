<!--
 * @Description: 
 * @Autor: ykx
 * @Date: 2022-10-13 00:22:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-13 00:25:17
-->
# 注意项

- 1.最外层容器需要手动设置`width、height`

- 2.左右的无缝滚动需要给主内容区域（即默认slot插槽提供）设定合适的`css width`属性(否则无法正确计算实际宽度)。


- 3.step值不建议太小,不然会有卡顿效果(如果设置了单步滚动,step需是单步大小的约数,否则无法保证单步滚动结束的位置是否准确。~~~~~,比如单步设置的30,step不能为4)

- 4.内部提供普通渲染与scope-slot渲染模式（推荐使用后者），（单步滚动时，前者需要制定传入宽度，后者需设置每次移动的元素个数）
