export const bufferToBigInt = (input: Buffer): bigint =>
  BigInt(`0x${input.toString("hex")}`);

export const bigIntToBuffer = (input: bigint) => {
  let hex = input.toString(16);
  if (hex.length % 2) {
    // padding
    hex = "0" + hex;
  }
  const buf = Buffer.from(hex, "hex");

  return buf;
};

export const parseNumericStringAsBigInt = (input: string): bigint => {
  if (input.length === 0) {
    return BigInt(0);
  }
  return BigInt(input);
};

export const parseDecimalStringAsBuffer = (input: string): Buffer => {
  return bigIntToBuffer(parseNumericStringAsBigInt(input));
};

export const parseHexStringAsBuffer = (input: string): Buffer => {
  return Buffer.from(input, "hex");
};
