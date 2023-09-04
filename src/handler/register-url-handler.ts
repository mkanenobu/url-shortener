import { Handler } from "./handler.type";
import { urlToken } from "../datastore/cassandra";
import { shortenUrl } from "../shorten-url";

export const registerUrlHandler: Handler<{
  Body: { longUrl: string };
}> = async (req, res) => {
  const longUrl = req.body.longUrl;
  if (!validateInputUrl(longUrl)) {
    return res.status(400).send("Invalid URL");
  }

  // check exists
  const existedId = await urlToken.findByLongUrl(longUrl);
  if (existedId) {
    const shortUrl = shortenUrl(existedId);
    return res.status(200).send(shortUrl);
  }

  // generate
  const id = await urlToken.create(longUrl);
  return res.status(201).send(shortenUrl(id));
};

const validateInputUrl = (input: unknown): boolean => {
  if (typeof input !== "string") {
    return false;
  }
  try {
    new URL(input);
    return true;
  } catch (_) {
    return false;
  }
};
