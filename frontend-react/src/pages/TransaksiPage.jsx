import { useNavigate } from 'react-router-dom';
import { Wallet, Send, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function TransaksiPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="flex flex-col h-full" style={{ padding: '0 0.5rem', background: '#F5F5F7' }}>
        <div className="mb-6 pt-2">
          <h1 className="font-bold text-dark" style={{ fontSize: '1.25rem' }}>Transaksi</h1>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginTop: '4px' }}>Pilih jenis transaksi</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/topup')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              border: '1.5px solid #10b981',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              cursor: 'pointer'
            }}
          >
            <div className="flex items-center gap-4">
              <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '12px', borderRadius: '12px' }}>
                <Wallet size={24} />
              </div>
              <div>
                <h3 className="font-bold text-dark" style={{ fontSize: '1rem', marginBottom: '2px' }}>Top Up</h3>
                <p className="text-muted" style={{ fontSize: '0.8rem' }}>Tambah saldo ke wallet kamu</p>
              </div>
            </div>
            <ChevronRight size={24} color="#6B7280" />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/transfer')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              border: '1.5px solid #10b981',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              cursor: 'pointer'
            }}
          >
            <div className="flex items-center gap-4">
              <div style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '12px', borderRadius: '12px' }}>
                <Send size={24} />
              </div>
              <div>
                <h3 className="font-bold text-dark" style={{ fontSize: '1rem', marginBottom: '2px' }}>Transfer</h3>
                <p className="text-muted" style={{ fontSize: '0.8rem' }}>Kirim saldo ke pengguna lain</p>
              </div>
            </div>
            <ChevronRight size={24} color="#6B7280" />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
