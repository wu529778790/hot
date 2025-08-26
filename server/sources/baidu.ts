import type { NewsItem } from "@shared/types";
import { myFetch } from "~/server/utils/fetch";

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

export async function getBaiduHotList(): Promise<NewsItem[]> {
  const rawData: string = await myFetch(
    `https://top.baidu.com/board?tab=realtime`
  );
  const jsonStr = (rawData as string).match(/<!--s-data:(.*?)-->/s);
  if (!jsonStr || !jsonStr[1]) {
    throw new Error("Failed to extract Baidu hot list data.");
  }
  const data: BaiduResponse = JSON.parse(jsonStr[1]);

  if (!data.data?.cards?.[0]?.content) {
    throw new Error("Invalid Baidu response structure");
  }

  return data.data.cards[0].content
    .filter((k) => !k.isTop)
    .map((item, index) => ({
      id: item.rawUrl,
      title: item.word,
      url: item.rawUrl,
      extra: {
        info: `排名: ${index + 1}`,
      },
    }));
}
