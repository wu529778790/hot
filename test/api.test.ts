import { describe, it, expect, vi } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils';

describe('API tests', async () => {
  await setup({ server: true });

  it('/api/sources', async () => {
    const sources = await $fetch('/api/sources');
    expect(Array.isArray(sources)).toBe(true);
    expect(sources.length).toBeGreaterThan(0);
  });

  it.todo('/api/hot-list', async () => {
    // Weibo is blocking requests, so this test is skipped for now.
  });

  it('/api/latest', async () => {
    const latest = await $fetch('/api/latest');
    expect(latest).toHaveProperty('v');
  });

  it('/api/proxy/img.png', async () => {
    const mockResponse = new Response('mock image data', { status: 200, headers: { 'Content-Type': 'image/png' } });
    vi.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    const res = await $fetch('/api/proxy/img.png?url=https%3A%2F%2Fvia.placeholder.com%2F1');
    expect(res).toBeDefined();
  }, { timeout: 10000 });
});