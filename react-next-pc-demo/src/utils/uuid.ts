/* eslint-disable no-bitwise */
export function uuid(len: number, radix?: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const result: string[] = [];

  radix = radix || chars.length;

  if (len) {
    for (let i = 0; i < len; i++) {
      result[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    let r;
    result[8] = result[13] = result[18] = result[23] = '-';
    result[14] = '4';
    for (let i = 0; i < 36; i++) {
      if (!result[i]) {
        r = 0 | (Math.random() * 16);
        result[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return result.join('');
}
