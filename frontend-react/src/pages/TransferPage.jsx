import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

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
      let currentUser = {};
      try {
        currentUser = JSON.parse(localStorage.getItem('user')) || {};
      } catch (err) {
        console.error(err);
      }

      if (form.to === currentUser.email || form.to === currentUser.username) {
        setLoading(false);
        return setError('Tidak bisa transfer ke akun sendiri');
      }

      if (!window.confirm(`Kamu akan transfer Rp ${Number(form.amount).toLocaleString('id-ID')} ke ${form.to}. Lanjutkan?`)) {
        setLoading(false);
        return;
      }

      await api.post('/transfer', { 
        to: form.to, 
        amount: Number(form.amount), 
        description: form.description 
      });
      window.alert('Transfer berhasil dikirim!');
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingTop: '8px' }}>
        <BackButton />
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1A2E', margin: 0 }}>
          Transfer
        </h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
        <div className="card mb-6">
          <div className="form-group">
            <label htmlFor="to" className="form-label">Email / No. HP Tujuan</label>
            <input
              id="to"
              type="text"
              className="form-input"
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              placeholder="Email atau username penerima"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="form-label">Nominal (Rp)</label>
            <input
              id="amount"
              type="number"
              className="form-input"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="Masukkan nominal (min. Rp 10.000)"
              min="10000"
              required
            />
          </div>

          <div className="form-group mb-0">
            <label htmlFor="description" className="form-label">Catatan (Opsional)</label>
            <input
              id="description"
              type="text"
              className="form-input"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Tambahkan catatan (opsional)"
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
            {loading ? 'Memproses...' : 'Kirim Transfer'}
          </motion.button>
        </div>
      </form>
    </PageTransition>
  );
}
