import type { HotItem } from '../models/hot-item.model';
import { http } from '../utils/http';

interface ZhihuResponse {
  data: {
    target: {
      title_area: { text: string };
      metrics_area: { text: string };
      link: { url: string };
    };
  }[];
}

export async function getZhihuHotList(): Promise<HotItem[]> {
  const response: ZhihuResponse = await http('https://www.zhihu.com/api/v3/feed/topstory/hot-list-web?limit=20&desktop=true');

  return response.data.map((item, index) => ({
    id: `zhihu-${item.target.link.url.match(/(\d+)$/)?.[1]}`,
    title: item.target.title_area.text,
    url: item.target.link.url,
    rank: index + 1,
    score: parseInt(item.target.metrics_area.text, 10) || 0,
  }));
}
