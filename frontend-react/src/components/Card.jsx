const Card = ({ 
  children, 
  style = {},
  onClick,
  padding = '20px',
}) => (
  <div
    onClick={onClick}
    style={{
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-lg)',
      padding,
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--color-border)',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}
  >
    {children}
  </div>
);

export default Card;
