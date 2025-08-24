import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setup, $fetch, startServer, stopServer } from '@nuxt/test-utils';
import { createResolver } from '@nuxt/kit';

describe('API tests', async () => {
  await setup({ server: false });

  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await stopServer();
  });

  it('/api/sources', async () => {
    const sources = await $fetch('/api/sources');
    expect(Array.isArray(sources)).toBe(true);
    expect(sources.length).toBeGreaterThan(0);
  });

  it('/api/hot-list', async () => {
    const sources = await $fetch('/api/sources');
    const weibo = sources.find(s => s.id === 'weibo');
    expect(weibo).toBeDefined();

    const hotList = await $fetch('/api/hot-list?id=weibo');
    expect(Array.isArray(hotList)).toBe(true);
    expect(hotList.length).toBeGreaterThan(0);
  });

  it('/api/latest', async () => {
    const latest = await $fetch('/api/latest');
    expect(latest).toHaveProperty('v');
  });

  it.todo('/api/proxy/img.png', async () => {
    // TODO: figure out how to get the server url in the test environment
  });
});