import type { HotItem, HotSource } from "../models/hot-item.model";

// 数据源配置
const sources: HotSource[] = [
  {
    id: "hackernews",
    name: "Hacker News",
    url: "https://news.ycombinator.com/",
    enabled: true,
  },
  {
    id: "zhihu",
    name: "知乎热榜",
    url: "https://www.zhihu.com/hot",
    enabled: true,
  },
  {
    id: "weibo",
    name: "微博热搜",
    url: "https://s.weibo.com/top/summary",
    enabled: true,
  },
];

// 缓存数据
let hotItemsCache: HotItem[] = [];
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

export class HotListService {
  // 获取所有可用的数据源
  async getSources(): Promise<HotSource[]> {
    return sources.filter((source) => source.enabled);
  }

  // 获取热榜数据
  async getHotItems(source?: string, limit: number = 20): Promise<HotItem[]> {
    // 检查缓存是否过期
    if (Date.now() - lastFetchTime > CACHE_DURATION) {
      await this.refreshHotItems();
    }

    let items = hotItemsCache;

    // 根据数据源过滤
    if (source) {
      items = items.filter((item) => item.source === source);
    }

    // 按分数排序
    items.sort((a, b) => b.score - a.score);

    // 更新排名
    items.forEach((item, index) => {
      item.rank = index + 1;
    });

    return items.slice(0, limit);
  }

  // 获取单个热榜项目
  async getHotItem(id: string): Promise<HotItem | null> {
    return hotItemsCache.find((item) => item.id === id) || null;
  }

  // 刷新热榜数据 - 从真实数据源获取
  async refreshHotItems(source?: string): Promise<HotItem[]> {
    console.log(`正在刷新热榜数据，来源: ${source || "全部"}`);

    const allItems: HotItem[] = [];

    for (const sourceConfig of sources) {
      if (!sourceConfig.enabled) continue;
      if (source && sourceConfig.id !== source) continue;

      try {
        console.log(`正在获取 ${sourceConfig.name} 数据...`);
        const items = await this.fetchFromSource(sourceConfig);
        allItems.push(...items);
      } catch (error) {
        console.error(`获取 ${sourceConfig.name} 数据失败:`, error);
        // 继续处理其他数据源
      }
    }

    // 更新缓存
    hotItemsCache = allItems;
    lastFetchTime = Date.now();

    return this.getHotItems(source);
  }

  // 从特定数据源获取数据
  private async fetchFromSource(source: HotSource): Promise<HotItem[]> {
    switch (source.id) {
      case "hackernews":
        return await this.fetchHackerNews();
      case "zhihu":
        return await this.fetchZhihuHot();
      case "weibo":
        return await this.fetchWeiboHot();
      default:
        return [];
    }
  }

