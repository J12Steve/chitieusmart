import { useEffect, useState } from 'react';

// Giống useState nhưng tự đồng bộ với localStorage.
// `initialValue` có thể là hàm (lazy), chỉ chạy lần đầu khi chưa có dữ liệu lưu.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
    } catch {
      // dữ liệu hỏng hoặc bị chặn → dùng giá trị mặc định
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // đầy bộ nhớ / chế độ riêng tư → bỏ qua, app vẫn chạy bằng state
    }
  }, [key, value]);

  return [value, setValue];
}