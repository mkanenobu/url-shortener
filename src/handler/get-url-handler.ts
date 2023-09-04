import { Handler } from "./handler.type";
import { urlToken } from "../datastore/cassandra";
import { decodeUrl } from "../shorten-url";

const ENABLE_REDIRECT = false;

export const getUrlHandler: Handler<{
  Params: { shortUrl: string };
}> = async (req, res) => {
  const shortUrl = req.params.shortUrl;

  const decoded = decodeUrl(shortUrl);
  const token = (await urlToken.findById(decoded)).rows?.at(0);
  const longUrl = token?.get("longurl");

  if (!longUrl) {
    return res.status(404).send("Not Found");
  }

  if (ENABLE_REDIRECT) {
    return res.redirect(302, longUrl);
  }
  return res.status(200).send(longUrl);
};
