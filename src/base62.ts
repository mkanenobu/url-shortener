import { bigIntToBuffer, bufferToBigInt } from "./utils";

const availableChars =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const encodeBase62 = (input: Buffer): string => {
  let result = "";
  let combined = bufferToBigInt(input);

  while (combined > 0n) {
    const index = Number(combined % 62n);
    result = availableChars[index] + result;
    combined /= 62n;
  }

  return result;
};

export const decodeBase62 = (input: string): Buffer => {
  let result = BigInt(0);
  for (let i = 0; i < input.length; i++) {
    result = result * BigInt(62) + BigInt(availableChars.indexOf(input[i]));
  }
  return bigIntToBuffer(result);
};
