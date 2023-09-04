import { encodeBase62, decodeBase62 } from "./base62";

const baseUrl = "http://localhost:8800/api/v1/";

export const shortenUrl = (id: Buffer) => {
  const shortenId = encodeBase62(id);
  return `${baseUrl}${shortenId}`;
};

export const decodeUrl = (shortUrl: string): string => {
  const trimmed = shortUrl.replace(baseUrl, "");
  const decoded = decodeBase62(trimmed);
  return decoded.toString("hex");
};
