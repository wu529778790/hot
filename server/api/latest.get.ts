import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

export default defineEventHandler(async () => {
  try {
    const path = resolve('.', 'package.json');
    const pkg = JSON.parse(await fs.readFile(path, 'utf-8'));
    return {
      v: pkg.version,
    };
  } catch (error) {
    console.error('Error reading package.json:', error);
    return { v: null };
  }
});
