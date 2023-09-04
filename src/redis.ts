import Redis from "ioredis";
import { isDev } from "./env";

export const redisClient = new Redis(
  isDev ? "redis://:@127.0.0.1:16379" : "redis://:@url_shortener_redis:6379",
);

export const bfAdd = (key: string, value: string): Promise<number> => {
  const cmd = redisClient.createBuiltinCommand("BF.ADD");
  return cmd.string.call(redisClient, key, value);
};

export const bfExists = (key: string, value: string): Promise<number> => {
  const cmd = redisClient.createBuiltinCommand("BF.EXISTS");
  return cmd.string.call(redisClient, key, value);
};

export const bfReverse = (
  key: string,
  errRate: number,
  capacity: number,
): Promise<number> => {
  const cmd = redisClient.createBuiltinCommand("BF.RESERVE");
  return cmd.string.call(redisClient, key, errRate, capacity);
};
