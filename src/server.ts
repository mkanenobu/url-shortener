import fastify from "fastify";
import { registerUrlHandler } from "./handler/register-url-handler";
import { getUrlHandler } from "./handler/get-url-handler";

const app = fastify({
  logger: true,
});

export const logger = app.log;

const port = 8800;

app.get("/__health", async (_req, _res) => {
  return "OK";
});

app.post("/api/v1/data/shorten", registerUrlHandler);
app.get("/api/v1/:shortUrl", getUrlHandler);

export const startApiServer = async () => {
  await app.listen({ port });
};
