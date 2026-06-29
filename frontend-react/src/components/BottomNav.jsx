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
      maxWidth: 'var(--app-max-width)',
      height: 'var(--bottom-nav-height)',
      background: 'var(--color-bg)',
      borderTop: '1px solid var(--color-border)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      alignItems: 'center',
      zIndex: 50,
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
              justifyContent: 'center',
              textDecoration: 'none',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              position: 'relative',
              gap: 'var(--space-xs)',
            }}
          >
            <Icon size={22} />
            <span style={{
              fontSize: 'var(--text-xs)',
              fontWeight: isActive ? 'var(--font-semibold)' : 'var(--font-regular)',
            }}>
              {item.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="bottom-nav-indicator"
                style={{
                  position: 'absolute',
                  top: '-1px',
                  width: '24px',
                  height: '3px',
                  background: 'var(--color-primary)',
                  borderRadius: '2px',
                }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
