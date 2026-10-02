import { toISODate } from './formatDate';

// Toàn bộ là HÀM THUẦN (không side-effect) → dễ test, dễ tái sử dụng.

export const sumByType = (txs, type) =>
  txs.filter((t) => t.type === type).reduce((sum, t) => sum + t.amount, 0);

// Số dư = tổng thu − tổng chi (trên toàn bộ giao dịch)
export const getBalance = (txs) => sumByType(txs, 'income') - sumByType(txs, 'expense');

// monthKey dạng '2026-10'; ngày lưu 'YYYY-MM-DD' nên dùng startsWith là đủ
export const filterByMonth = (txs, monthKey) => txs.filter((t) => t.date.startsWith(monthKey));

// { food: 225000, transport: 120000, ... }: chỉ tính khoản chi
export const spendingByCategory = (txs) =>
  txs.reduce((acc, t) => {
    if (t.type === 'expense') acc[t.category] = (acc[t.category] ?? 0) + t.amount;
    return acc;
  }, {});

// Mới nhất lên đầu; cùng ngày thì khoản thêm sau lên trước
export const sortByDateDesc = (txs) =>
  [...txs].sort((a, b) => b.date.localeCompare(a.date) || (b.createdAt ?? 0) - (a.createdAt ?? 0));

// Dữ liệu cho line chart: mỗi ngày trong `days` ngày gần nhất một điểm {label, income, expense}.
// Ngày không có giao dịch vẫn có điểm (giá trị 0) → đường biểu đồ liền mạch.
export function buildCashflowSeries(txs, days = 30) {
  const now = new Date();
  const buckets = new Map();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    buckets.set(toISODate(d), {
      date: toISODate(d),
      label: `${d.getDate()}/${d.getMonth() + 1}`,
      income: 0,
      expense: 0,
    });
  }

  txs.forEach((t) => {
    const bucket = buckets.get(t.date);
    if (bucket) bucket[t.type] += t.amount; // t.type là 'income' hoặc 'expense'
  });

  return [...buckets.values()];
}