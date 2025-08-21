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
];

export const sourcesMap = new Map(sources.map(item => [item.id, item]));
