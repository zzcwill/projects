// 是否为手机号
export const isPhone = (str: string) => {
  const reg = /0?(1)[0-9]{10}/;
  return reg.test(str);
};
