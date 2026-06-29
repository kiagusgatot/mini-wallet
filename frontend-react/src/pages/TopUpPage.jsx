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
      await api.post('/topup', { amount: Number(amount) });
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
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#1A1A2E', fontSize: '1.2rem', padding: '0.5rem', marginLeft: '-0.5rem' }}>
          ←
        </button>
        <h1 className="font-bold text-dark ml-2" style={{ fontSize: '1.2rem' }}>Top Up Saldo</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleTopUp} style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
        <div className="card mb-6">
          <label className="form-label mb-2">Pilih Nominal</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {presets.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val.toString())}
                style={{
                  background: amount === val.toString() ? 'rgba(16,185,129,0.1)' : '#1e293b',
                  border: `1px solid ${amount === val.toString() ? '#10b981' : '#334155'}`,
                  color: amount === val.toString() ? '#10b981' : '#1A1A2E',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Rp {val.toLocaleString('id-ID')}
              </button>
            ))}
          </div>

          <label className="form-label mb-2">Atau masukkan nominal khusus</label>
          <input
            type="number"
            className="form-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Contoh: 150000"
            min="10000"
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
