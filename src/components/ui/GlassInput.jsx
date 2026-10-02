import { forwardRef, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';

// Một component cho cả <input>, <select>, <textarea> qua prop `as`.
// Ví dụ: <GlassInput as="select" label="Danh mục"><option/>…</GlassInput>
const GlassInput = forwardRef(function GlassInput(
  { label, error, suffix, as: Tag = 'input', id, className, children, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink-soft">
          {label}
        </label>
      )}

      <div className="relative">
        <Tag
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'glass w-full rounded-2xl px-4 py-3 text-ink placeholder:text-ink-soft/60',
            'focus:bg-white/70 focus-ring',
            suffix && 'pr-12',
            error && 'border-expense/60',
            className
          )}
          {...props}
        >
          {children}
        </Tag>
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-soft">
            {suffix}
          </span>
        )}
      </div>

      {/* Thông báo lỗi trượt nhẹ vào/ra thay vì giật bật lên */}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-sm text-expense"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

export default GlassInput;