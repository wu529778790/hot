import { Buffer } from "node:buffer"

export function decodeBase64URL(str: string) {
  return new TextDecoder().decode(Buffer.from(decodeURIComponent(str), "base64"))
}

export function encodeBase64URL(str: string) {
  return encodeURIComponent(Buffer.from(str).toString("base64"))
}

export function decodeBase64(str: string) {
  return new TextDecoder().decode(Buffer.from(str, "base64"))
}

export function encodeBase64(str: string) {
  return Buffer.from(str).toString("base64")
}
