import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassButton, GlassInput } from '../../../components/ui';
import { categoriesByType } from '../../../constants/categories';
import { toISODate } from '../../../utils/formatDate';
import { cn } from '../../../utils/cn';
import { springSnappy } from '../../../utils/motion';

const TYPES = [
  { id: 'expense', label: 'Chi tiêu', pill: 'bg-expense-soft', text: 'text-expense' },
  { id: 'income', label: 'Thu nhập', pill: 'bg-income-soft', text: 'text-income' },
];

export default function TransactionForm({ onSubmit, onCancel }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState(''); // chỉ giữ chữ số, hiển thị có dấu chấm ngăn cách
  const [category, setCategory] = useState(categoriesByType('expense')[0].id);
  const [date, setDate] = useState(toISODate());
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});

  // Đổi loại → danh mục phải đổi theo (chi tiêu và thu nhập có danh mục khác nhau)
  const switchType = (next) => {
    setType(next);
    setCategory(categoriesByType(next)[0].id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!amount || Number(amount) <= 0) next.amount = 'Nhập số tiền lớn hơn 0';
    if (!date) next.date = 'Chọn ngày giao dịch';
    setErrors(next);
    if (Object.keys(next).length) return;

    onSubmit({ type, amount: Number(amount), category, date, note: note.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Công tắc Chi / Thu: viên thuốc nền trượt bằng spring */}
      <div role="radiogroup" aria-label="Loại giao dịch" className="glass flex rounded-full p-1">
        {TYPES.map((t) => {
          const active = type === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => switchType(t.id)}
              className="relative flex-1 rounded-full py-2 text-sm font-semibold focus-ring"
            >
              {active && (
                <motion.span
                  layoutId="type-pill"
                  transition={springSnappy}
                  className={cn('absolute inset-0 rounded-full', t.pill)}
                />
              )}
              <span className={cn('relative', active ? t.text : 'text-ink-soft')}>{t.label}</span>
            </button>
          );
        })}
      </div>

      <GlassInput
        label="Số tiền"
        suffix="₫"
        inputMode="numeric"
        placeholder="0"
        // Bỏ ký tự không phải số, bỏ số 0 đứng đầu, giới hạn 12 chữ số
        value={amount ? Number(amount).toLocaleString('vi-VN') : ''}
        onChange={(e) => setAmount(e.target.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 12))}
        error={errors.amount}
      />

      <GlassInput as="select" label="Danh mục" value={category} onChange={(e) => setCategory(e.target.value)}>
        {categoriesByType(type).map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </GlassInput>

      <GlassInput
        label="Ngày"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={errors.date}
      />

      <GlassInput
        as="textarea"
        label="Ghi chú (không bắt buộc)"
        rows={3}
        className="resize-none"
        placeholder="Ví dụ: Cà phê với bạn"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex gap-3 pt-2">
        <GlassButton variant="glass" className="flex-1" onClick={onCancel}>
          Hủy
        </GlassButton>
        <GlassButton type="submit" className="flex-1">
          Lưu giao dịch
        </GlassButton>
      </div>
    </form>
  );
}