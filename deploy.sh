#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

echo "开始构建文档..."

# 生成静态文件
npm run docs:build

echo "文档构建完成，准备部署到 GitHub Pages..."

# 检查输出目录（根据 .vitepress/config.ts 中的 dest 配置）
if [ -d "distDocs" ]; then
  echo "使用输出目录: distDocs"
  cd distDocs
elif [ -d "docs/.vitepress/dist" ]; then
  echo "使用输出目录: docs/.vitepress/dist"
  cd docs/.vitepress/dist
else
  echo "❌ 错误：找不到文档输出目录"
  exit 1
fi

# 检查是否存在 .git 目录，如果存在则删除
if [ -d ".git" ]; then
  echo "清除已存在的 .git 目录"
  rm -rf .git
fi

# 初始化 git 仓库
git init
git add -A

# 检查是否有文件需要提交
if git diff --quiet --cached; then
  echo "❌ 错误：没有文件需要提交"
  exit 1
fi

# 获取当前时间
COMMIT_TIME=$(date '+%Y-%m-%d %H:%M:%S')
git commit -m "部署到 GitHub Pages - $COMMIT_TIME" || {
  echo "❌ 错误：提交失败"
  exit 1
}

echo "正在推送到 GitHub..."

# 获取当前分支名称（新版本的 git 默认是 main）
CURRENT_BRANCH=$(git branch --show-current)
echo "当前分支: $CURRENT_BRANCH"

# 推送到 gh-pages 分支
git push -f https://github.com/whateveryoudo/vue3-infinite-scroll.git ${CURRENT_BRANCH}:gh-pages

cd -

echo ""
echo "✅ 部署成功！"
echo "🌐 访问地址：https://whateveryoudo.github.io/vue3-infinite-scroll/"