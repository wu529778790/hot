import type { HotItem } from '~/server/models/hot-item.model';
import { myFetch } from '~/server/utils/fetch';

interface ZhihuRes {
  data: {
    target: {
      title_area: {
        text: string;
      };
      link: {
        url: string;
      };
      metrics_area: {
        text: string;
      };
    };
  }[];
}

export const getZhihuHotList = async (): Promise<HotItem[]> => {
  const url = "https://www.zhihu.com/api/v3/feed/topstory/hot-list-web?limit=20&desktop=true";
  const res: ZhihuRes = await myFetch(url);
  return res.data.map((k, index) => {
    const url = k.target.link.url;
    const title = k.target.title_area.text;
    const metrics = k.target.metrics_area.text;
    // metrics is like "5,221 万热度", I need to parse the number
    const score = parseInt(metrics.replace(/,/g, '')) || 0;

    return {
      id: url.match(/(\d+)$/)?.[1] ?? url,
      title,
      url,
      source: 'zhihu',
      rank: index + 1,
      score: score,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
};