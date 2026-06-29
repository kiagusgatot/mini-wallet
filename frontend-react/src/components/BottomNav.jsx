import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowLeftRight, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Beranda', icon: Home },
    { path: '/transfer', label: 'Transfer', icon: ArrowLeftRight },
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
              textDecoration: 'none',
              gap: '4px',
              paddingBottom: '4px',
            }}
          >
            <Icon
              size={22}
              color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'}
            />
            <span style={{
              fontSize: 'var(--text-xs)',
              fontWeight: isActive ? 'var(--font-semibold)' : 'var(--font-regular)',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
            }}>
              {item.label}
            </span>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '24px' }}
                transition={{ duration: 0.2 }}
                style={{
                  height: '3px',
                  borderRadius: '9999px',
                  background: 'var(--color-primary)',
                  marginTop: '2px',
                }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
