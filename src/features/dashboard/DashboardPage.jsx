import { motion } from 'framer-motion';
import PageHeader from '../../components/layout/PageHeader';
import { GlassButton } from '../../components/ui';
import { listContainer, listItem } from '../../utils/motion';
import { useTransactions } from '../transactions/hooks/useTransactions';
import TransactionList from '../transactions/components/TransactionList';
import AddTransactionButton from '../transactions/components/AddTransactionButton';
import { useDashboardStats } from './hooks/useDashboardStats';
import BalanceCard from './components/BalanceCard';
import SummaryStats from './components/SummaryStats';
import CashflowChart from './components/CashflowChart';

export default function DashboardPage({ onAdd, onSeeAll }) {
  const { transactions } = useTransactions();
  const { balance, monthIncome, monthExpense, series } = useDashboardStats(transactions);
  const now = new Date();

  return (
    <motion.div variants={listContainer} className="space-y-6">
      <PageHeader
        title="Tổng quan"
        subtitle={`Tháng ${now.getMonth() + 1}/${now.getFullYear()}`}
        action={<AddTransactionButton onClick={onAdd} />}
      />

      {/* 3 ô: số dư, tổng thu, tổng chi */}
      <div className="grid gap-4 md:grid-cols-3">
        <BalanceCard balance={balance} />
        <SummaryStats income={monthIncome} expense={monthExpense} />
      </div>

      <CashflowChart data={series} />

      <section className="space-y-3">
        <motion.div variants={listItem} className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Giao dịch gần đây</h2>
          <GlassButton variant="glass" size="sm" onClick={onSeeAll}>
            Xem tất cả
          </GlassButton>
        </motion.div>
        <TransactionList transactions={transactions.slice(0, 5)} />
      </section>
    </motion.div>
  );
}