import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BottomSheetModal = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children,
  primaryAction,
  secondaryAction,
  primaryLabel = 'Lanjutkan',
  secondaryLabel = 'Batal',
  isLoading = false
}) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0, x: '-50%' }}
            animate={{ opacity: 1, x: '-50%' }}
            exit={{ opacity: 0, x: '-50%' }}
            transition={{ duration: 0.2 }}
            onClick={isLoading ? undefined : onClose}
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '100%',
              maxWidth: 'var(--app-max-width)',
              backgroundColor: 'rgba(15, 23, 42, 0.45)',
              zIndex: 999,
            }}
          />

          {/* Bottom Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: '100%', x: '-50%' }}
            animate={{ y: 0, x: '-50%' }}
            exit={{ y: '100%', x: '-50%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: '50%',
              width: '100%',
              maxWidth: 'var(--app-max-width)',
              backgroundColor: 'var(--color-bg)',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
              zIndex: 1000,
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
              boxSizing: 'border-box',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Handle */}
            <div style={{
              width: '40px',
              height: '4px',
              backgroundColor: 'var(--color-border)',
              borderRadius: '2px',
              margin: '0 auto 20px auto',
            }} />

            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--color-text-primary)',
                margin: '0 0 8px 0',
              }}>
                {title}
              </h3>
              {description && (
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                }}>
                  {description}
                </p>
              )}
            </div>

            {/* Content */}
            <div style={{ marginBottom: '24px' }}>
              {children}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {secondaryAction && (
                <button
                  onClick={secondaryAction}
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 'var(--font-semibold)',
                    fontSize: 'var(--text-base)',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer',
                    opacity: isLoading ? 0.6 : 1,
                  }}
                >
                  {secondaryLabel}
                </button>
              )}
              {primaryAction && (
                <button
                  onClick={primaryAction}
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-text-inverse)',
                    fontWeight: 'var(--font-semibold)',
                    fontSize: 'var(--text-base)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isLoading ? 0.8 : 1,
                  }}
                >
                  {isLoading ? 'Memproses...' : primaryLabel}
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheetModal;
