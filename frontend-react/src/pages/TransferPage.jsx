import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';

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

  const fields = [
    { id: 'to', label: 'Email / Username Tujuan', type: 'text', placeholder: 'Email atau username penerima', required: true },
    { id: 'amount', label: 'Nominal (Rp)', type: 'number', placeholder: 'Masukkan nominal (min. Rp 10.000)', required: true, min: '10000' },
    { id: 'description', label: 'Catatan (Opsional)', type: 'text', placeholder: 'Tambahkan catatan (opsional)', required: false },
  ];

  return (
    <PageLayout
      title="Transfer"
      subtitle="Kirim saldo ke pengguna lain"
      showBack={true}
      backTo="/transaksi"
    >
      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} style={{
                  display: 'block',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-medium)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-xs)',
                }}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  value={form[field.id]}
                  onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                  placeholder={field.placeholder}
                  required={field.required}
                  min={field.min}
                />
              </div>
            ))}
          </div>
        </Card>

        <Button
          type="submit"
          disabled={loading || !isValid}
          loading={loading}
        >
          Kirim Transfer
        </Button>
      </form>
    </PageLayout>
  );
}