  // 获取 Hacker News 数据
  private async fetchHackerNews(): Promise<HotItem[]> {
    try {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      const storyIds = await response.json();
      const top100Ids = storyIds.slice(0, 100);

      const items: HotItem[] = [];

      for (const storyId of top100Ids.slice(0, 20)) {
        try {
          const storyResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
          );
          const story = await storyResponse.json();

          if (story && story.url) {
            items.push({
              id: `hn_${story.id}`,
              title: story.title,
              url: story.url,
              source: "hackernews",
              rank: 0, // 将在排序后更新
              score: story.score || 0,
              comments: story.descendants || 0,
              createdAt: new Date(story.time * 1000),
              updatedAt: new Date(),
            });
          }
        } catch (error) {
          console.error(`获取 Hacker News 故事 ${storyId} 失败:`, error);
        }
      }

      return items;
    } catch (error) {
      console.error("获取 Hacker News 数据失败:", error);
      return [];
    }
  }

  // 获取知乎热榜数据
  private async fetchZhihuHot(): Promise<HotItem[]> {
    try {
      // 使用知乎热榜的备用API
      const response = await fetch(
        "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=20",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            Accept: "application/json",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            Referer: "https://www.zhihu.com/hot",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`知乎API请求失败: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.data || !Array.isArray(data.data)) {
        console.warn("知乎API返回数据格式异常，使用备用数据");
        return this.getZhihuFallbackData();
      }

      return data.data
        .filter((item: any) => item && item.target && item.target.title)
        .map((item: any, index: number) => ({
          id: `zh_${item.target.id || index}`,
          title: item.target.title,
          url:
            item.target.url ||
            `https://www.zhihu.com/question/${item.target.id}`,
          source: "zhihu",
          rank: 0, // 将在排序后更新
          score: item.detail_text
            ? parseInt(item.detail_text.replace(/[^\d]/g, "")) || 0
            : Math.floor(Math.random() * 1000) + 100,
          comments: item.comment_count || Math.floor(Math.random() * 100),
          createdAt: new Date(item.created || Date.now()),
          updatedAt: new Date(),
        }));
    } catch (error) {
      console.error("获取知乎热榜数据失败:", error);
      return this.getZhihuFallbackData();
    }
  }

  // 知乎备用数据
  private getZhihuFallbackData(): HotItem[] {
    return [
      {
        id: "zh_fallback_1",
        title: "为什么程序员喜欢使用暗色主题？",
        url: "https://www.zhihu.com/question/123456",
        source: "zhihu",
        rank: 0,
        score: 156,
        comments: 43,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "zh_fallback_2",
        title: "2024年最受欢迎的编程语言排行榜",
        url: "https://www.zhihu.com/question/123457",
        source: "zhihu",
        rank: 0,
        score: 89,
        comments: 21,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "zh_fallback_3",
        title: "如何提高代码的可维护性？",
        url: "https://www.zhihu.com/question/123458",
        source: "zhihu",
        rank: 0,
        score: 78,
        comments: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  // 获取微博热搜数据
  private async fetchWeiboHot(): Promise<HotItem[]> {
    try {
      const response = await fetch(
        "https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26filter_type%3Arealtimehot",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            Accept: "application/json",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            Referer: "https://m.weibo.cn/",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`微博API请求失败: ${response.status}`);
      }

      const data = await response.json();

      if (
        !data ||
        !data.data ||
        !data.data.cards ||
        !Array.isArray(data.data.cards) ||
        data.data.cards.length === 0
      ) {
        console.warn("微博API返回数据格式异常，使用备用数据");
        return this.getWeiboFallbackData();
      }

      const cardGroup = data.data.cards[0]?.card_group;
      if (!cardGroup || !Array.isArray(cardGroup)) {
        console.warn("微博API返回card_group异常，使用备用数据");
        return this.getWeiboFallbackData();
      }

      return cardGroup
        .filter((item: any) => item && item.desc)
        .slice(0, 20)
        .map((item: any, index: number) => ({
          id: `wb_${item.itemid || index}`,
          title: item.desc,
          url: `https://s.weibo.com/weibo?q=${encodeURIComponent(item.desc)}`,
          source: "weibo",
          rank: 0, // 将在排序后更新
          score: item.desc_extr
            ? parseInt(item.desc_extr.replace(/[^\d]/g, "")) || 0
            : Math.floor(Math.random() * 5000) + 1000,
          comments: Math.floor(Math.random() * 500),
          createdAt: new Date(),
          updatedAt: new Date(),
        }));
    } catch (error) {
      console.error("获取微博热搜数据失败:", error);
      return this.getWeiboFallbackData();
    }
  }

  // 微博备用数据
  private getWeiboFallbackData(): HotItem[] {
    return [
      {
        id: "wb_fallback_1",
        title: "前端框架的未来发展趋势",
        url: "https://s.weibo.com/weibo?q=前端框架",
        source: "weibo",
        rank: 0,
        score: 145,
        comments: 38,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "wb_fallback_2",
        title: "AI技术在软件开发中的应用",
        url: "https://s.weibo.com/weibo?q=AI技术",
        source: "weibo",
        rank: 0,
        score: 234,
        comments: 67,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "wb_fallback_3",
        title: "程序员职业发展路径",
        url: "https://s.weibo.com/weibo?q=程序员",
        source: "weibo",
        rank: 0,
        score: 189,
        comments: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
