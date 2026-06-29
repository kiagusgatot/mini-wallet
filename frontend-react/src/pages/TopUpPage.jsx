import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function TopUpPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const presets = [50000, 100000, 200000, 500000];

  const handleTopUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const numAmount = Number(amount);
      if (numAmount < 10000) return setError('Minimal Top Up adalah Rp 10.000');
      if (numAmount > 10000000) return setError('Maksimal Top Up adalah Rp 10.000.000');
      
      if (!window.confirm(`Kamu akan Top Up sebesar Rp ${numAmount.toLocaleString('id-ID')}. Lanjutkan?`)) {
        setLoading(false);
        return;
      }
      
      await api.post('/topup', { amount: numAmount });
      window.alert(`Top Up berhasil! Saldo bertambah Rp ${numAmount.toLocaleString('id-ID')}`);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="flex items-center mb-6 pt-2">
        <button aria-label="Kembali" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#1A1A2E', fontSize: '1.2rem', padding: '0.5rem', marginLeft: '-0.5rem' }}>
          ←
        </button>
        <h1 className="font-bold text-dark ml-2" style={{ fontSize: '1.2rem' }}>Top Up Saldo</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleTopUp} style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
        <div className="card mb-6">
          <label className="form-label mb-2">Pilih Nominal</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {presets.map((val) => {
              const isSelected = amount === val.toString();
              return (
                <motion.button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val.toString())}
                  whileHover={!isSelected ? { backgroundColor: '#D1FAE5', color: '#059669' } : {}}
                  style={{
                    backgroundColor: isSelected ? '#10b981' : '#F0FDF4',
                    border: '1.5px solid #10b981',
                    color: isSelected ? '#FFFFFF' : '#10b981',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s, color 0.2s'
                  }}
                  aria-label={`Pilih nominal Rp ${val.toLocaleString('id-ID')}`}
                >
                  Rp {val.toLocaleString('id-ID')}
                </motion.button>
              );
            })}
          </div>

          <label htmlFor="amount" className="form-label mb-2">Atau masukkan nominal khusus</label>
          <input
            id="amount"
            type="number"
            className="form-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Masukkan nominal (min. Rp 10.000)"
            min="10000"
            max="10000000"
            required
          />
        </div>

        <div style={{ marginTop: 'auto' }}>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn btn-primary"
            disabled={loading || !amount || Number(amount) < 10000}
          >
            {loading ? 'Memproses...' : 'Konfirmasi Top Up'}
          </motion.button>
        </div>
      </form>
    </PageTransition>
  );
}
