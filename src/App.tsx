import React, { useState, useEffect } from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';
import { Transaction } from './types';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Summary } from './components/Summary';
import { FilterControls } from './components/FilterControls';
import { CategoryChart } from './components/CategoryChart';
import {
  saveTransactions,
  loadTransactions,
  exportTransactions,
  importTransactions
} from './utils/storage';
import { calculateSummary, getCategoryBreakdown } from './utils/calculations';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const savedTransactions = loadTransactions();
    setTransactions(savedTransactions);
  }, []);

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // Filter transactions based on selected category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredTransactions(
        transactions.filter(t => t.category === selectedCategory)
      );
    } else {
      setFilteredTransactions(transactions);
    }
  }, [transactions, selectedCategory]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      createdAt: Date.now()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    showNotification('Transaction added successfully!', 'success');
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev =>
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
    setEditingTransaction(undefined);
    showNotification('Transaction updated successfully!', 'success');
  };

  const deleteTransaction = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      showNotification('Transaction deleted successfully!', 'success');
    }
  };

  const handleExport = () => {
    exportTransactions(transactions);
    showNotification('Data exported successfully!', 'success');
  };

  const handleImport = async (file: File) => {
    try {
      const importedTransactions = await importTransactions(file);
      setTransactions(prev => [...importedTransactions, ...prev]);
      showNotification('Data imported successfully!', 'success');
    } catch (error) {
      showNotification('Failed to import data. Please check the file format.', 'error');
    }
  };

  const summary = calculateSummary(transactions);
  const categoryData = getCategoryBreakdown(transactions);

  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
              <p className="text-gray-600">Take control of your finances</p>
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <AlertCircle className="w-5 h-5" />
          {notification.message}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Summary Cards */}
          <Summary summary={summary} />

          {/* Filter Controls */}
          <FilterControls
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onExport={handleExport}
            onImport={handleImport}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Transaction Form */}
            <div className="lg:col-span-1">
              <TransactionForm
                onAddTransaction={addTransaction}
                editingTransaction={editingTransaction}
                onUpdateTransaction={updateTransaction}
                onCancelEdit={() => setEditingTransaction(undefined)}
              />
            </div>

            {/* Transaction List and Chart */}
            <div className="lg:col-span-2 space-y-8">
              {/* Category Chart */}
              <CategoryChart categoryData={categoryData} />

              {/* Transaction List */}
              <TransactionList
                transactions={sortedTransactions}
                onEditTransaction={setEditingTransaction}
                onDeleteTransaction={deleteTransaction}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;