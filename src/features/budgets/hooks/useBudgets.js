import { useCallback, useMemo } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { DEFAULT_BUDGETS } from '../../../data/seed';
import { filterByMonth, spendingByCategory } from '../../../utils/calculations';
import { currentMonthKey } from '../../../utils/formatDate';

export function useBudgets(transactions) {
  const [limits, setLimits] = useLocalStorage('et:budgets', DEFAULT_BUDGETS);

  const budgets = useMemo(() => {
    const spent = spendingByCategory(filterByMonth(transactions, currentMonthKey()));

    return Object.entries(limits).map(([categoryId, limit]) => {
      const used = spent[categoryId] ?? 0;
      return {
        categoryId,
        limit,
        spent: used,
        // KHÔNG chặn ở 100% để biết khi nào vượt ngân sách.
        // ProgressBar sẽ tự cắt thanh ở 100%.
        percent: limit > 0 ? Math.round((used / limit) * 100) : 0,
        isOver: used > limit,
      };
    });
  }, [transactions, limits]);

  const setLimit = useCallback(
    (categoryId, value) => setLimits((prev) => ({ ...prev, [categoryId]: value })),
    [setLimits]
  );

  return { budgets, setLimit };
}
