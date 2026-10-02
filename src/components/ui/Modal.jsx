import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import GlassButton from './GlassButton';
import { overlayVariants, slideOverVariants } from '../../utils/motion';

export default function Modal({ isOpen, onClose, title, children }) {
  const panelRef = useRef(null);

  // Giữ onClose mới nhất trong ref → effect bên dưới chỉ phụ thuộc `isOpen`.
  // Nếu không, mỗi lần cha render lại (vd: gõ phím) effect sẽ chạy lại và cướp focus.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement;

    const onKeyDown = (e) => e.key === 'Escape' && onCloseRef.current();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden'; // khóa cuộn trang phía sau
    panelRef.current?.focus();               // đưa focus vào panel (hỗ trợ bàn phím)

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();          // trả focus về nút đã mở modal
    };
  }, [isOpen]);

  // Portal: render ra <body> để không bị cắt bởi overflow/transform của cha.
  // Hai phần tử bên dưới là con TRỰC TIẾP của AnimatePresence (có key)
  // → animation thoát (exit) mới chạy được trước khi bị gỡ khỏi DOM.
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      {isOpen && (
        <motion.aside
          key="panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          variants={slideOverVariants} // trượt từ phải vào bằng spring mềm
          initial="initial"
          animate="animate"
          exit="exit"
          className="glass-strong fixed right-0 top-0 z-40 flex h-full w-full max-w-md flex-col rounded-l-glass p-6 outline-none"
        >
          <header className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>
            <GlassButton variant="glass" size="icon" onClick={onClose} aria-label="Đóng">
              <X size={18} />
            </GlassButton>
          </header>
          <div className="mt-6 flex-1 overflow-y-auto">{children}</div>
        </motion.aside>
      )}
    </AnimatePresence>,
    document.body
  );
}