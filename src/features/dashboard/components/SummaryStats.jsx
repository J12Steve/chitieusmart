import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { GlassCard } from '../../../components/ui';
import { formatCurrency } from '../../../utils/formatCurrency';
import { listItem } from '../../../utils/motion';

// Class Tailwind phải viết đầy đủ (không ghép chuỗi) thì mới được build.
const TONES = {
  income: 'bg-income-soft text-income',
  expense: 'bg-expense-soft text-expense',
};

function Stat({ label, value, icon: Icon, tone }) {
  return (
    <GlassCard variants={listItem} className="flex items-center gap-4">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${TONES[tone]}`}>
        <Icon size={20} />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-ink-soft">{label}</p>
        <p className="truncate text-xl font-semibold">{formatCurrency(value)}</p>
      </div>
    </GlassCard>
  );
}

// Trả về fragment để 2 thẻ trở thành ô con trực tiếp của grid ở DashboardPage.
export default function SummaryStats({ income, expense }) {
  return (
    <>
      <Stat label="Thu tháng này" value={income} icon={ArrowDownLeft} tone="income" />
      <Stat label="Chi tháng này" value={expense} icon={ArrowUpRight} tone="expense" />
    </>
  );
}