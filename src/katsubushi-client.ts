import Memcached from "memcached";
import { isDev } from "./env";
import { parseDecimalStringAsBuffer } from "./utils";

const memcachedClient = new Memcached(
  isDev ? "127.0.0.1:11212" : "url_shortener_katsubushi:11212",
);

export const getId = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    memcachedClient.get("0", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
