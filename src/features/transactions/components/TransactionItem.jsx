import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { getCategory } from '../../../constants/categories';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import { cn } from '../../../utils/cn';
import { listItem } from '../../../utils/motion';

export default function TransactionItem({ tx, onDelete }) {
  const cat = getCategory(tx.category);
  const Icon = cat.icon;
  const isIncome = tx.type === 'income';

  return (
    <motion.li
      layout                // khi một dòng bị xóa, các dòng còn lại TRƯỢT lên lấp chỗ
      variants={listItem}   // vào: mờ→rõ + trượt lên; ra: mờ dần + trượt trái (xem utils/motion.js)
      // Không dùng .glass (backdrop-filter) cho từng dòng: danh sách dài sẽ nặng GPU.
      // Nền trắng bán trong suốt + viền mỏng cho cảm giác tương tự.
      className="group flex items-center gap-4 rounded-2xl border border-white/60 bg-white/45 p-4 shadow-glass transition-colors hover:bg-white/60"
    >
      {/* Icon phân loại: màu danh mục ở độ đậm 25% (hex 8 chữ số, "40" ≈ 25%) */}
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${cat.color}40` }}
      >
        <Icon size={20} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{tx.note || cat.label}</p>
        <p className="text-sm text-ink-soft">
          {cat.label} · {formatDate(tx.date)}
        </p>
      </div>

      {/* Thu: nền xanh lá nhạt. Chi: nền đỏ nhạt. */}
      <span
        className={cn(
          'shrink-0 rounded-full px-3 py-1 text-sm font-semibold',
          isIncome ? 'bg-income-soft text-income' : 'bg-expense-soft text-expense'
        )}
      >
        {isIncome ? '+' : '−'}
        {formatCurrency(tx.amount)}
      </span>

      {/* Desktop: chỉ hiện khi hover/focus. Mobile (không có hover): luôn hiện. */}
      {onDelete && (
        <button
          onClick={() => onDelete(tx.id)}
          aria-label="Xóa giao dịch"
          className="rounded-full p-2 text-ink-soft hover:bg-white/70 hover:text-expense focus-ring
                     md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
        >
          <Trash2 size={16} />
        </button>
      )}
    </motion.li>
  );
}