// 获取url参数
export function getUrlParamData() {
  const url = location.href;
  const paramArr = url.slice(url.indexOf('?') + 1).split('&');
  const params = {};

  paramArr.map((param: any) => {
    const [key, val] = param.split('=');
    // @ts-ignore
    params[key] = decodeURIComponent(val);

    return null;
  });
  return params;
}
