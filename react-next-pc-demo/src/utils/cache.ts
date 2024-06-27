import Cookies from 'js-cookie';

const prefix = 'react-next-pc-demo';

export const Cookie = {
  getItem(key: string) {
    return Cookies.get(`${prefix}_${key}`) || Cookies.get(key) || '';
  },
  // expires默认30天
  setItem(key: string, value: string, options = { expires: 30 }) {
    Cookies.set(`${prefix}_${key}`, value, { path: '/', ...options });
  },
  removeItem(key_s: string) {
    const key = `${prefix}_${key_s}`; // 之所以只清空带前缀的key，是因为不带前缀的key不是自己业务写的，不应由本业务来删除
    Cookies.remove(key, { path: '/' });
    const maybeDomain = document.domain.split('.');
    const com = maybeDomain.pop(); // cn\com等
    maybeDomain.reduceRight((val, item) => {
      const domain = val ? `${item}.${val}` : item;
      Cookies.remove(key, { path: '/', domain });
      return domain;
    }, com);
  }
};

export const LocalStorage = {
  getItem(key: string) {
    return localStorage.getItem(`${prefix}_${key}`) || localStorage.getItem(key) || '';
  },
  setItem(key: string, value: string) {
    localStorage.setItem(`${prefix}_${key}`, value);
  },
  removeItem(key: string) {
    localStorage.removeItem(`${prefix}_${key}`);
  }
};

export const SessionStorage = {
  getItem(key: string) {
    return sessionStorage.getItem(`${prefix}_${key}`) || sessionStorage.getItem(key) || '';
  },
  setItem(key: string, value: string) {
    sessionStorage.setItem(`${prefix}_${key}`, value);
  },
  removeItem(key: string) {
    sessionStorage.removeItem(`${prefix}_${key}`);
  }
};
