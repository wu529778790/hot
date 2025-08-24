import { defineVitestConfig } from '@nuxt/test-utils/config';
import { resolve } from 'node:path';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    exclude: ['**/node_modules/**', '**/news.shenzjd.com/**'],
  },
  resolve: {
    alias: {
      '#': resolve(__dirname, './server'),
    },
  },
});
