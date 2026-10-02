import { motion } from 'framer-motion';
import PageHeader from '../../components/layout/PageHeader';
import { listContainer } from '../../utils/motion';
import { useTransactions } from './hooks/useTransactions';
import AddTransactionButton from './components/AddTransactionButton';
import TransactionList from './components/TransactionList';

export default function TransactionsPage({ onAdd }) {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    // Không khai báo initial/animate: các con tự thừa hưởng từ wrapper trong App.jsx.
    // listContainer chỉ thêm hiệu ứng stagger cho các con.
    <motion.div variants={listContainer} className="space-y-6">
      <PageHeader
        title="Giao dịch"
        subtitle={`${transactions.length} giao dịch`}
        action={<AddTransactionButton onClick={onAdd} />}
      />
      <TransactionList transactions={transactions} onDelete={deleteTransaction} />
    </motion.div>
  );
}