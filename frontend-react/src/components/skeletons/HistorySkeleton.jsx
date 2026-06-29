import Skeleton from '../Skeleton';

const HistorySkeleton = () => (
  <div style={{ padding: 'var(--space-lg) var(--app-padding-x)' }}>
    {/* Filter skeleton */}
    <div style={{
      display: 'flex',
      gap: '8px',
      marginBottom: '16px',
    }}>
      {[1,2,3].map((i) => (
        <Skeleton 
          key={i}
          width="80px" 
          height="32px"
          borderRadius="var(--radius-full)"
        />
      ))}
    </div>

    {/* Table skeleton */}
    <div style={{
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px',
      border: '1px solid var(--color-border)',
    }}>
      {/* Header row */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <Skeleton width="25%" height="10px" />
        <Skeleton width="30%" height="10px" />
        <Skeleton width="20%" height="10px" />
        <Skeleton width="20%" height="10px" />
      </div>

      {/* Data rows */}
      {[1,2,3,4,5].map((i) => (
        <div key={i} style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '16px',
        }}>
          <Skeleton width="25%" height="12px" />
          <Skeleton width="30%" height="12px" />
          <Skeleton 
            width="20%" 
            height="24px"
            borderRadius="var(--radius-full)"
          />
          <Skeleton width="20%" height="12px" />
        </div>
      ))}
    </div>
  </div>
);

export default HistorySkeleton;
