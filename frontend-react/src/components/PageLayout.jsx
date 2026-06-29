import BackButton from './BackButton';

const PageLayout = ({ 
  title,
  subtitle,
  showBack = false,
  backTo,
  rightElement,
  children,
  noPadding = false,
  stickyHeader = true,
}) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-surface)',
      paddingBottom: 'var(--bottom-nav-height)',
    }}>
      {/* Header */}
      {(title || showBack) && (
        <div style={{
          position: stickyHeader ? 'sticky' : 'static',
          top: 0,
          zIndex: 10,
          background: 'var(--color-bg)',
          boxShadow: stickyHeader ? '0 1px 0 var(--color-border)' : 'none',
          padding: '16px var(--app-padding-x)',
          marginBottom: 0,
        }}>
          {showBack && (
            <div style={{ 
              marginBottom: '12px' 
            }}>
              <BackButton to={backTo} />
            </div>
          )}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
            <div>
              {title && (
                <h1 style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  marginBottom: subtitle ? 'var(--space-xs)' : 0,
                }}>
                  {title}
                </h1>
              )}
              {subtitle && (
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                }}>
                  {subtitle}
                </p>
              )}
            </div>
            {rightElement && rightElement}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div style={{
        background: 'var(--color-surface)',
        minHeight: 'calc(100vh - 72px)',
        padding: noPadding 
          ? 0 
          : 'var(--space-lg) var(--app-padding-x)',
      }}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
