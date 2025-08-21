import type { HotItem, Source } from '../models/hot-item.model';
import { http } from '../utils/http';

interface WeiboResponse {
  ok: number;
  data: {
    cards: {
      card_group: {
        desc: string;
        scheme: string;
      }[];
    }[];
  };
}

export async function getWeiboHotList(): Promise<HotItem[]> {
  const response: WeiboResponse = await http('https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot');

  const items = response.data.cards[0].card_group
    .filter((_, i) => i > 0) // 过滤掉第一个置顶项
    .map((item, index) => ({
      id: item.desc,
      title: item.desc,
      url: `https://s.weibo.com/weibo?q=${encodeURIComponent(`#${item.desc}#`)}`,
      rank: index + 1,
    }));

  return items.map(item => ({
    ...item,
    id: `weibo-${item.id}`,
  })) as HotItem[];
}
