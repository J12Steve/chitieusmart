import { toISODate } from '../utils/formatDate';

// Hạn mức ngân sách mặc định (VND / tháng) cho từng danh mục chi tiêu
export const DEFAULT_BUDGETS = {
  food: 3000000,
  transport: 1000000,
  shopping: 1500000,
  bills: 2000000,
  health: 500000,
  fun: 800000,
};

// monthOffset: 0 = tháng này, -1 = tháng trước.
// Với tháng này, ngày bị chặn ở "hôm nay" để không sinh giao dịch trong tương lai.
function dateIn(monthOffset, day) {
  const now = new Date();
  const maxDay = monthOffset === 0 ? now.getDate() : 28;
  return toISODate(new Date(now.getFullYear(), now.getMonth() + monthOffset, Math.min(day, maxDay)));
}

export function buildSeedTransactions() {
  const rows = [
    // [tháng, ngày, loại, danh mục, số tiền, ghi chú]
    [0, 1, 'income', 'salary', 15000000, 'Lương tháng'],
    [0, 1, 'expense', 'bills', 850000, 'Tiền điện'],
    [0, 1, 'expense', 'food', 45000, 'Phở sáng'],
    [0, 2, 'expense', 'transport', 120000, 'Đổ xăng'],
    [0, 2, 'expense', 'shopping', 590000, 'Áo thun'],
    [0, 2, 'expense', 'food', 180000, 'Cà phê & cơm trưa'],
    [0, 2, 'expense', 'fun', 150000, 'Xem phim'],
    [-1, 1, 'income', 'salary', 15000000, 'Lương tháng trước'],
    [-1, 3, 'expense', 'bills', 2100000, 'Tiền nhà & internet'],
    [-1, 5, 'expense', 'food', 320000, 'Ăn tối cùng bạn'],
    [-1, 8, 'expense', 'transport', 200000, 'Grab'],
    [-1, 12, 'expense', 'shopping', 1250000, 'Giày'],
    [-1, 15, 'income', 'other_income', 1500000, 'Làm thêm'],
    [-1, 18, 'expense', 'health', 400000, 'Khám sức khỏe'],
    [-1, 22, 'expense', 'food', 780000, 'Siêu thị'],
    [-1, 25, 'expense', 'fun', 500000, 'Du lịch cuối tuần'],
  ];

  return rows.map(([m, d, type, category, amount, note], i) => ({
    id: `seed-${i}`, type, category, amount, note, date: dateIn(m, d),
  }));
}