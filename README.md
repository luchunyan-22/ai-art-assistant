# AI绘画提示词助手 - 部署指南

## 项目结构

```
ai-art-assistant/
├── app/
│   ├── layout.tsx          # 根布局 + 底部导航
│   ├── page.tsx            # 首页（Prompt生成器）
│   ├── globals.css         # 全局样式（Notion/iOS风）
│   ├── style/page.tsx     # 风格模板库
│   ├── history/page.tsx   # 历史记录
│   ├── favorite/page.tsx  # 收藏夹
│   ├── practice/page.tsx  # 绘画练习模式
│   └── api/
│       └── generate/route.ts  # ChatGPT API接口
├── package.json
├── tsconfig.json
├── next.config.js
└── .env.example
```

## 一键部署到 Vercel（推荐）

### 方法：GitHub 导入

**Step 1：推送到 GitHub**

```bash
cd C:\Users\28111\WorkBuddy\AI绘画助手

# 如果还没初始化git
git init
git add .
git commit -m "AI绘画提示词助手 v1.0"

# 创建GitHub仓库（先在GitHub网页上创建，拿到仓库地址）
git remote add origin https://github.com/你的用户名/ai-art-assistant.git
git branch -M main
git push -u origin main
```

**Step 2：Vercel 部署**

1. 打开 https://vercel.com
2. 用 GitHub 账号登录
3. 点击 "Add New Project"
4. 找到你的 `ai-art-assistant` 仓库，点击 "Import"
5. **重要**：在 "Environment Variables" 中添加：
   - Name: `OPENAI_API_KEY`
   - Value: 你的 OpenAI API Key（sk-...开头）
6. 点击 "Deploy"

**Step 3：获取链接**

部署完成后，Vercel 会给你一个 `.vercel.app` 域名，这就是你的 H5 链接！

---

## 功能说明

| 页面 | 功能 |
|------|------|
| 首页 | 输入描述 → 选择风格/画幅/关键词 → AI生成专业提示词 |
| 风格库 | 6种风格模板（古风/二次元/写实/水墨/建筑/治愈） |
| 历史 | 自动保存最近50条生成记录 |
| 收藏 | 一键收藏喜欢的提示词 |
| 练习 | 线稿/色彩/人体/场景 四大绘画练习模块 |

## 注意事项

⚠️ **API Key 是必需的**

- OpenAI API Key 需要自行申请：https://platform.openai.com/api-keys
- 完全免费额度：$5（新手足够用很久）
- Key 只用于服务端调用，不暴露在前端

⚠️ **部署后必须设置环境变量**

- 在 Vercel 项目 Settings → Environment Variables 中添加 `OPENAI_API_KEY`
- 否则生成功能会报错

---

## 本地开发（可选）

如果你想在本地预览：

```bash
# 1. 安装 Node.js（需要 v18+）

# 2. 创建 .env.local
echo OPENAI_API_KEY=sk-your-key > .env.local

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev
```

然后打开 http://localhost:3000
