import {
  Utensils, Bus, ShoppingBag, Receipt, HeartPulse,
  Gamepad2, MoreHorizontal, Wallet, Banknote,
} from 'lucide-react';

// `color` là mã HEX (khớp tailwind.config.js) vì cần dùng trong style inline
// cho progress bar / biểu đồ. Class Tailwind động kiểu `bg-${x}` sẽ không hoạt động.
export const CATEGORIES = {
  // Chi tiêu
  food:      { id: 'food',      label: 'Ăn uống',  icon: Utensils,       color: '#F4B183', type: 'expense' },
  transport: { id: 'transport', label: 'Đi lại',   icon: Bus,            color: '#8EC5F0', type: 'expense' },
  shopping:  { id: 'shopping',  label: 'Mua sắm',  icon: ShoppingBag,    color: '#C9A7F0', type: 'expense' },
  bills:     { id: 'bills',     label: 'Hóa đơn',  icon: Receipt,        color: '#F0A9C0', type: 'expense' },
  health:    { id: 'health',    label: 'Sức khỏe', icon: HeartPulse,     color: '#8FD3B6', type: 'expense' },
  fun:       { id: 'fun',       label: 'Giải trí', icon: Gamepad2,       color: '#F2D07A', type: 'expense' },
  other:     { id: 'other',     label: 'Khác',     icon: MoreHorizontal, color: '#B8BDD0', type: 'expense' },
  // Thu nhập
  salary:       { id: 'salary',       label: 'Lương',   icon: Wallet,   color: '#8FD3B6', type: 'income' },
  other_income: { id: 'other_income', label: 'Thu khác', icon: Banknote, color: '#A5B1F5', type: 'income' },
};

export const getCategory = (id) => CATEGORIES[id] ?? CATEGORIES.other;
export const categoriesByType = (type) =>
  Object.values(CATEGORIES).filter((c) => c.type === type);