import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpCircle, ArrowDownCircle, ArrowRightLeft, Wallet } from 'lucide-react';
import api from '../services/api';
import PageTransition from '../components/PageTransition';
import AnimatedCounter from '../components/AnimatedCounter';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({ user: null, wallet: null, transactions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [walletRes, txRes, userRes] = await Promise.all([
          api.get('/wallet'),
          api.get('/transactions'),
          api.get('/user'),
        ]);
        setData({
          user: userRes.data.user,
          wallet: walletRes.data.wallet,
          transactions: txRes.data.transactions.slice(0, 3) // Only top 3
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="page-container flex items-center justify-center"><p className="text-primary">Loading...</p></div>;

  return (
    <PageTransition>
      <div className="flex items-center justify-between mb-6 pt-2">
        <div>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>Selamat datang,</p>
          <h1 className="font-bold text-white" style={{ fontSize: '1.2rem' }}>{data.user?.name}</h1>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
          {data.user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="card mb-6" style={{ background: 'linear-gradient(145deg, #18202B 0%, #111827 100%)', borderLeft: '4px solid #10b981', position: 'relative', overflow: 'hidden' }}>
        <Wallet size={120} style={{ position: 'absolute', right: -20, top: -10, opacity: 0.05, color: '#fff' }} />
        <p className="text-muted font-medium mb-1" style={{ fontSize: '0.85rem' }}>Total Saldo</p>
        <h2 className="font-bold text-primary" style={{ fontSize: '2.2rem', letterSpacing: '-0.02em' }}>
          <AnimatedCounter value={data.wallet?.balance || 0} />
        </h2>
      </div>

      <div className="flex gap-4 mb-8">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/topup')}
          className="card"
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}
        >
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '12px', color: '#10b981' }}>
            <ArrowUpCircle size={24} />
          </div>
          <span className="font-medium text-white" style={{ fontSize: '0.85rem' }}>Top Up</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/transfer')}
          className="card"
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}
        >
          <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.75rem', borderRadius: '12px', color: '#38bdf8' }}>
            <ArrowRightLeft size={24} />
          </div>
          <span className="font-medium text-white" style={{ fontSize: '0.85rem' }}>Transfer</span>
        </motion.button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-white">Transaksi Terakhir</h3>
        <button onClick={() => navigate('/history')} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '0.85rem', fontWeight: 500 }}>Lihat Semua</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {data.transactions.length === 0 ? (
          <p className="text-center text-muted py-4">Belum ada transaksi</p>
        ) : (
          data.transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between" style={{ padding: '0.5rem 0' }}>
              <div className="flex items-center gap-4">
                <div style={{
                  width: 40, height: 40, borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: tx.type === 'in' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  color: tx.type === 'in' ? '#10b981' : '#ef4444'
                }}>
                  {tx.type === 'in' ? <ArrowDownCircle size={20} /> : <ArrowUpCircle size={20} />}
                </div>
                <div>
                  <p className="font-medium text-white" style={{ fontSize: '0.9rem' }}>{tx.type === 'in' ? 'Top Up' : 'Transfer Keluar'}</p>
                  <p className="text-muted" style={{ fontSize: '0.75rem' }}>{new Date(tx.created_at).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              <p className={`font-semibold ${tx.type === 'in' ? 'text-primary' : 'text-danger'}`} style={{ fontSize: '0.9rem' }}>
                {tx.type === 'in' ? '+' : '-'}{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(tx.amount)}
              </p>
            </div>
          ))
        )}
      </div>
    </PageTransition>
  );
}
