import { Plus } from 'lucide-react';
import { GlassButton } from '../../../components/ui';

// Trên mobile chỉ hiện icon; aria-label giữ cho screen reader vẫn đọc được tên nút.
export default function AddTransactionButton({ onClick }) {
  return (
    <GlassButton onClick={onClick} aria-label="Thêm giao dịch">
      <Plus size={18} />
      <span className="hidden sm:inline">Thêm giao dịch</span>
    </GlassButton>
  );
}