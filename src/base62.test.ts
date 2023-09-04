import { it, expect, describe } from "vitest";
import { decodeBase62, encodeBase62 } from "./base62";

describe("base62", () => {
  it("encodeBase62", () => {
    expect(encodeBase62(Buffer.from("1148193282732331008", "utf8"))).toBe(
      "1e1U8S",
    );
    // expect(encodeBase62(888888)).toBe("3JeU");
    // expect(encodeBase62(999)).toBe("g7");
  });

  it("decodeBase62", () => {
    expect(decodeBase62("1e1U8S")).toBe(1123455678);
    expect(decodeBase62("3JeU")).toBe(888888);
    expect(decodeBase62("g7")).toBe(999);
  });
});
