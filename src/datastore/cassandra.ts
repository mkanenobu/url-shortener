import { Client } from "cassandra-driver";
import { getId } from "../katsubushi-client";
import { parseDecimalStringAsBuffer, parseHexStringAsBuffer } from "../utils";

const createKeyspaceQuery = `
CREATE KEYSPACE IF NOT EXISTS mykeyspace WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};
`;
const createTableQuery = `
CREATE TABLE IF NOT EXISTS mykeyspace.url_tokens (
    id TEXT,
    longurl TEXT,
    createdat TIMESTAMP,
    PRIMARY KEY (id)
);`;
const indexQuery = `
CREATE INDEX IF NOT EXISTS ON mykeyspace.url_tokens (longurl);
`;

const setupClient = new Client({
  contactPoints: ["127.0.0.1:9042"],
  localDataCenter: "dc1",
});

export const setupCassandra = async () => {
  await setupClient.execute(createKeyspaceQuery);
  await setupClient.execute(createTableQuery);
  await setupClient.execute(indexQuery);
};

export class UrlToken {
  private client: Client;
  constructor() {
    this.client = new Client({
      contactPoints: ["127.0.0.1:9042"],
      localDataCenter: "dc1",
      keyspace: "mykeyspace",
    });
  }

  public create = async (longUrl: string) => {
    const id = await getId();
    const createdAt = new Date();
    await this.client.execute(
      `INSERT INTO url_tokens (id, longurl, createdat) VALUES (?, ?, ?)`,
      [id, longUrl, createdAt],
    );
    return parseDecimalStringAsBuffer(id);
  };

  public findById = async (id: string) => {
    return await this.client.execute(`SELECT * FROM url_tokens WHERE id = ?`, [
      id,
    ]);
  };

  public findByLongUrl = async (
    longUrl: string,
  ): Promise<Buffer | undefined> => {
    const r = await this.client.execute(
      `SELECT * FROM url_tokens WHERE longurl = ?`,
      [longUrl],
    );
    const id = r.rows?.at(0)?.get("id");
    if (!id) {
      return undefined;
    }
    return parseDecimalStringAsBuffer(id);
  };
}

export const urlToken = new UrlToken();
