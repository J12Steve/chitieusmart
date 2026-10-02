import { motion } from 'framer-motion';
import PageHeader from '../../components/layout/PageHeader';
import { listContainer } from '../../utils/motion';
import { useTransactions } from '../transactions/hooks/useTransactions';
import { useBudgets } from './hooks/useBudgets';
import BudgetCard from './components/BudgetCard';

export default function BudgetsPage() {
  const { transactions } = useTransactions();
  const { budgets } = useBudgets(transactions);
  const now = new Date();

  return (
    <motion.div variants={listContainer} className="space-y-6">
      <PageHeader title="Ngân sách" subtitle={`Tháng ${now.getMonth() + 1}/${now.getFullYear()}`} />
      <motion.div variants={listContainer} className="grid gap-4 sm:grid-cols-2">
        {budgets.map((b) => (
          <BudgetCard key={b.categoryId} budget={b} />
        ))}
      </motion.div>
    </motion.div>
  );
}