import { motion } from 'framer-motion';
import { springSoft } from '../../utils/motion';

const OVER_COLOR = '#E8909F'; // hồng pastel khi vượt ngân sách (không dùng đỏ gắt)

export default function ProgressBar({ value, color = '#8B9CF0', isOver = false, label }) {
  const pct = Math.min(Math.max(value, 0), 100); // cắt thanh trong 0–100%

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className="h-3 w-full overflow-hidden rounded-full bg-white/50 ring-1 ring-inset ring-white/60"
    >
      {/* Thanh "đổ đầy" bằng spring từ 0 → pct, và co giãn mượt khi giá trị đổi */}
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: isOver ? OVER_COLOR : color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={springSoft}
      />
    </div>
  );
}