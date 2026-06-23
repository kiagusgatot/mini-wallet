const TYPE_LABEL = {
  topup:        'Top Up',
  transfer_in:  'Transfer Masuk',
  transfer_out: 'Transfer Keluar',
};

const TYPE_CLASS = {
  topup:        'badge badge-green',
  transfer_in:  'badge badge-blue',
  transfer_out: 'badge badge-red',
};

function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day:    '2-digit',
    month:  'short',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  });
}

export default function TransactionTable({ transactions }) {
  return (
    <div className="table-card">
      <h2 className="form-card-title">Riwayat Transaksi</h2>

      {transactions.length === 0 ? (
        <p className="empty-state">Belum ada transaksi.</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jenis</th>
                <th>Catatan</th>
                <th style={{ textAlign: 'right' }}>Nominal</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{formatDate(tx.created_at)}</td>
                  <td>
                    <span className={TYPE_CLASS[tx.type]}>
                      {TYPE_LABEL[tx.type]}
                    </span>
                  </td>
                  <td>{tx.note || '-'}</td>
                  <td
                    style={{ textAlign: 'right' }}
                    className={tx.type === 'transfer_out' ? 'amount-out' : 'amount-in'}
                  >
                    {tx.type === 'transfer_out' ? '-' : '+'}
                    {formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
