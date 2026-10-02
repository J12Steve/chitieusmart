import { useMemo } from 'react';
import {
  buildCashflowSeries, filterByMonth, getBalance, sumByType,
} from '../../../utils/calculations';
import { currentMonthKey } from '../../../utils/formatDate';

// Nhận `transactions` qua tham số → hook thuần, không phụ thuộc feature khác.
export function useDashboardStats(transactions) {
  return useMemo(() => {
    const monthTxs = filterByMonth(transactions, currentMonthKey());
    return {
      balance: getBalance(transactions),               // số dư tổng
      monthIncome: sumByType(monthTxs, 'income'),      // tổng thu trong tháng
      monthExpense: sumByType(monthTxs, 'expense'),    // tổng chi trong tháng
      series: buildCashflowSeries(transactions, 30),   // dữ liệu line chart 30 ngày
    };
  }, [transactions]);
}