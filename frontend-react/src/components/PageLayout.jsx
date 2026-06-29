import BackButton from './BackButton';

const PageLayout = ({ 
  title,
  subtitle,
  showBack = false,
  backTo,
  rightElement,
  children,
  noPadding = false,
}) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      paddingBottom: 'var(--bottom-nav-height)',
    }}>
      {/* Header */}
      {(title || showBack) && (
        <div style={{
          padding: 'var(--app-padding-top) var(--app-padding-x) 0',
          marginBottom: 'var(--space-lg)',
        }}>
          {showBack && (
            <div style={{ marginBottom: 'var(--space-md)' }}>
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
                  marginBottom: subtitle ? 'var(--space-xs)' : 0,
                }}>
                  {title}
                </h1>
              )}
              {subtitle && (
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                }}>
                  {subtitle}
                </p>
              )}
            </div>
            {rightElement && rightElement}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={noPadding ? {} : {
        padding: '0 var(--app-padding-x)',
      }}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
