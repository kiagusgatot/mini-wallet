import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  fullPage = false,
  size = 32,
  color = 'var(--color-primary)',
}) => {
  const spinner = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: '50%',
        border: `3px solid var(--color-border)`,
        borderTopColor: color,
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    />
  );

  if (fullPage) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '16px',
      }}>
        {spinner}
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
          margin: 0,
        }}>
          Memuat...
        </p>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
