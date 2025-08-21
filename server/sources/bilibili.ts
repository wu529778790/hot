import type { HotItem } from '~/server/models/hot-item.model';
import { myFetch } from '~/server/utils/fetch';
import { proxyPicture } from '~/server/utils/proxy';

// Interfaces for Bilibili API responses
interface WapRes {
  list: {
    keyword: string;
    show_name: string;
    icon: string;
  }[];
}

interface HotVideoRes {
  data: {
    list: {
      bvid: string;
      title: string;
      pubdate: number;
      owner: {
        name: string;
      };
      stat: {
        view: number;
        like: number;
      };
      desc: string;
      pic: string;
    }[];
  };
}

function formatNumber(num: number): string {
  if (num >= 10000) {
    return `${Math.floor(num / 10000)}w+`;
  }
  return num.toString();
}

export async function getBilibiliHotSearch(): Promise<HotItem[]> {
  const url = 'https://s.search.bilibili.com/main/hotword?limit=30';
  const res: WapRes = await myFetch(url);

  return res.list.map((k, index) => ({
    id: k.keyword,
    title: k.show_name,
    url: `https://search.bilibili.com/all?keyword=${encodeURIComponent(k.keyword)}`,
    source: 'bilibili-hot-search',
    rank: index + 1,
    score: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
}

export async function getBilibiliHotVideo(): Promise<HotItem[]> {
  const url = 'https://api.bilibili.com/x/web-interface/popular';
  const res: HotVideoRes = await myFetch(url);

  return res.data.list.map((video, index) => ({
    id: video.bvid,
    title: video.title,
    url: `https://www.bilibili.com/video/${video.bvid}`,
    source: 'bilibili-hot-video',
    rank: index + 1,
    score: video.stat.like,
    createdAt: new Date(video.pubdate * 1000),
    updatedAt: new Date(),
  }));
}

export async function getBilibiliRanking(): Promise<HotItem[]> {
  const url = 'https://api.bilibili.com/x/web-interface/ranking/v2';
  const res: HotVideoRes = await myFetch(url);

  return res.data.list.map((video, index) => ({
    id: video.bvid,
    title: video.title,
    url: `https://www.bilibili.com/video/${video.bvid}`,
    source: 'bilibili-ranking',
    rank: index + 1,
    score: video.stat.like,
    createdAt: new Date(video.pubdate * 1000),
    updatedAt: new Date(),
  }));
}