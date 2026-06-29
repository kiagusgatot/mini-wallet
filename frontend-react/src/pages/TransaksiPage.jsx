import { useNavigate } from 'react-router-dom';
import { Wallet, Send, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

export default function TransaksiPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="flex flex-col h-full" style={{ padding: '20px', background: '#F5F5F7', maxWidth: '390px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <BackButton />
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A2E', margin: 0 }}>
            Transaksi
          </h1>
        </div>
        <p className="text-muted" style={{ fontSize: '14px', marginBottom: '24px', marginTop: '-12px', color: '#6B7280' }}>
          Pilih jenis transaksi
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <motion.div
            onClick={() => navigate('/topup')}
            whileHover={{ backgroundColor: '#F0FDF4', y: -2 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: '#FFFFFF',
              border: '1.5px solid #10b981',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ background: '#D1FAE5', borderRadius: '12px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
              <Wallet size={24} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1A1A2E', margin: '0 0 2px 0' }}>Top Up</h3>
              <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Tambah saldo ke wallet kamu</p>
            </div>
            <ChevronRight size={24} color="#10b981" style={{ marginLeft: 'auto' }} />
          </motion.div>

          <motion.div
            onClick={() => navigate('/transfer')}
            whileHover={{ backgroundColor: '#F0FDF4', y: -2 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              background: '#FFFFFF',
              border: '1.5px solid #10b981',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ background: '#D1FAE5', borderRadius: '12px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
              <Send size={24} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1A1A2E', margin: '0 0 2px 0' }}>Transfer</h3>
              <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Kirim saldo ke pengguna lain</p>
            </div>
            <ChevronRight size={24} color="#10b981" style={{ marginLeft: 'auto' }} />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
