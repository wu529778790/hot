import { rss2json } from "~/server/utils/rss2json";
import { logger } from "~/server/utils/logger";

export default defineSource({
  ithome: async () => {
    const rssInfo = await rss2json("https://www.ithome.com/rss/");

    if (!rssInfo || !rssInfo.items) {
      logger.error("Failed to fetch or parse ITHOME RSS feed.");
      return [];
    }

    return rssInfo.items.map((item, index) => ({
      id: (item as any).id || item.link,
      title: item.title,
      url: item.link,
      extra: {
        date: item.created
          ? new Date(item.created).getTime()
          : new Date().getTime(),
      },
    }));
  },
});
