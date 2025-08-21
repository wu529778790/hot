import { load } from 'cheerio';
import type { HotItem } from '~/server/models/hot-item.model';
import { myFetch } from '~/server/utils/fetch';
import { parseRelativeDate } from '~/server/utils/date';

export async function getIthomeHotList(): Promise<HotItem[]> {
  const response: any = await myFetch('https://www.ithome.com/list/');
  const $ = load(response);
  const $main = $('#list > div.fl > ul > li');
  const news: HotItem[] = [];
  $main.each((index, el) => {
    const $el = $(el);
    const $a = $el.find('a.t');
    const url = $a.attr('href');
    const title = $a.text();
    const date = $(el).find('i').text();
    if (url && title && date) {
      const isAd =
        url?.includes('lapin') ||
        ['神券', '优惠', '补贴', '京东'].find(k => title.includes(k));
      if (!isAd) {
        const createdAt = parseRelativeDate(date, 'Asia/Shanghai');
        news.push({
          id: url,
          title,
          url,
          source: 'ithome',
          rank: index + 1,
          score: 0,
          createdAt: createdAt as Date,
          updatedAt: new Date(),
        });
      }
    }
  });
  return news.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}