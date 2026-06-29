import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import api from '../services/api';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Badge from '../components/Badge';
import HistorySkeleton from '../components/skeletons/HistorySkeleton';

export default function HistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const filterButtons = [
    { key: 'all', label: 'Semua' },
    { key: 'in', label: 'Top Up' },
    { key: 'out', label: 'Transfer' },
  ];

  if (loading) return (
    <PageLayout
      title="Riwayat"
      subtitle="Semua riwayat transaksi kamu"
    >
      <HistorySkeleton />
    </PageLayout>
  );

  return (
    <PageLayout
      title="Riwayat"
      subtitle="Semua riwayat transaksi kamu"
    >
      {/* Filter Chips */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-sm)',
        marginBottom: 'var(--space-lg)',
        overflowX: 'auto',
        paddingBottom: 'var(--space-xs)',
      }}>
        {filterButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
              background: filter === btn.key
                ? (btn.key === 'out' ? 'var(--color-danger)' : btn.key === 'in' ? 'var(--color-primary)' : 'var(--color-text-primary)')
                : 'var(--color-bg)',
              color: filter === btn.key ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-medium)',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

        <Card padding="0" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-semibold)',
                  textTransform: 'uppercase',
                  background: 'var(--color-surface)',
                }}>
                  Tanggal
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-semibold)',
                  textTransform: 'uppercase',
                  background: 'var(--color-surface)',
                }}>
                  Jenis
                </th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'right',
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-semibold)',
                  textTransform: 'uppercase',
                  background: 'var(--color-surface)',
                }}>
                  Nominal
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ padding: 'var(--space-xl) var(--space-md)', textAlign: 'center' }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--space-sm)',
                    }}>
                      <Clock size={40} color="#94A3B8" />
                      <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)' }}>
                        Kamu belum punya transaksi.
                      </p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                        Mulai dengan Top Up saldo kamu!
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isIncome = tx.type === 'in';
                  const sign = isIncome ? '+' : '-';

                  return (
                    <tr
                      key={tx.id}
                      style={{
                        borderBottom: '1px solid var(--color-surface)',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{
                        padding: '14px 16px',
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--text-sm)',
                        whiteSpace: 'nowrap',
                      }}>
                        {new Date(tx.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <Badge type={isIncome ? 'topup' : 'transfer_out'} />
                      </td>
                      <td style={{
                        padding: '14px 16px',
                        textAlign: 'right',
                        color: isIncome ? 'var(--color-primary)' : 'var(--color-danger)',
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-semibold)',
                        whiteSpace: 'nowrap',
                      }}>
                        {sign}Rp {new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0 }).format(tx.amount)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </Card>
    </PageLayout>
  );
}
