# 🔥 热榜

一个简洁的热榜聚合应用，使用 Nuxt 4 和现代 UI 设计。

## 功能特点

- 🚀 实时热榜数据聚合
- 📱 响应式设计，支持移动端和桌面端
- 🌙 深色/浅色主题切换
- ⚡ 快速构建和部署
- 🔍 多数据源支持（Hacker News、知乎、微博等）

## 技术栈

- **前端框架**: Nuxt 4
- **样式**: 自定义 CSS（简洁现代设计）
- **后端**: Nuxt API Routes
- **构建工具**: Vite
- **部署**: Node.js

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 <http://localhost:3000> 查看应用

### 生产构建

```bash
pnpm build
node .output/server/index.mjs
```

## 项目结构

```
hot/
├── app/                    # Nuxt 应用主目录
│   └── app.vue           # 主应用组件
├── pages/                # 页面路由
│   └── index.vue         # 首页
├── server/               # 服务器端代码
│   ├── api/             # API 路由
│   │   ├── hot-list.get.ts
│   │   └── sources.get.ts
│   ├── models/          # 数据模型
│   │   └── hot-item.model.ts
│   └── services/        # 业务逻辑服务
│       └── hot-list.service.ts
├── public/              # 静态资源
└── nuxt.config.ts       # Nuxt 配置
```

## API 接口

### 获取热榜数据

```http
GET /api/hot-list?source=全部&limit=20
```

参数：

- `source` (可选): 数据源（hackernews、zhihu、weibo）
- `limit` (可选): 返回数量，默认 20

### 获取数据源列表

```http
GET /api/sources
```

## 部署

### 使用 Node.js 部署

1. 构建项目：

```bash
pnpm build
```

2. 启动服务器：

```bash
node .output/server/index.mjs
```

### 使用 Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY .output ./
EXPOSE 3000
CMD ["node", "server/index.mjs"]
```

## 数据源配置

目前支持以下数据源：

- **Hacker News**: 技术新闻和讨论
- **知乎热榜**: 中文问答社区热门内容
- **微博热搜**: 社交媒体热门话题

## 自定义扩展

### 添加新的数据源

1. 在 `server/models/hot-item.model.ts` 中定义数据源类型
2. 在 `server/services/hot-list.service.ts` 中添加数据源配置
3. 实现数据抓取逻辑（可以替换模拟数据）

### 修改 UI 样式

应用使用自定义 CSS，可以在组件中直接修改样式，或添加全局样式文件。

## 许可证

MIT License
