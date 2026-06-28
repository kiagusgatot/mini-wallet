import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpCircle, ArrowDownCircle, Clock } from 'lucide-react';
import api from '../services/api';
import PageTransition from '../components/PageTransition';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <PageTransition>
      <div className="flex items-center mb-6 pt-2">
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#f1f5f9', fontSize: '1.2rem', padding: '0.5rem', marginLeft: '-0.5rem' }}>
          ←
        </button>
        <h1 className="font-bold text-white ml-2" style={{ fontSize: '1.2rem' }}>Riwayat Transaksi</h1>
      </div>

      {loading ? (
        <p className="text-center text-muted">Memuat riwayat...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <Clock size={48} color="#334155" style={{ margin: '0 auto 1rem' }} />
              <p className="text-muted">Belum ada transaksi</p>
            </div>
          ) : (
            transactions.map((tx) => (
              <div key={tx.id} className="card flex items-center justify-between" style={{ padding: '1rem' }}>
                <div className="flex items-center gap-4">
                  <div style={{
                    width: 44, height: 44, borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: tx.type === 'in' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    color: tx.type === 'in' ? '#10b981' : '#ef4444'
                  }}>
                    {tx.type === 'in' ? <ArrowDownCircle size={24} /> : <ArrowUpCircle size={24} />}
                  </div>
                  <div>
                    <p className="font-medium text-white" style={{ fontSize: '0.95rem' }}>
                      {tx.type === 'in' ? 'Top Up Saldo' : 'Transfer Keluar'}
                    </p>
                    <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
                      {new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className={`font-bold ${tx.type === 'in' ? 'text-primary' : 'text-danger'}`} style={{ fontSize: '0.95rem' }}>
                    {tx.type === 'in' ? '+' : '-'}{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(tx.amount)}
                  </p>
                  {tx.description && (
                    <p className="text-muted" style={{ fontSize: '0.7rem', marginTop: '0.2rem' }}>{tx.description}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </PageTransition>
  );
}
