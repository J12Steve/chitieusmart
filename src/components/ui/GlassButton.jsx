import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { springSnappy } from '../../utils/motion';

// Nút chính dùng chữ tối (text-ink) trên nền brand để đạt độ tương phản đọc được,
// chữ trắng trên màu pastel sẽ bị mờ.
const VARIANTS = {
  primary: 'bg-brand-500 text-ink shadow-glass hover:bg-brand-400',
  glass: 'glass glass-interactive text-ink',
};
const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-3',
  icon: 'h-10 w-10',
};

export default function GlassButton({
  variant = 'primary', size = 'md', type = 'button', className, children, ...props
}) {
  return (
    <motion.button
      type={type}
      // Phóng nhẹ khi hover, "lún" khi nhấn; cùng một spring cho cảm giác nhất quán
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={springSnappy}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors',
        'focus-ring disabled:pointer-events-none disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}