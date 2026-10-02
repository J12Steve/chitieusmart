import { Modal } from '../../../components/ui';
import { useTransactions } from '../hooks/useTransactions';
import TransactionForm from './TransactionForm';

// Modal chỉ render nội dung khi mở → mỗi lần mở, form được tạo mới và trống.
export default function AddTransactionModal({ isOpen, onClose }) {
  const { addTransaction } = useTransactions();

  const handleSubmit = (data) => {
    addTransaction(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Thêm giao dịch">
      <TransactionForm onSubmit={handleSubmit} onCancel={onClose} />
    </Modal>
  );
}