import { useState } from 'react';
import api from '../services/api';

function validateAmount(value) {
  if (!value) return 'Nominal tidak boleh kosong.';
  if (!/^\d+$/.test(value)) return 'Nominal harus berupa angka.';
  if (parseInt(value) <= 0) return 'Nominal harus lebih dari 0.';
  if (parseInt(value) > 10000000) return 'Nominal melebihi batas maksimum transaksi.';
  return '';
}

export default function TopUpForm({ onSuccess }) {
  const [amount, setAmount]   = useState('');
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const amountError = validateAmount(amount);
  const isValid     = amount !== '' && !amountError;

  const handleChange = (e) => {
    setAmount(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amountError) { setError(amountError); return; }
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.post('/topup', { amount: parseInt(amount) });
      setSuccess('Top-up berhasil!');
      setAmount('');
      onSuccess();
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(errors?.amount?.[0] ?? err.response?.data?.message ?? 'Top-up gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-card-title">Top Up</h2>

      {error   && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nominal (Rp)</label>
          <input
            type="text"
            className={`form-input ${amount && amountError ? 'input-error' : ''}`}
            value={amount}
            onChange={handleChange}
            placeholder="Contoh: 50000"
          />
          {amount && amountError && (
            <p className="input-hint">{amountError}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !isValid}
        >
          {loading ? 'Memproses...' : 'Top Up'}
        </button>
      </form>
    </div>
  );
}
