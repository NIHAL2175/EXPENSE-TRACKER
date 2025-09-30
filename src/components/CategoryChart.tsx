import React from 'react';
import { CategoryData } from '../types';
import { PieChart } from 'lucide-react';

interface CategoryChartProps {
  categoryData: CategoryData[];
}

export const CategoryChart: React.FC<CategoryChartProps> = ({ categoryData }) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (categoryData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <PieChart className="w-6 h-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Expense Breakdown</h3>
        </div>
        <div className="text-center text-gray-500">
          <p>No expense data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <PieChart className="w-6 h-6 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Expense Breakdown</h3>
      </div>

      <div className="space-y-4">
        {categoryData.map((item, index) => (
          <div key={item.category} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-gray-700">{item.category}</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">
                {formatAmount(item.amount)}
              </div>
              <div className="text-sm text-gray-500">
                {item.percentage.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex h-4 rounded-full overflow-hidden bg-gray-200">
          {categoryData.map((item, index) => (
            <div
              key={item.category}
              className="h-full transition-all duration-500"
              style={{
                backgroundColor: item.color,
                width: `${item.percentage}%`
              }}
              title={`${item.category}: ${item.percentage.toFixed(1)}%`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};