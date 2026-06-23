export default function WalletCard({ balance }) {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(balance ?? 0);

  return (
    <div className="wallet-card">
      <p className="wallet-label">Saldo Anda</p>
      <p className="wallet-balance">{formatted}</p>
    </div>
  );
}
