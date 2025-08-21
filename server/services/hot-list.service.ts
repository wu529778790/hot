import { getWeiboHotList } from '~/server/sources/weibo';
import { getZhihuHotList } from '~/server/sources/zhihu';
import { get36krHotList } from '~/server/sources/_36kr';
import { getBaiduHotList } from '~/server/sources/baidu';
import { getBilibiliHotSearch, getBilibiliHotVideo, getBilibiliRanking } from '~/server/sources/bilibili';
import { getGithubHotList } from '~/server/sources/github';
import { getIthomeHotList } from '~/server/sources/ithome';
import type { HotItem } from '../models/hot-item.model';

const fetcherMap: Record<string, () => Promise<HotItem[]>> = {
  weibo: getWeiboHotList,
  zhihu: getZhihuHotList,
  '36kr': get36krHotList,
  baidu: getBaiduHotList,
  'bilibili-hot-search': getBilibiliHotSearch,
  'bilibili-hot-video': getBilibiliHotVideo,
  'bilibili-ranking': getBilibiliRanking,
  github: getGithubHotList,
  ithome: getIthomeHotList,
};

export async function getHotList(id: string): Promise<HotItem[]> {
  const fetcher = fetcherMap[id];
  if (!fetcher) {
    throw new Error('Invalid source id');
  }
  return await fetcher();
}