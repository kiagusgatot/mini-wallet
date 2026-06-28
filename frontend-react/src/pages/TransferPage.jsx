import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function TransferPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ to: '', amount: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/transfer', { 
        to: form.to, 
        amount: Number(form.amount), 
        description: form.description 
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isValid = form.to && form.amount && Number(form.amount) >= 10000;

  return (
    <PageTransition>
      <div className="flex items-center mb-6 pt-2">
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#f1f5f9', fontSize: '1.2rem', padding: '0.5rem', marginLeft: '-0.5rem' }}>
          ←
        </button>
        <h1 className="font-bold text-white ml-2" style={{ fontSize: '1.2rem' }}>Transfer</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
        <div className="card mb-6">
          <div className="form-group">
            <label className="form-label">Email / No. HP Tujuan</label>
            <input
              type="text"
              className="form-input"
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              placeholder="Contoh: user@email.com atau 0812..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nominal (Rp)</label>
            <input
              type="number"
              className="form-input"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="Min. 10.000"
              min="10000"
              required
            />
          </div>

          <div className="form-group mb-0">
            <label className="form-label">Catatan (Opsional)</label>
            <input
              type="text"
              className="form-input"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Contoh: Bayar hutang"
            />
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn btn-primary"
            disabled={loading || !isValid}
          >
            {loading ? 'Memproses...' : 'Kirim Sekarang'}
          </motion.button>
        </div>
      </form>
    </PageTransition>
  );
}
