import { AnimatePresence, motion } from 'framer-motion';
import { GlassCard } from '../../../components/ui';
import { listContainer } from '../../../utils/motion';
import TransactionItem from './TransactionItem';

// `onDelete` là tùy chọn: Dashboard hiển thị danh sách chỉ-đọc.
export default function TransactionList({ transactions, onDelete }) {
  if (!transactions.length) {
    return <GlassCard className="text-center text-ink-soft">Chưa có giao dịch nào.</GlassCard>;
  }

  return (
    // listContainer: các dòng xuất hiện lần lượt (stagger) khi vào trang
    <motion.ul variants={listContainer} className="space-y-3">
      {/* AnimatePresence giữ dòng bị xóa lại đến khi animation "exit" chạy xong */}
      <AnimatePresence>
        {transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}