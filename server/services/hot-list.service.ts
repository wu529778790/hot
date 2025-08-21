import { getWeiboHotList } from '~/server/sources/weibo';
import { getZhihuHotList } from '~/server/sources/zhihu';
import type { HotItem } from '../models/hot-item.model';

const fetcherMap: Record<string, () => Promise<HotItem[]>> = {
  weibo: getWeiboHotList,
  zhihu: getZhihuHotList,
};

export async function getHotList(id: string): Promise<HotItem[]> {
  const fetcher = fetcherMap[id];
  if (!fetcher) {
    throw new Error('Invalid source id');
  }
  return await fetcher();
}