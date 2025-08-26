import type { NewsItem, SourceID } from "@shared/types";
import type { CacheInfo } from "../types";

const inMemoryCache = new Map<string, CacheInfo>();

export class Cache {
  async init() {
    // No initialization needed for in-memory cache
    logger.success(`init in-memory cache`);
  }

  async set(key: string, value: NewsItem[]) {
    const now = Date.now();
    inMemoryCache.set(key, { id: key as SourceID, items: value, updated: now });
    logger.success(`set ${key} in-memory cache`);
  }

  async get(key: string): Promise<CacheInfo | undefined> {
    const cache = inMemoryCache.get(key);
    if (cache) {
      logger.success(`get ${key} in-memory cache`);
      return cache;
    }
  }

  async getEntire(keys: string[]): Promise<CacheInfo[]> {
    const results: CacheInfo[] = [];
    for (const key of keys) {
      const cache = inMemoryCache.get(key);
      if (cache) {
        results.push(cache);
      }
    }
    logger.success(`get entire (...) in-memory cache`);
    return results;
  }

  async delete(key: string) {
    inMemoryCache.delete(key);
    logger.success(`delete ${key} from in-memory cache`);
  }
}

export async function getCacheTable() {
  try {
    // No process.env.ENABLE_CACHE check needed, as it's always in-memory now
    const cacheTable = new Cache();
    await cacheTable.init();
    return cacheTable;
  } catch (e) {
    logger.error("failed to init cache ", e);
  }
}
