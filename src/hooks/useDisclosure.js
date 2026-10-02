import { useCallback, useState } from 'react';

// Quản lý đóng/mở (modal, dropdown...). Các hàm ổn định (useCallback)
// nên truyền xuống con không gây render lại thừa.
export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  return { isOpen, open, close, toggle };
}