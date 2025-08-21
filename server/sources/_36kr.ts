import { load } from 'cheerio';
import type { HotItem } from '~/server/models/hot-item.model';
import { myFetch } from '~/server/utils/fetch';
import { parseRelativeDate } from '~/server/utils/date';

export async function get36krHotList(): Promise<HotItem[]> {
  const baseURL = 'https://www.36kr.com';
  const url = `${baseURL}/newsflashes`;
  const response = (await myFetch(url)) as any;
  const $ = load(response);
  const news: HotItem[] = [];
  const $items = $('.newsflash-item');
  $items.each((index, el) => {
    const $el = $(el);
    const $a = $el.find('a.item-title');
    const url = $a.attr('href');
    const title = $a.text();
    const relativeDate = $el.find('.time').text();
    if (url && title && relativeDate) {
      const createdAt = parseRelativeDate(relativeDate, 'Asia/Shanghai');
      news.push({
        id: url,
        title,
        url: `${baseURL}${url}`,
        source: '36kr',
        rank: index + 1,
        score: 0,
        createdAt: createdAt as Date,
        updatedAt: new Date(),
      });
    }
  });

  return news;
}