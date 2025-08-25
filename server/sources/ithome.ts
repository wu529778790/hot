import type { HotItem } from '~/server/models/hot-item.model';
import { rss2json } from '~/server/utils/rss2json';

export async function getIthomeHotList(): Promise<HotItem[]> {
  const rssInfo = await rss2json('https://www.ithome.com/rss/');

  if (!rssInfo || !rssInfo.items) {
    // If the RSS feed fails, return an empty array or handle the error as needed.
    console.error('Failed to fetch or parse ITHOME RSS feed.');
    return [];
  }

  // Map the RSS items to the HotItem model.
  const news: HotItem[] = rssInfo.items.map((item, index) => {
    return {
      id: item.id || item.link,
      title: item.title,
      url: item.link,
      source: 'ithome',
      rank: index + 1, // Rank based on order in the feed.
      score: 0, // RSS feeds do not typically provide a 'hotness' score.
      createdAt: new Date(item.created),
      updatedAt: new Date(),
    };
  });

  return news;
}
