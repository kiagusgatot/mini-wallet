import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import PageTransition from '../components/PageTransition';
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
    <PageTransition>
      <div className="flex items-center mb-8 pt-2">
        <h1 className="font-bold text-dark" style={{ fontSize: '1.5rem' }}>Profil</h1>
      </div>

      <div className="card text-center mb-6" style={{ padding: '2rem 1.5rem' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', backgroundColor: 'rgba(16,185,129,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981',
          margin: '0 auto 1rem'
        }}>
          <UserIcon size={40} />
        </div>
        <h2 className="font-bold text-dark mb-1" style={{ fontSize: '1.25rem' }}>{user?.name || 'Memuat...'}</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{user?.email}</p>
        <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>@{user?.username}</p>
      </div>

      <div className="card p-0" style={{ overflow: 'hidden', padding: 0 }}>
        <motion.button
          whileTap={{ backgroundColor: 'rgba(239,68,68,0.1)' }}
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            background: 'transparent',
            border: 'none',
            color: '#ef4444',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          <div className="flex items-center gap-3">
            <LogOut size={20} />
            Keluar Akun
          </div>
        </motion.button>
      </div>
    </PageTransition>
  );
}
