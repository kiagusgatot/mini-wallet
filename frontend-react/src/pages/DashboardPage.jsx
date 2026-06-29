import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Plus, Send, User as UserIcon } from 'lucide-react';
import api from '../services/api';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import AnimatedCounter from '../components/AnimatedCounter';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import DashboardSkeleton from '../components/skeletons/DashboardSkeleton';

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
            console.error(e);
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
      
      arr.push({ day: dayName, amount: totalAmount });
    }
    return arr;
  }, [data.transactions]);

  const totalTujuhHari = chartData.reduce(
    (acc, item) => acc + (item.amount || 0), 
    0
  );

  const recentTransactions = data.transactions.slice(0, 5);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  if (loading) return (
    <PageLayout
      title="Halo 👋"
      subtitle="Menyiapkan data kamu..."
      stickyHeader={false}
    >
      <DashboardSkeleton />
    </PageLayout>
  );

  return (
    <PageLayout
      title={`Halo, ${data.user?.name ?? 'Pengguna'} 👋`}
      subtitle="Selamat datang kembali"
      stickyHeader={false}
      rightElement={
        <button
          onClick={() => navigate('/profile')}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <UserIcon size={20} />
        </button>
      }
    >
      {/* Balance Card */}
      <Card style={{ marginBottom: 'var(--space-lg)' }}>
        <p style={{
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-medium)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-sm)',
        }}>
          Total Saldo
        </p>
        <h2 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.03em',
          marginBottom: 'var(--space-lg)',
        }}>
          <AnimatedCounter value={data.wallet?.balance || 0} />
        </h2>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--color-border)',
          paddingTop: 'var(--space-md)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              minWidth: '40px',
              minHeight: '40px',
              maxWidth: '40px',
              maxHeight: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              flexGrow: 0,
              boxSizing: 'border-box',
              aspectRatio: '1 / 1',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
            }}>
              <ArrowDown size={16} />
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Pemasukan</p>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-primary)' }}>
                {formatCurrency(income)}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              minWidth: '40px',
              minHeight: '40px',
              maxWidth: '40px',
              maxHeight: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              flexGrow: 0,
              boxSizing: 'border-box',
              aspectRatio: '1 / 1',
              background: 'var(--color-danger-light)',
              color: 'var(--color-danger)',
            }}>
              <ArrowUpRight size={16} />
            </div>
            <div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Pengeluaran</p>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-primary)' }}>
                {formatCurrency(expense)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/topup')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-sm)',
            background: 'var(--color-primary)',
            color: 'var(--color-text-inverse)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px',
            fontWeight: 'var(--font-semibold)',
            fontSize: 'var(--text-base)',
          }}
        >
          <Plus size={20} />
          <span>Top Up</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/transfer')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-sm)',
            background: 'var(--color-bg)',
            color: 'var(--color-primary)',
            border: '1.5px solid var(--color-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px',
            fontWeight: 'var(--font-semibold)',
            fontSize: 'var(--text-base)',
          }}
        >
          <Send size={20} />
          <span>Transfer</span>
        </motion.button>
      </div>

      {/* 7-Day Activity */}
      <div style={{
        background: 'var(--color-bg)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--color-border)',
        marginBottom: 'var(--space-md)',
      }}>

        {/* Header Card */}
        <div style={{
          padding: '16px 20px 12px 20px',
        }}>
          <p style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-medium)',
            color: 'var(--color-text-secondary)',
            margin: 0,
            marginBottom: '4px',
          }}>
            Aktivitas 7 Hari
          </p>
          <p style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-text-primary)',
            margin: 0,
          }}>
            Rp {totalTujuhHari.toLocaleString('id-ID')}
          </p>
          <p style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            margin: '2px 0 0 0',
          }}>
            Total transaksi 7 hari terakhir
          </p>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'var(--color-border)',
          margin: '0 20px',
        }} />

        {/* Chart Area */}
        <div style={{
          padding: '16px 8px 8px 8px',
        }}>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart 
              data={chartData}
              margin={{ 
                top: 5, 
                right: 8, 
                left: 8, 
                bottom: 0 
              }}
              barSize={28}
            >
              <CartesianGrid 
                vertical={false} 
                horizontal={false} 
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ 
                  fill: 'var(--color-text-muted)', 
                  fontSize: 11,
                  fontFamily: 'Plus Jakarta Sans',
                }}
              />
              <Tooltip
                cursor={{ 
                  fill: 'var(--color-surface)',
                  radius: 8,
                }}
                formatter={(value) => [
                  `Rp ${value.toLocaleString('id-ID')}`,
                  'Transaksi'
                ]}
                contentStyle={{
                  background: 'var(--color-text-primary)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'var(--color-text-inverse)',
                  fontSize: '12px',
                  padding: '8px 12px',
                }}
                labelStyle={{
                  color: 'var(--color-text-muted)',
                  fontSize: '11px',
                }}
              />
              <Bar
                dataKey="amount"
                fill="var(--color-primary)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <Card style={{ marginBottom: 'var(--space-md)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-md)',
        }}>
          <h3 style={{
            fontSize: 'var(--text-md)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-text-primary)',
          }}>
            Transaksi Terbaru
          </h3>
          <button
            onClick={() => navigate('/history')}
            style={{
              background: 'none',
              color: 'var(--color-primary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)',
            }}
          >
            Lihat Semua
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {recentTransactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-lg) 0' }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                Kamu belum punya transaksi.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                Mulai dengan Top Up saldo kamu!
              </p>
            </div>
          ) : (
            recentTransactions.map((tx) => {
              const isIncome = tx.type === 'in';
              const sign = isIncome ? '+' : '-';
              const title = isIncome ? 'Top Up' : 'Transfer';
              
              return (
                <div key={tx.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-sm) 0',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isIncome ? 'var(--color-primary-light)' : 'var(--color-danger-light)',
                      color: isIncome ? 'var(--color-primary)' : 'var(--color-danger)',
                      fontWeight: 'var(--font-bold)',
                      fontSize: 'var(--text-lg)',
                    }}>
                      {title.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p style={{
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--text-base)',
                      }}>
                        {title}
                      </p>
                      <p style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                        marginTop: '2px',
                      }}>
                        {new Date(tx.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <p style={{
                    fontWeight: 'var(--font-bold)',
                    color: isIncome ? 'var(--color-primary)' : 'var(--color-danger)',
                    fontSize: 'var(--text-base)',
                  }}>
                    {sign}{formatCurrency(tx.amount)}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </PageLayout>
  );
}
