import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import WalletCard from '../components/WalletCard';
import TopUpForm from '../components/TopUpForm';
import TransferForm from '../components/TransferForm';
import TransactionTable from '../components/TransactionTable';

export default function DashboardPage() {
  const navigate              = useNavigate();
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [walletRes, txRes] = await Promise.all([
        api.get('/wallet'),
        api.get('/transactions'),
      ]);
      setBalance(walletRes.data.balance);
      setTransactions(txRes.data.transactions);
    } catch {
      // 401 ditangani oleh interceptor di api.js
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } finally {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  if (loading) {
    return <div className="loading">Memuat data...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Mini Wallet</h1>
        <button onClick={handleLogout} className="btn btn-outline btn-sm">
          Keluar
        </button>
      </header>

      <main className="dashboard-content">
        <WalletCard balance={balance} />

        <div className="forms-grid">
          <TopUpForm onSuccess={fetchData} />
          <TransferForm onSuccess={fetchData} />
        </div>

        <TransactionTable transactions={transactions} />
      </main>
    </div>
  );
}
