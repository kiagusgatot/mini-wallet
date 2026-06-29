import LoadingSpinner from './LoadingSpinner';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  fullWidth = true,
  disabled = false,
  loading = false,
  style = {},
}) => {
  const variants = {
    primary: {
      background: disabled ? 'var(--color-text-muted)' : 'var(--color-primary)',
      color: 'var(--color-text-inverse)',
    },
    outline: {
      background: 'transparent',
      border: '1.5px solid var(--color-primary)',
      color: 'var(--color-primary)',
    },
    ghost: {
      background: 'var(--color-primary-light)',
      color: 'var(--color-primary-dark)',
    },
    danger: {
      background: 'var(--color-danger)',
      color: 'var(--color-text-inverse)',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: '14px 20px',
        borderRadius: 'var(--radius-lg)',
        fontSize: 'var(--text-base)',
        fontWeight: 'var(--font-semibold)',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        opacity: (disabled || loading) ? 0.8 : 1,
        ...variants[variant],
        ...style,
      }}
    >
      {loading && (
        <LoadingSpinner size={18} color={variant === 'outline' || variant === 'ghost' ? 'var(--color-primary)' : '#fff'} />
      )}
      {loading ? 'Memproses...' : children}
    </button>
  );
};

export default Button;
