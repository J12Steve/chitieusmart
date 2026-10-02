import { cn } from '../../utils/cn';

// Khối giữ chỗ khi đang tải dữ liệu. Dải sáng chạy ngang (keyframes `shimmer` trong tailwind.config.js).
// Dữ liệu hiện tại đọc từ localStorage nên gần như tức thì; Skeleton dùng khi bạn chuyển sang API/Firebase.
export default function Skeleton({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-shimmer rounded-xl bg-gradient-to-r from-white/30 via-white/70 to-white/30 bg-[length:200%_100%]',
        className
      )}
    />
  );
}