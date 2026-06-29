import BackButton from './BackButton';

const PageLayout = ({ 
  title, 
  subtitle, 
  showBack = false,
  backTo,
  children 
}) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5F5F7',
      maxWidth: '390px',
      margin: '0 auto',
      boxSizing: 'border-box',
      paddingBottom: '80px',
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 24px 0px 24px',
        marginBottom: '20px',
      }}>
        {showBack && (
          <div style={{ marginBottom: '16px' }}>
            <BackButton to={backTo} />
          </div>
        )}
        {title && (
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#1A1A2E',
            margin: 0,
            marginBottom: subtitle ? '4px' : '0',
          }}>
            {title}
          </h1>
        )}
        {subtitle && (
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            margin: 0,
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Content */}
      <div style={{
        padding: '0 24px',
      }}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
