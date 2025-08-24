# 🔥 热榜

一个简洁的热榜聚合应用，使用 Nuxt 4 和现代 UI 设计。

## 功能特点

- 🚀 实时热榜数据聚合，支持多种数据源
- ⚡️ **内置缓存机制**，提高数据加载速度
- 📱 响应式设计，支持移动端和桌面端
- 🌙 深色/浅色主题切换
- ⚡ 快速构建和部署

## 技术栈

- **前端框架**: Nuxt 4
- **UI 框架**: daisyUI (基于 Tailwind CSS)
- **样式**: Tailwind CSS
- **后端**: Nuxt API Routes
- **数据抓取**: ofetch, cheerio
- **缓存**: 内存缓存
- **测试**: Vitest, @nuxt/test-utils
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
├── app.vue               # 主应用组件
├── nuxt.config.ts        # Nuxt 配置
├── package.json          # 项目依赖
├── pages/                # 页面路由
│   └── index.vue         # 首页
├── public/               # 静态资源
├── server/               # 服务器端代码
│   ├── api/              # API 路由
│   │   ├── hot-list.get.ts
│   │   ├── latest.get.ts
│   │   ├── sources.get.ts
│   │   └── proxy/img.png.get.ts
│   ├── database/         # 数据库相关（内存缓存实现）
│   │   └── cache.ts
│   ├── models/           # 数据模型
│   │   └── hot-item.model.ts
│   ├── services/         # 业务逻辑服务
│   │   ├── hot-list.service.ts
│   │   └── sources.ts
│   └── utils/            # 工具函数
│       ├── base64.ts
│       ├── date.ts
│       ├── fetch.ts
│       ├── http.ts
│       ├── logger.ts
│       ├── proxy.ts
│       ├── rss2json.ts
│       └── source.ts
├── shared/               # 共享代码（类型定义、常量等）
│   ├── consts.ts
│   ├── metadata.ts
│   ├── pre-sources.ts
│   ├── sources.json
│   ├── sources.ts
│   ├── type.util.ts
│   ├── types.ts
│   └── verify.ts
└── test/                 # 测试文件
    └── api.test.ts
```

## API 接口

### 获取热榜数据

`GET /api/hot-list?id={source_id}`

根据 `source_id` 获取指定数据源的热榜数据。数据会进行缓存，提高响应速度。

### 获取应用最新版本

`GET /api/latest`

获取当前应用的版本信息。

### 图片代理

`GET /api/proxy/img.png?url={encoded_image_url}`

代理图片请求，用于解决跨域问题。

### 获取数据源列表

`GET /api/sources`

获取所有支持的数据源列表。

## 数据源配置

目前支持以下数据源（以及更多）：

- **Hacker News**: 技术新闻和讨论
- **知乎热榜**: 中文问答社区热门内容
- **微博热搜**: 社交媒体热门话题
- **参考消息**: 国际新闻
- **抖音**: 短视频平台热点
- **虎扑**: 体育社区热帖
- **IT之家**: 科技资讯
- **澎湃新闻**: 综合新闻
- **金十数据**: 财经快讯
- **百度热搜**: 搜索引擎热点
- **少数派**: 科技生活
- **稀土掘金**: 开发者社区
- **凤凰网**: 综合新闻
- **财联社**: 财经新闻
- **雪球**: 股票社区
- **格隆汇**: 财经分析
- **FastBull**: 财经快讯
- **Solidot**: 科技资讯
- **Product Hunt**: 产品发现
- **GitHub Trending**: 开发者趋势
- **哔哩哔哩**: 视频平台热点
- **快手**: 短视频平台热点
- **靠谱新闻**: 综合新闻
- **Linux Do**: 技术社区
- **什么值得买**: 购物分享
- **牛客网**: 招聘社区
- **贴吧**: 兴趣社区
- **今日头条**: 综合新闻
- **V2EX**: 开发者社区
- **华尔街见闻**: 财经新闻
- **联合早报**: 国际新闻
- **酷安**: 科技社区

## 测试

运行以下命令执行测试：

```bash
pnpm test
```

测试使用 [Vitest](https://vitest.dev/) 和 [@nuxt/test-utils](https://nuxt.com/docs/api/kit/test-utils) 进行。

## 许可证

MIT License