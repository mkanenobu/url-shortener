import {
  bufferToBigInt,
  bigIntToBuffer,
  parseNumericStringAsBigInt,
} from "./utils";
import { it, describe, expect } from "vitest";
import { encodeBase62 } from "./base62";

describe("utils", () => {
  it("bufferToBigInt bigIntToBuffer", () => {
    const buf = Buffer.from("1148193282732331008", "utf8");
    const bigint = bufferToBigInt(buf);
    const buf2 = bigIntToBuffer(bigint);
    expect(buf.toString("hex")).toBe(buf2.toString("hex"));
  });
});

describe("utils", () => {
  it("parseNumericStringAsBigInt", () => {
    expect(parseNumericStringAsBigInt("1148193282732331008").toString(10)).toBe(
      "1148193282732331008",
    );

    const raw = "1148193282732331008";
    const bigInt = parseNumericStringAsBigInt(raw);
    const buf = bigIntToBuffer(bigInt);
    console.log(encodeBase62(buf));
  });
});
