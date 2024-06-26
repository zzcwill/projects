'use client';

// 判断当前是h5环境还是web环境
export const isH5ClientEnv = () => {
  let isH5 = false;
  if (typeof window !== 'undefined') {
    const ua = window.navigator.userAgent?.toLocaleLowerCase() || '';
    isH5 = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(ua);
  }

  return isH5;
}
