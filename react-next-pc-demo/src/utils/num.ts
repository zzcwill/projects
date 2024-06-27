// 数字转千分位金额
// precision 小数位数，默认不处理，设置后根据值处理小数位数
// precision 位数
// after 金额后面的单位
export function toThousands(val: any, precision = 2, after = '') {
  if (val === '') return '';
  if (isNaN(val) || val === null || val === undefined) return '--';
  const pattern = /^(-?\d+)(\d{3})(\.?\d*)/;
  if (precision != null) {
    val = Number(val).toFixed(precision);
  }
  while (pattern.test(val)) {
    val = String(val).replace(pattern, '$1,$2$3');
  }

  return val + after;
}

// 转百分比
export function toPercent(val: any) {
  if (val === '') return '';
  if (val === null || val === undefined) return '--';

  return `${val * 100}%`;
}
