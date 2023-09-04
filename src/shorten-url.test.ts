import { decodeUrl, shortenUrl } from "./shorten-url";
import { describe, expect, it } from "vitest";

describe("shortenUrl", () => {
  it("should shorten url", () => {
    const id = "123";
    const shortUrl = shortenUrl(id);
    expect(shortUrl).toBe("http://localhost:8800/api/v1/1Z");
  });

  it("should decode url", () => {
    const shortUrl = "1mOJICXYDuc";
    const id = decodeUrl(shortUrl);
    expect(id).toBe("123");
  });
});
