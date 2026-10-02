import { createContext, useContext } from 'react';

export const TransactionsContext = createContext(null);

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error('useTransactions phải được dùng bên trong <TransactionsProvider>');
  return ctx; // { transactions, addTransaction, deleteTransaction }
}