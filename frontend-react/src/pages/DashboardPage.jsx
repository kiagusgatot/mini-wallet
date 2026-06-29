import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, ArrowDown, ArrowUpRight, Plus, Send } from 'lucide-react';
import api from '../services/api';
import PageTransition from '../components/PageTransition';
import AnimatedCounter from '../components/AnimatedCounter';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
        let fetchedUser = userRes.data.user || userRes.data.data;
        if (!fetchedUser) {
          try {
            fetchedUser = JSON.parse(localStorage.getItem('user'));
          } catch (e) {
            // Ignore
          }
        }
        
        setData({
          user: fetchedUser,
          wallet: walletRes.data.wallet,
          transactions: txRes.data.transactions || []
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const income = useMemo(() => {
    return data.transactions.filter(t => t.type === 'in').reduce((sum, t) => sum + parseFloat(t.amount), 0);
  }, [data.transactions]);

  const expense = useMemo(() => {
    return data.transactions.filter(t => t.type === 'out').reduce((sum, t) => sum + parseFloat(t.amount), 0);
  }, [data.transactions]);

  const chartData = useMemo(() => {
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(d);
      
      const dayTx = data.transactions.filter(t => t.created_at.startsWith(dateStr));
      const totalAmount = dayTx.reduce((sum, t) => sum + parseFloat(t.amount), 0);
      
      arr.push({
        name: dayName,
        amount: totalAmount
      });
    }
    return arr;
  }, [data.transactions]);

  const recentTransactions = data.transactions.slice(0, 5);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.substring(0, 2).toUpperCase();
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  if (loading) return <div className="page-container flex items-center justify-center"><p className="text-primary">Loading...</p></div>;

  return (
    <PageTransition>
      <div className="flex items-center justify-between mb-6 pt-2">
        <div>
          <h1 className="font-bold text-dark" style={{ fontSize: '1.25rem' }}>Halo, {data.user?.name ?? 'Pengguna'} 👋</h1>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '4px' }}>Selamat datang kembali</p>
        </div>
      </div>

      <div className="card mb-6" style={{ padding: '1.5rem' }}>
        <p className="text-muted font-medium mb-2" style={{ fontSize: '0.9rem' }}>Total Saldo</p>
        <h2 className="font-bold text-dark mb-6" style={{ fontSize: '2.5rem', letterSpacing: '-0.03em' }}>
          <AnimatedCounter value={data.wallet?.balance || 0} />
        </h2>
        
        <div className="flex justify-between border-t" style={{ borderColor: '#E5E7EB', paddingTop: '1rem' }}>
          <div className="flex items-center gap-2">
            <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '6px', borderRadius: '50%' }}>
              <ArrowDown size={16} />
            </div>
            <div>
              <p className="text-muted" style={{ fontSize: '0.75rem' }}>Income</p>
              <p className="font-bold text-dark" style={{ fontSize: '0.9rem' }}>{formatCurrency(income)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '6px', borderRadius: '50%' }}>
              <ArrowUpRight size={16} />
            </div>
            <div>
              <p className="text-muted" style={{ fontSize: '0.75rem' }}>Expense</p>
              <p className="font-bold text-dark" style={{ fontSize: '0.9rem' }}>{formatCurrency(expense)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/topup')}
          className="btn"
          style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#10b981', color: '#fff', borderRadius: '14px' }}
        >
          <Plus size={20} />
          <span>Top Up</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/transfer')}
          className="btn"
          style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', color: '#10b981', border: '1px solid #10b981', borderRadius: '14px' }}
        >
          <Send size={20} />
          <span>Transfer</span>
        </motion.button>
      </div>

      <div className="card mb-4" style={{ padding: '20px', border: 'none' }}>
        <h3 className="font-bold text-dark mb-4" style={{ fontSize: '1rem' }}>Aktivitas 7 Hari</h3>
        <div style={{ width: '100%', height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6B7280' }} 
                tickFormatter={(val) => val >= 1000 ? `${val/1000}k` : val}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), "Nominal"]}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card mb-4" style={{ padding: '20px', border: 'none' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-dark" style={{ fontSize: '1rem' }}>Transaksi Terbaru</h3>
          <button onClick={() => navigate('/history')} style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>Lihat Semua</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recentTransactions.length === 0 ? (
            <p className="text-center text-muted py-4">Belum ada transaksi</p>
          ) : (
            recentTransactions.map((tx) => {
              const isIncome = tx.type === 'in';
              const avatarBg = isIncome ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)';
              const avatarColor = isIncome ? '#10b981' : '#ef4444';
              const sign = isIncome ? '+' : '-';
              const title = isIncome ? 'Top Up' : 'Transfer';
              
              return (
                <div key={tx.id} className="flex items-center justify-between" style={{ padding: '0.5rem 0' }}>
                  <div className="flex items-center gap-4">
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: avatarBg, color: avatarColor, fontWeight: 700, fontSize: '1.1rem'
                    }}>
                      {getInitials(title)}
                    </div>
                    <div>
                      <p className="font-bold text-dark" style={{ fontSize: '1rem' }}>{title}</p>
                      <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '2px' }}>{new Date(tx.created_at).toLocaleDateString('id-ID')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${isIncome ? 'text-primary' : 'text-danger'}`} style={{ fontSize: '1rem' }}>
                      {sign}{formatCurrency(tx.amount)}
                    </p>
                    <span style={{
                      display: 'inline-block',
                      background: avatarBg,
                      color: avatarColor,
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      marginTop: '4px'
                    }}>
                      {title}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </PageTransition>
  );
}
