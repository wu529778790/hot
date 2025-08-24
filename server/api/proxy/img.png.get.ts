import { decodeBase64URL } from '~/server/utils/base64';

export default defineEventHandler(async (event) => {
  const { url: img, type = "encodeURIComponent" } = getQuery(event)
  if (img) {
    const url = type === "encodeURIComponent" ? decodeURIComponent(img as string) : decodeBase64URL(img as string)
    return sendProxy(event, url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    })
  }
})
