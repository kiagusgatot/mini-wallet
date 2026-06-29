import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, Send } from 'lucide-react';

const TransaksiPage = () => {
  const navigate = useNavigate();

  const menus = [
    {
      icon: <Wallet size={24} color="#10b981" />,
      judul: 'Top Up',
      subjudul: 'Tambah saldo ke wallet kamu',
      route: '/topup',
      bg: '#D1FAE5',
    },
    {
      icon: <Send size={24} color="#10b981" />,
      judul: 'Transfer',
      subjudul: 'Kirim saldo ke pengguna lain',
      route: '/transfer',
      bg: '#D1FAE5',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5F5F7',
      padding: '24px 20px',
      maxWidth: '390px',
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#1A1A2E',
          margin: 0,
          marginBottom: '4px',
        }}>
          Transaksi
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#6B7280',
          margin: 0,
        }}>
          Pilih jenis transaksi
        </p>
      </div>

      {/* Card Menu */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {menus.map((menu) => (
          <motion.div
            key={menu.route}
            onClick={() => navigate(menu.route)}
            whileTap={{ scale: 0.97 }}
            whileHover={{ 
              translateY: -2,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}
            transition={{ duration: 0.15 }}
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              border: '1.5px solid #E5E7EB',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Icon Container */}
            <div style={{
              width: '48px',
              height: '48px',
              minWidth: '48px',
              minHeight: '48px',
              borderRadius: '12px',
              background: menu.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {menu.icon}
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#1A1A2E',
                margin: 0,
                marginBottom: '2px',
              }}>
                {menu.judul}
              </p>
              <p style={{
                fontSize: '13px',
                color: '#6B7280',
                margin: 0,
              }}>
                {menu.subjudul}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransaksiPage;
