const Skeleton = ({ 
  width = '100%', 
  height = '16px',
  borderRadius = 'var(--radius-sm)',
  style = {},
}) => (
  <div
    className="skeleton"
    style={{
      width,
      height,
      borderRadius,
      flexShrink: 0,
      maxWidth: '100%',
      overflow: 'hidden',
      display: 'block',
      boxSizing: 'border-box',
      ...style,
    }}
  />
);

export default Skeleton;
