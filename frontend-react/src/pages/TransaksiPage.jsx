import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, Send } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const TransaksiPage = () => {
  const navigate = useNavigate();

  const menus = [
    {
      icon: <Wallet size={24} />,
      judul: 'Top Up',
      subjudul: 'Tambah saldo ke wallet kamu',
      route: '/topup',
    },
    {
      icon: <Send size={24} />,
      judul: 'Transfer',
      subjudul: 'Kirim saldo ke pengguna lain',
      route: '/transfer',
    },
  ];

  return (
    <PageLayout
      title="Transaksi"
      subtitle="Pilih jenis transaksi"
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
      }}>
        {menus.map((menu) => (
          <motion.div
            key={menu.route}
            onClick={() => navigate(menu.route)}
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
            transition={{ duration: 0.15 }}
            style={{
              background: 'var(--color-bg)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              minWidth: '48px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              flexShrink: 0,
            }}>
              {menu.icon}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: 'var(--text-md)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-text-primary)',
                marginBottom: '2px',
              }}>
                {menu.judul}
              </p>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-secondary)',
              }}>
                {menu.subjudul}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
};

export default TransaksiPage;
