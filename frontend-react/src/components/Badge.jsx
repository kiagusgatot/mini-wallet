const Badge = ({ type }) => {
  const styles = {
    topup: {
      background: 'var(--color-primary-light)',
      color: 'var(--color-primary-dark)',
      label: 'Top Up',
    },
    transfer_out: {
      background: 'var(--color-danger-light)',
      color: 'var(--color-danger)',
      label: 'Transfer Keluar',
    },
    transfer_in: {
      background: 'var(--color-primary-light)',
      color: 'var(--color-primary-dark)',
      label: 'Transfer Masuk',
    },
  };

  const s = styles[type] || styles.topup;

  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--font-semibold)',
      background: s.background,
      color: s.color,
      whiteSpace: 'nowrap',
    }}>
      {s.label}
    </span>
  );
};

export default Badge;
