import type { HotItem } from '~/server/models/hot-item.model';
import { myFetch } from '~/server/utils/fetch';

interface BaiduHotItem {
  word: string;
  rawUrl: string;
  isTop?: boolean;
}

interface BaiduResponse {
  data: {
    cards: {
      content: BaiduHotItem[];
    }[];
  };
}

export async function getBaiduHotList(): Promise<HotItem[]> {
  const rawData: string = await myFetch(`https://top.baidu.com/board?tab=realtime`);
  const jsonStr = (rawData as string).match(/<!--s-data:(.*?)-->/s);
  if (!jsonStr || !jsonStr[1]) {
    throw new Error('Failed to extract Baidu hot list data.');
  }
  const data: BaiduResponse = JSON.parse(jsonStr[1]);

  return data.data.cards[0].content
    .filter(k => !k.isTop)
    .map((item, index) => ({
      id: item.rawUrl,
      title: item.word,
      url: item.rawUrl,
      source: 'baidu',
      rank: index + 1,
      score: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
}