import { load } from 'cheerio';
import type { HotItem } from '~/server/models/hot-item.model';
import { myFetch } from '~/server/utils/fetch';

export async function getGithubHotList(): Promise<HotItem[]> {
  const baseURL = 'https://github.com';
  const html: any = await myFetch('https://github.com/trending?spoken_language_code=');
  const $ = load(html);
  const $main = $('main .Box div[data-hpc] > article');
  const news: HotItem[] = [];
  $main.each((index, el) => {
    const a = $(el).find('>h2 a');
    const title = a.text().replace(/\n+/g, '').trim();
    const url = a.attr('href');
    const star = $(el).find('[href$=stargazers]').text().replace(/\s+/g, '').trim();
    const desc = $(el).find('>p').text().replace(/\n+/g, '').trim();
    if (url && title) {
      news.push({
        id: url,
        title,
        url: `${baseURL}${url}`,
        source: 'github',
        rank: index + 1,
        score: parseInt(star.replace(/,/g, '')) || 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  });
  return news;
}