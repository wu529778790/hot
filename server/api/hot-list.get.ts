import { getHotList } from '~/server/services/hot-list.service';
import { sourcesMap } from '~/server/services/sources';

export default cachedEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id as string;

  if (!id || !sourcesMap.has(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid source id',
    });
  }

  return await getHotList(id);
}, {
  maxAge: 10 * 60, // 缓存 10 分钟
});