import type { Source } from '~/server/models/hot-item.model';

export const sources: Source[] = [
  {
    id: 'weibo',
    name: '微博',
    home: 'https://weibo.com',
  },
  {
    id: 'zhihu',
    name: '知乎',
    home: 'https://www.zhihu.com',
  },
  {
    id: '36kr',
    name: '36氪',
    home: 'https://www.36kr.com',
  },
  {
    id: 'baidu',
    name: '百度',
    home: 'https://top.baidu.com',
  },
  {
    id: 'bilibili-hot-search',
    name: 'B站热搜',
    home: 'https://www.bilibili.com',
  },
  {
    id: 'bilibili-hot-video',
    name: 'B站热门视频',
    home: 'https://www.bilibili.com',
  },
  {
    id: 'bilibili-ranking',
    name: 'B站排行榜',
    home: 'https://www.bilibili.com',
  },
  {
    id: 'github',
    name: 'GitHub',
    home: 'https://github.com/trending',
  },
  {
    id: 'ithome',
    name: 'IT之家',
    home: 'https://www.ithome.com',
  },
];

export const sourcesMap = new Map(sources.map(item => [item.id, item]));
