import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import PageLayout from '../components/PageLayout';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/user').then(res => setUser(res.data.user)).catch(err => console.error(err));
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      console.error(e);
    } finally {
      logout();
      navigate('/');
    }
  };

  return (
    <PageLayout noPadding>
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'var(--color-bg)',
        boxShadow: '0 1px 0 var(--color-border)',
        padding: '16px var(--app-padding-x)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <BackButton to="/dashboard" />
        <div>
          <h1 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-text-primary)',
            margin: 0,
            marginBottom: '2px',
          }}>
            Profil
          </h1>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            margin: 0,
          }}>
            Informasi akun kamu
          </p>
        </div>
      </div>

      <div style={{ padding: 'var(--space-lg) var(--app-padding-x)' }}>
        {/* User Info Card */}
      <Card style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-primary-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary)',
          margin: '0 auto var(--space-md)',
        }}>
          <UserIcon size={40} aria-hidden="true" />
        </div>
        <h2 style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-xs)',
        }}>
          {user?.name || 'Memuat...'}
        </h2>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
        }}>
          {user?.email}
        </p>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
          marginTop: 'var(--space-xs)',
        }}>
          @{user?.username}
        </p>
      </Card>

      {/* Logout */}
      <Card padding="0" style={{ overflow: 'hidden' }}>
        <motion.button
          aria-label="Keluar dari akun"
          whileTap={{ backgroundColor: '#FEE2E2' }}
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-md)',
            padding: '16px 20px',
            background: 'transparent',
            color: 'var(--color-danger)',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-medium)',
          }}
        >
          <LogOut size={20} />
          Keluar Akun
        </motion.button>
      </Card>
      </div>
    </PageLayout>
  );
}
