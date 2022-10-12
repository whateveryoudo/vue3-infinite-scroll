/*
 * @Author: ykx
 * @Date: 2022-10-10 09:44:34
 * @LastEditTime: 2022-10-13 02:42:54
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \vue-next-infinite-scroll\docs\.vitepress\config.ts
 */
const title = "vue-next-infinite-scroll";
export default {
  title,
  // base: "/vue-next-infinite-scroll/",
  description: "基于vue3的无缝滚动",
  head: [["link", { rel: "icon", href: `/favicon.ico` }]],
  themeConfig: {
    smoothScroll: true,
    nav: [{ text: "Github", link: "https://github.com/whateveryoudo" }],
    sidebar: {
      "/guide/": [
        {
          text: "指引",
          items: [
            { text: "安装", link: "/guide/" },
            { text: "使用", link: "/guide/usage" },
            { text: "配置项", link: "/guide/properties" },
            { text: "事件", link: "/guide/events" },
            { text: "注意点", link: "/guide/note" },
          ],
        },
        {
          text: "示例",
          items: [
            { text: "默认配置", link: "/guide/example/" },
            { text: "不同方向滚动", link: "/guide/example/direction" },
            { text: "滚动速度", link: "/guide/example/speed" },
            { text: "动态数据改变", link: "/guide/example/dy-data-change" },
            { text: "手动控制单步滚动", link: "/guide/example/control-step-scroll" },
          ],
        },
      ],
    },
    footer: {
      message: '特别感谢chenxuan0000的vue-seamless-scroll，参考了其中部分逻辑。',
    }
  },
  dest: "./distDocs",
};
