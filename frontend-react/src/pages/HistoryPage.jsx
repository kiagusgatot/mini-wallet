import { useState, useEffect } from 'react';

import { Clock } from 'lucide-react';
import api from '../services/api';
import PageTransition from '../components/PageTransition';
import PageLayout from '../components/PageLayout';

export default function HistoryPage() {

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



  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });



  return (
    <PageTransition>
      <PageLayout
        title="Riwayat"
        subtitle="Semua riwayat transaksi kamu"
        showBack={false}
      >

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
        <div style={{ width: '100%', overflowX: 'auto', background: '#FFFFFF', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '350px' }}>
            <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <tr>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#6B7280', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Tanggal</th>
                <th className="hide-on-mobile" style={{ padding: '12px 16px', textAlign: 'left', color: '#6B7280', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Keterangan</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#6B7280', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Jenis</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', color: '#6B7280', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }}>Nominal</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                    <div className="flex" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Clock size={40} color="#9CA3AF" style={{ marginBottom: '0.5rem' }} />
                      <p className="text-muted" style={{ fontSize: '14px', marginBottom: '4px' }}>Kamu belum punya transaksi.</p>
                      <p className="text-muted" style={{ fontSize: '14px' }}>Mulai dengan Top Up saldo kamu!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isIncome = tx.type === 'in';
                  const sign = isIncome ? '+' : '-';
                  
                  // Keterangan / Title
                  const title = isIncome ? 'Top-up saldo' : 'Transfer Keluar';
                  const keterangan = tx.description || title;

                  // Badge style
                  const badgeBg = isIncome ? '#D1FAE5' : '#FEE2E2';
                  const badgeColor = isIncome ? '#059669' : '#DC2626';
                  const badgeIcon = isIncome ? '🟢' : '🔴';
                  const badgeText = isIncome ? 'Top Up' : 'Keluar';

                  return (
                    <tr 
                      key={tx.id} 
                      style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.2s', cursor: 'default' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '14px 16px', color: '#6B7280', fontSize: '13px', whiteSpace: 'nowrap' }}>
                        {new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}, {new Date(tx.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '.')}
                      </td>
                      <td className="hide-on-mobile" style={{ padding: '14px 16px', color: '#1A1A2E', fontSize: '14px', whiteSpace: 'nowrap' }}>
                        {keterangan}
                      </td>
                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <span style={{ background: badgeBg, color: badgeColor, padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          {badgeIcon} {badgeText}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right', color: isIncome ? '#10b981' : '#EF4444', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {sign}Rp {new Intl.NumberFormat('id-ID', { minimumFractionDigits: 0 }).format(tx.amount)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
      </PageLayout>
    </PageTransition>
  );
}
