import { GlassCard, ProgressBar } from '../../../components/ui';
import { getCategory } from '../../../constants/categories';
import { formatCurrency } from '../../../utils/formatCurrency';
import { cn } from '../../../utils/cn';
import { listItem } from '../../../utils/motion';

export default function BudgetCard({ budget }) {
  const cat = getCategory(budget.categoryId);
  const Icon = cat.icon;
  const remaining = budget.limit - budget.spent;

  return (
    <GlassCard variants={listItem} className="space-y-4">
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${cat.color}40` }}
        >
          <Icon size={20} />
        </span>
        <div className="flex-1">
          <p className="font-semibold">{cat.label}</p>
          <p className="text-sm text-ink-soft">
            {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
          </p>
        </div>
        <span className={cn('text-lg font-bold', budget.isOver && 'text-expense')}>{budget.percent}%</span>
      </div>

      <ProgressBar value={budget.percent} color={cat.color} isOver={budget.isOver} label={`Ngân sách ${cat.label}`} />

      <p className={cn('text-sm', budget.isOver ? 'text-expense' : 'text-ink-soft')}>
        {budget.isOver ? `Vượt ${formatCurrency(-remaining)}` : `Còn lại ${formatCurrency(remaining)}`}
      </p>
    </GlassCard>
  );
}