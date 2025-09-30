import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { TransactionSummary } from '../types';

interface SummaryProps {
  summary: TransactionSummary;
}

export const Summary: React.FC<SummaryProps> = ({ summary }) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Income</p>
            <p className="text-2xl font-bold text-green-600">
              {formatAmount(summary.totalIncome)}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">
              {formatAmount(summary.totalExpenses)}
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Net Balance</p>
            <p className={`text-2xl font-bold ${
              summary.netIncome >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatAmount(summary.netIncome)}
            </p>
          </div>
          <div className={`p-3 rounded-full ${
            summary.netIncome >= 0 
              ? 'bg-green-100' 
              : 'bg-red-100'
          }`}>
            <DollarSign className={`w-6 h-6 ${
              summary.netIncome >= 0 ? 'text-green-600' : 'text-red-600'
            }`} />
          </div>
        </div>
      </div>
    </div>
  );
};