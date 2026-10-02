import { useCallback, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { buildSeedTransactions } from '../../data/seed';
import { sortByDateDesc } from '../../utils/calculations';
import { TransactionsContext } from './hooks/useTransactions';

export function TransactionsProvider({ children }) {
  // Lần đầu chạy: nạp dữ liệu mẫu. Sau đó đọc từ localStorage.
  const [items, setItems] = useLocalStorage('et:transactions', buildSeedTransactions);

  // data: { type, amount, category, date, note }
  const addTransaction = useCallback(
    (data) =>
      setItems((prev) => [
        { ...data, id: crypto.randomUUID(), createdAt: Date.now() },
        ...prev,
      ]),
    [setItems]
  );

  const deleteTransaction = useCallback(
    (id) => setItems((prev) => prev.filter((t) => t.id !== id)),
    [setItems]
  );

  // Luôn trả về danh sách đã sắp xếp → mọi nơi dùng đều thấy cùng thứ tự
  const value = useMemo(
    () => ({ transactions: sortByDateDesc(items), addTransaction, deleteTransaction }),
    [items, addTransaction, deleteTransaction]
  );

  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}