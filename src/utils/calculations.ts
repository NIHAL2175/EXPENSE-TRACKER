import { Transaction, TransactionSummary, CategoryData } from '../types';
import { getCategoryColor } from './categories';

export const calculateSummary = (transactions: Transaction[]): TransactionSummary => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  return {
    totalIncome,
    totalExpenses,
    netIncome: totalIncome - totalExpenses
  };
};

export const getCategoryBreakdown = (transactions: Transaction[]): CategoryData[] => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  if (totalExpenses === 0) return [];
  
  const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalExpenses) * 100,
      color: getCategoryColor(category)
    }))
    .sort((a, b) => b.amount - a.amount);
};