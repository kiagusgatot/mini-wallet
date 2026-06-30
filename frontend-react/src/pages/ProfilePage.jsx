import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, Shield, Lock, Bell, Globe, Moon, ChevronRight, Activity, ArrowDown, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import PageLayout from '../components/PageLayout';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import BottomSheetModal from '../components/BottomSheetModal';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/user'),
      api.get('/transactions')
    ])
      .then(([userRes, txRes]) => {
        let fetchedUser = userRes.data.user || userRes.data.data;
        if (!fetchedUser) {
          try {
            fetchedUser = JSON.parse(localStorage.getItem('user'));
          } catch (e) {
            console.error(e);
          }
        }
        setUser(fetchedUser);
        setTransactions(txRes.data.transactions || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await api.post('/logout');
    } catch (e) {
      console.error(e);
    } finally {
      logout();
      setLogoutLoading(false);
      navigate('/');
    }
  };

  const totalTransactions = transactions.length;
  const totalTopUp = transactions
    .filter(tx => tx.type === 'topup')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
  const totalTransfer = transactions
    .filter(tx => tx.type === 'transfer_out')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const formatCurrency = (val) => {
    if (val >= 1000000) {
      return `Rp ${(val / 1000000).toFixed(1)}Jt`;
    } else if (val >= 10000) {
      return `Rp ${(val / 1000).toFixed(0)}rb`;
    }
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  const renderMenuItem = (icon, label, onClick, isDanger = false) => (
    <motion.button
      whileTap={{ backgroundColor: isDanger ? '#FEE2E2' : '#F8FAFC' }}
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        background: 'transparent',
        border: 'none',
        borderBottom: isDanger ? 'none' : '1px solid var(--color-surface)',
        color: isDanger ? 'var(--color-danger)' : 'var(--color-text-primary)',
        fontSize: 'var(--text-base)',
        fontWeight: 'var(--font-medium)',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        {icon}
        {label}
      </div>
      {!isDanger && <ChevronRight size={18} color="var(--color-text-muted)" />}
    </motion.button>
  );

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
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-primary)', margin: 0, marginBottom: '2px' }}>
            Profil
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
            Informasi dan pengaturan akun
          </p>
        </div>
      </div>

      <div style={{ padding: 'var(--space-lg) var(--app-padding-x)', paddingBottom: '40px' }}>
        {loading ? (
          <LoadingSpinner fullPage={true} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {/* User Info Card */}
            <Card style={{ textAlign: 'center' }}>
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
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                {user?.name || 'Pengguna'}
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                {user?.email}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-surface)', padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Username:</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)', color: 'var(--color-text-primary)' }}>@{user?.username}</span>
              </div>
            </Card>

            {/* Statistik Akun */}
            <div>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Statistik Akun
              </h3>
              <Card padding="0" style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--color-surface)' }}>
                  <div style={{ flex: 1, padding: '16px 8px', borderRight: '1px solid var(--color-surface)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Activity size={24} color="var(--color-primary)" style={{ marginBottom: '12px' }} />
                    <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-primary)', margin: '0 0 6px 0', lineHeight: '1.2' }}>{totalTransactions}</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.4' }}>Total<br/>Transaksi</p>
                  </div>
                  <div style={{ flex: 1, padding: '16px 8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ArrowDown size={24} color="var(--color-primary)" style={{ marginBottom: '12px' }} />
                    <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-primary)', margin: '0 0 6px 0', lineHeight: '1.2' }}>{formatCurrency(totalTopUp)}</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.4' }}>Total<br/>Top Up</p>
                  </div>
                  <div style={{ flex: 1, padding: '16px 8px', borderLeft: '1px solid var(--color-surface)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ArrowUpRight size={24} color="var(--color-danger)" style={{ marginBottom: '12px' }} />
                    <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-primary)', margin: '0 0 6px 0', lineHeight: '1.2' }}>{formatCurrency(totalTransfer)}</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.4' }}>Total<br/>Transfer</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Informasi Akun */}
            <div>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Informasi Akun
              </h3>
              <Card padding="16px">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Status Akun</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)' }}>
                      <CheckCircle2 size={16} />
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-semibold)' }}>Aktif</span>
                    </div>
                  </div>
                  <div style={{ height: '1px', background: 'var(--color-surface)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Email</span>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--color-text-primary)' }}>{user?.email}</span>
                  </div>
                  {user?.created_at && (
                    <>
                      <div style={{ height: '1px', background: 'var(--color-surface)' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Bergabung Sejak</span>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', color: 'var(--color-text-primary)' }}>
                          {new Date(user.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>

            {/* Keamanan */}
            <div>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Keamanan
              </h3>
              <Card padding="0" style={{ overflow: 'hidden' }}>
                {renderMenuItem(<Lock size={20} />, 'Ubah PIN', () => setShowComingSoon(true))}
                {renderMenuItem(<Shield size={20} />, 'Ubah Password', () => setShowComingSoon(true))}
              </Card>
            </div>

            {/* Pengaturan */}
            <div>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pengaturan
              </h3>
              <Card padding="0" style={{ overflow: 'hidden' }}>
                {renderMenuItem(<Bell size={20} />, 'Notifikasi', () => setShowComingSoon(true))}
                {renderMenuItem(<Globe size={20} />, 'Bahasa', () => setShowComingSoon(true))}
                {renderMenuItem(<Moon size={20} />, 'Mode Tampilan', () => setShowComingSoon(true))}
              </Card>
            </div>

            {/* Logout */}
            <Card padding="0" style={{ overflow: 'hidden', marginTop: 'var(--space-md)' }}>
              {renderMenuItem(<LogOut size={20} />, 'Keluar Akun', () => setShowLogoutModal(true), true)}
            </Card>
            
            {/* Version Footer */}
            <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)', opacity: 0.5 }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Mini Wallet v1.0.1
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      <BottomSheetModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Keluar dari Akun?"
        description="Kamu perlu login kembali untuk mengakses Mini Wallet."
        primaryLabel="Keluar"
        secondaryLabel="Batal"
        primaryAction={handleLogout}
        secondaryAction={() => setShowLogoutModal(false)}
        isLoading={logoutLoading}
      />

      {/* Coming Soon Modal */}
      <BottomSheetModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        primaryLabel="Oke, Mengerti"
        primaryAction={() => setShowComingSoon(false)}
      >
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', marginBottom: '16px' }}>
            <Activity size={32} />
          </div>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Fitur Segera Hadir
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
            Fitur ini sedang dalam tahap pengembangan dan akan segera tersedia pada update berikutnya.
          </p>
        </div>
      </BottomSheetModal>
    </PageLayout>
  );
}
