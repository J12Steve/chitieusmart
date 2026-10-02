import { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import { GlassCard } from '../../../components/ui';
import { formatCurrency } from '../../../utils/formatCurrency';
import { listItem } from '../../../utils/motion';

// Số "chạy" từ giá trị cũ → mới. Ghi thẳng vào DOM thay vì setState để tránh
// render lại React ~60 lần/giây. `children` là hằng số nên React không bao giờ
// ghi đè nội dung mà animation đang cập nhật.
function CountUp({ value }) {
  const ref = useRef(null);
  const current = useRef(0); // giá trị đang hiển thị, để animation bị ngắt vẫn tiếp tục mượt
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const controls = animate(current.current, value, {
      duration: reduceMotion ? 0 : 0.9,
      ease: 'easeOut', // đếm số dùng tween: spring với số lớn (hàng chục triệu) rất lâu mới "dừng"
      onUpdate: (v) => {
        current.current = v;
        if (ref.current) ref.current.textContent = formatCurrency(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [value, reduceMotion]);

  return <span ref={ref}>{formatCurrency(0)}</span>;
}

export default function BalanceCard({ balance }) {
  return (
    <GlassCard strong variants={listItem}>
      <p className="text-sm font-medium text-ink-soft">Số dư hiện tại</p>
      <p className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
        <CountUp value={balance} />
      </p>
    </GlassCard>
  );
}