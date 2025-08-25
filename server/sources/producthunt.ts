import type { HotItem } from '~/server/models/hot-item.model';
import { rss2json } from '~/server/utils/rss2json';

export async function getProducthuntHotList(): Promise<HotItem[]> {
  const rssInfo = await rss2json('https://www.producthunt.com/feed');

  if (!rssInfo || !rssInfo.items) {
    console.error('Failed to fetch or parse Product Hunt RSS feed.');
    return [];
  }

  const news: HotItem[] = rssInfo.items.map((item, index) => {
    return {
      id: item.id || item.link,
      title: item.title,
      url: item.link,
      source: 'producthunt',
      rank: index + 1,
      score: 0, // Vote count is not available in the RSS feed.
      createdAt: new Date(item.created),
      updatedAt: new Date(),
    };
  });

  return news;
}