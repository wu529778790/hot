import { getHotList } from '~/server/services/hot-list.service';
import { sourcesMap } from '~/server/services/sources';
import { getCacheTable } from '~/server/database/cache';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id as string;

  if (!id || !sourcesMap.has(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid source id',
    });
  }

  const cacheTable = await getCacheTable();
  const now = Date.now();

  if (cacheTable) {
    const cache = await cacheTable.get(id);
    if (cache && (now - cache.updated) < 600000) { // 10 minutes
      return cache.items;
    }
  }

  const items = await getHotList(id);

  if (cacheTable && items.length) {
    await cacheTable.set(id, items);
  }

  return items;
});
