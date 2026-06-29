import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeftRight, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Beranda', icon: Home },
    { path: '/transaksi', label: 'Transaksi', icon: ArrowLeftRight },
    { path: '/history', label: 'Riwayat', icon: Clock },
    { path: '/profile', label: 'Profil', icon: User },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '390px',
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '0.75rem 0',
      zIndex: 50
    }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: isActive ? '#10b981' : '#9CA3AF',
              position: 'relative'
            }}
          >
            <Icon size={24} />
            <span style={{ fontSize: '0.7rem', marginTop: '0.25rem', fontWeight: isActive ? 600 : 400 }}>
              {item.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="bottom-nav-indicator"
                style={{
                  position: 'absolute',
                  top: '-12px',
                  width: '24px',
                  height: '3px',
                  backgroundColor: '#10b981',
                  borderRadius: '2px'
                }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
