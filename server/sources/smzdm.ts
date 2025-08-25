import type { HotItem } from '~/server/models/hot-item.model';
import { rss2json } from '~/server/utils/rss2json';

export async function getSmzdmHotList(): Promise<HotItem[]> {
  const rssInfo = await rss2json('http://feed.smzdm.com');

  if (!rssInfo || !rssInfo.items) {
    console.error('Failed to fetch or parse SMZDM RSS feed.');
    return [];
  }

  const news: HotItem[] = rssInfo.items.map((item, index) => {
    return {
      id: item.id || item.link,
      title: item.title,
      url: item.link,
      source: 'smzdm',
      rank: index + 1,
      score: 0,
      createdAt: new Date(item.created),
      updatedAt: new Date(),
    };
  });

  return news;
}