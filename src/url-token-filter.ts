import { bfAdd, bfExists } from "./redis";

const bloomFilterKey = "url-bloom-filter-key";

export const exists = async (longUrl: string): Promise<boolean> => {
  return await bfExists(bloomFilterKey, longUrl).then((res) => {
    return res === 1;
  });
};

export const add = async (longUrl: string): Promise<boolean> => {
  return await bfAdd(bloomFilterKey, longUrl).then((res) => {
    return res === 1;
  });
};
