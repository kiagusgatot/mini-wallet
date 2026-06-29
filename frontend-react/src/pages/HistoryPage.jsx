import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import api from '../services/api';
import PageTransition from '../components/PageTransition';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, in, out

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/transactions');
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.substring(0, 2).toUpperCase();
  };

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <PageTransition>
      <div className="flex items-center mb-6 pt-2">
        <h1 className="font-bold text-dark" style={{ fontSize: '1.2rem' }}>Riwayat Transaksi</h1>
      </div>

      <div className="flex gap-2 mb-6" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
        <button 
          onClick={() => setFilter('all')} 
          style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #E5E7EB', background: filter === 'all' ? '#1A1A2E' : '#FFFFFF', color: filter === 'all' ? '#FFFFFF' : '#6B7280', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Semua
        </button>
        <button 
          onClick={() => setFilter('in')} 
          style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #E5E7EB', background: filter === 'in' ? '#10b981' : '#FFFFFF', color: filter === 'in' ? '#FFFFFF' : '#6B7280', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Top Up
        </button>
        <button 
          onClick={() => setFilter('out')} 
          style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #E5E7EB', background: filter === 'out' ? '#ef4444' : '#FFFFFF', color: filter === 'out' ? '#FFFFFF' : '#6B7280', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Transfer
        </button>
      </div>

      {loading ? (
        <p className="text-center text-muted">Memuat riwayat...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <Clock size={48} color="#9CA3AF" style={{ margin: '0 auto 1rem' }} />
              <p className="text-muted">Belum ada transaksi</p>
            </div>
          ) : (
            filteredTransactions.map((tx) => {
              const isIncome = tx.type === 'in';
              const avatarBg = isIncome ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)';
              const avatarColor = isIncome ? '#10b981' : '#ef4444';
              const sign = isIncome ? '+' : '-';
              const title = isIncome ? 'Top Up' : 'Transfer';
              
              return (
                <div key={tx.id} className="card flex items-center justify-between" style={{ padding: '1rem' }}>
                  <div className="flex items-center gap-4">
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: avatarBg, color: avatarColor, fontWeight: 700, fontSize: '1.1rem'
                    }}>
                      {getInitials(title)}
                    </div>
                    <div>
                      <p className="font-bold text-dark" style={{ fontSize: '0.95rem' }}>
                        {title}
                      </p>
                      <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
                        {new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className={`font-bold ${isIncome ? 'text-primary' : 'text-danger'}`} style={{ fontSize: '0.95rem' }}>
                      {sign}{formatCurrency(tx.amount)}
                    </p>
                    {tx.description && (
                      <p className="text-muted" style={{ fontSize: '0.7rem', marginTop: '0.2rem' }}>{tx.description}</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </PageTransition>
  );
}
