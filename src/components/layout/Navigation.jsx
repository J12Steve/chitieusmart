import { motion } from 'framer-motion';
import { LayoutDashboard, ReceiptText, PiggyBank } from 'lucide-react';
import { cn } from '../../utils/cn';
import { springSnappy } from '../../utils/motion';

const PAGES = [
  { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
  { id: 'transactions', label: 'Giao dịch', icon: ReceiptText },
  { id: 'budgets', label: 'Ngân sách', icon: PiggyBank },
];

// Mobile: thanh kính nổi ở đáy màn hình. Desktop (md+): sidebar dính bên trái.
export default function Navigation({ page, onNavigate }) {
  return (
    <nav
      aria-label="Điều hướng chính"
      className="glass-strong fixed inset-x-4 bottom-4 z-30 rounded-3xl p-2
                 md:sticky md:inset-x-auto md:bottom-auto md:top-6 md:w-56 md:shrink-0 md:self-start md:p-3"
    >
      <p className="hidden px-4 pb-3 pt-2 text-lg font-bold md:block">Chi tiêu</p>

      <ul className="flex gap-1 md:flex-col">
        {PAGES.map(({ id, label, icon: Icon }) => {
          const active = page === id;
          return (
            <li key={id} className="flex-1 md:flex-none">
              <button
                onClick={() => onNavigate(id)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex w-full flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium focus-ring',
                  'md:flex-row md:gap-3 md:rounded-full md:px-4 md:py-2.5 md:text-sm',
                  active ? 'text-ink' : 'text-ink-soft hover:text-ink'
                )}
              >
                {/* layoutId: viên thuốc nền "trượt" bằng spring từ mục cũ sang mục mới */}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={springSnappy}
                    className="absolute inset-0 rounded-2xl bg-white/70 shadow-glass md:rounded-full"
                  />
                )}
                <Icon size={18} className="relative" />
                <span className="relative">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}