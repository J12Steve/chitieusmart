const vnd = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});
const compact = new Intl.NumberFormat('vi-VN', { notation: 'compact' });

export const formatCurrency = (n) => vnd.format(n);   // 1500000 → "1.500.000 ₫"
export const formatCompact = (n) => compact.format(n); // dùng cho trục biểu đồ