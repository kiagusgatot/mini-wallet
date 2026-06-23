import { useState } from 'react';
import api from '../services/api';

function validateAmount(value) {
  if (!value) return 'Nominal tidak boleh kosong.';
  if (!/^\d+$/.test(value)) return 'Nominal harus berupa angka.';
  if (parseInt(value) <= 0) return 'Nominal harus lebih dari 0.';
  if (parseInt(value) > 10000000) return 'Nominal melebihi batas maksimum transaksi.';
  return '';
}

export default function TransferForm({ onSuccess }) {
  const [form, setForm]       = useState({ recipient: '', amount: '', note: '' });
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const amountError = validateAmount(form.amount);
  const isValid     = form.recipient.trim() !== '' && form.amount !== '' && !amountError;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.recipient.trim()) { setError('Penerima tidak boleh kosong.'); return; }
    if (amountError) { setError(amountError); return; }
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.post('/transfer', {
        recipient: form.recipient,
        amount:    parseInt(form.amount),
        note:      form.note || undefined,
      });
      setSuccess('Transfer berhasil!');
      setForm({ recipient: '', amount: '', note: '' });
      onSuccess();
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(errors?.amount?.[0] ?? err.response?.data?.message ?? 'Transfer gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-card-title">Transfer</h2>

      {error   && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email / No. HP Penerima</label>
          <input
            type="text"
            name="recipient"
            className="form-input"
            value={form.recipient}
            onChange={handleChange}
            placeholder="email@contoh.com atau 08xx"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Nominal (Rp)</label>
          <input
            type="text"
            name="amount"
            className={`form-input ${form.amount && amountError ? 'input-error' : ''}`}
            value={form.amount}
            onChange={handleChange}
            placeholder="Contoh: 50000"
          />
          {form.amount && amountError && (
            <p className="input-hint">{amountError}</p>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Catatan (opsional)</label>
          <input
            type="text"
            name="note"
            className="form-input"
            value={form.note}
            onChange={handleChange}
            placeholder="Untuk keperluan..."
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !isValid}
        >
          {loading ? 'Memproses...' : 'Transfer'}
        </button>
      </form>
    </div>
  );
}
