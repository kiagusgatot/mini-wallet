import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import BottomSheetModal from '../components/BottomSheetModal';
import { motion } from 'framer-motion';

export default function TopUpPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  
  const presets = [50000, 100000, 200000, 500000];

  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const numAmount = Number(amount);
    if (!numAmount || numAmount < 10000) return setError('Minimal Top Up adalah Rp 10.000');
    if (numAmount > 10000000) return setError('Maksimal Top Up adalah Rp 10.000.000');
    
    setShowConfirm(true);
  };

  const executeTopUp = async () => {
    setError('');
    setLoading(true);
    try {
      const numAmount = parseInt(amount, 10);
      await api.post('/topup', { amount: numAmount });
      window.alert(`Top Up berhasil! Saldo bertambah Rp ${numAmount.toLocaleString('id-ID')}`);
      setShowConfirm(false);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setShowConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout noPadding>
      {/* Sticky Header */}
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
            Top Up
          </h1>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            margin: 0,
          }}>
            Tambah saldo ke wallet kamu
          </p>
        </div>
      </div>

      <div style={{ padding: 'var(--space-lg) var(--app-padding-x)' }}>
        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleTopUpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        <Card>
          <label style={{
            display: 'block',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-medium)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-md)',
          }}>
            Pilih Nominal
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-sm)',
            marginBottom: 'var(--space-lg)',
          }}>
            {presets.map((val) => {
              const isSelected = amount === val.toString();
              return (
                <motion.button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val.toString())}
                  whileHover={!isSelected ? { backgroundColor: '#D1FAE5' } : {}}
                  style={{
                    backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
                    border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    color: isSelected ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'var(--font-semibold)',
                    fontSize: 'var(--text-sm)',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label={`Pilih nominal Rp ${val.toLocaleString('id-ID')}`}
                >
                  Rp {val.toLocaleString('id-ID')}
                </motion.button>
              );
            })}
          </div>

          <label htmlFor="amount" style={{
            display: 'block',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-medium)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-sm)',
          }}>
            Atau masukkan nominal khusus
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Masukkan nominal (min. Rp 10.000)"
            min="10000"
            max="10000000"
            required
          />
        </Card>

        <Button
          type="submit"
          disabled={!amount || Number(amount) < 10000}
          loading={loading}
        >
          Konfirmasi Top Up
        </Button>
      </form>
      </div>

      <BottomSheetModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Konfirmasi Top Up"
        description="Pastikan nominal top up sudah benar sebelum melanjutkan."
        primaryLabel="Lanjutkan"
        secondaryLabel="Batal"
        primaryAction={executeTopUp}
        secondaryAction={() => setShowConfirm(false)}
        isLoading={loading}
      >
        <div style={{
          background: 'var(--color-surface)',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
        }}>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            margin: '0 0 4px 0',
          }}>
            Nominal Top Up
          </p>
          <p style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-text-primary)',
            margin: 0,
          }}>
            Rp {Number(amount).toLocaleString('id-ID')}
          </p>
        </div>
      </BottomSheetModal>
    </PageLayout>
  );
}
