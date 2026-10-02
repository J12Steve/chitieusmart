import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AppShell from './components/layout/AppShell';
import { useDisclosure } from './hooks/useDisclosure';
import { pageVariants } from './utils/motion';
import { TransactionsProvider } from './features/transactions/TransactionsProvider';
import AddTransactionModal from './features/transactions/components/AddTransactionModal';
import TransactionsPage from './features/transactions/TransactionsPage';
import DashboardPage from './features/dashboard/DashboardPage';
import BudgetsPage from './features/budgets/BudgetsPage';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const addModal = useDisclosure(); // một modal duy nhất, mở từ bất kỳ trang nào

  const navigate = (id) => {
    setPage(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <TransactionsProvider>
      <AppShell page={page} onNavigate={navigate}>
        {/* CHUYỂN TRANG:
            - key={page}: đổi trang = React coi là phần tử mới → chạy exit của trang cũ, initial/animate của trang mới.
            - mode="wait": trang cũ mờ đi xong mới hiện trang mới (không bị chồng lên nhau).
            - Các thẻ con trong trang dùng variants (listItem) sẽ tự thừa hưởng "initial/animate/exit"
              từ wrapper này nên xuất hiện lần lượt (stagger) mà không cần khai báo lại. */}
        <AnimatePresence mode="wait">
          <motion.div key={page} variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {page === 'dashboard' && (
              <DashboardPage onAdd={addModal.open} onSeeAll={() => navigate('transactions')} />
            )}
            {page === 'transactions' && <TransactionsPage onAdd={addModal.open} />}
            {page === 'budgets' && <BudgetsPage />}
          </motion.div>
        </AnimatePresence>
      </AppShell>

      <AddTransactionModal isOpen={addModal.isOpen} onClose={addModal.close} />
    </TransactionsProvider>
  );
}