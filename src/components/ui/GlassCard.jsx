import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { hoverLift } from '../../utils/motion';

// `as`: đổi thẻ HTML ('section', 'li'...). `strong`: kính đục hơn (card nổi bật).
// `interactive`: nhấc nhẹ khi hover bằng spring + đổi bóng/nền bằng CSS.
// Các prop còn lại (variants, initial, animate...) chuyển thẳng cho motion
// để card tham gia hiệu ứng stagger của danh sách.
export default function GlassCard({
  as = 'div', strong = false, interactive = false, className, children, ...props
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(
        'rounded-glass p-6',
        strong ? 'glass-strong' : 'glass',
        interactive && 'glass-interactive cursor-pointer',
        className
      )}
      whileHover={interactive ? hoverLift : undefined}
      {...props}
    >
      {children}
    </MotionTag>
  );
}