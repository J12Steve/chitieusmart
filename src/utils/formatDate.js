// Ngày dạng 'YYYY-MM-DD' theo GIỜ ĐỊA PHƯƠNG.
// Không dùng toISOString() vì nó đổi sang UTC và có thể lệch ngày.
export function toISODate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// '2026-10-02' → '02/10/2026'
export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// '2026-10' dùng để lọc giao dịch theo tháng
export const currentMonthKey = () => toISODate().slice(0, 7);