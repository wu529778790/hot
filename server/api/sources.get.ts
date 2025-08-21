import { sources } from '~/server/services/sources';

export default defineEventHandler(() => {
  return sources;
});