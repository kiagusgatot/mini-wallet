import Skeleton from '../Skeleton';

const DashboardSkeleton = () => (
  <div style={{ padding: 'var(--space-lg) var(--app-padding-x)' }}>

    {/* Skeleton Wallet Card */}
    <div style={{
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      marginBottom: '16px',
      border: '1px solid var(--color-border)',
    }}>
      <Skeleton width="40%" height="12px" 
        style={{ marginBottom: '12px' }} />
      <Skeleton width="60%" height="32px" 
        style={{ marginBottom: '16px' }} />
      <div style={{ 
        display: 'flex', gap: '16px' 
      }}>
        <Skeleton width="45%" height="48px" 
          borderRadius="var(--radius-md)" />
        <Skeleton width="45%" height="48px" 
          borderRadius="var(--radius-md)" />
      </div>
    </div>

    {/* Skeleton Quick Action */}
    <div style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '16px',
    }}>
      <Skeleton width="50%" height="48px"
        borderRadius="var(--radius-lg)" />
      <Skeleton width="50%" height="48px"
        borderRadius="var(--radius-lg)" />
    </div>

    {/* Skeleton Chart */}
    <div style={{
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      marginBottom: '16px',
      border: '1px solid var(--color-border)',
    }}>
      <Skeleton width="50%" height="14px"
        style={{ marginBottom: '8px' }} />
      <Skeleton width="35%" height="24px"
        style={{ marginBottom: '16px' }} />
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end',
        gap: '8px',
        height: '100px',
      }}>
        {[40, 70, 30, 90, 50, 80, 60].map(
          (h, i) => (
          <Skeleton 
            key={i}
            width="100%"
            height={`${h}px`}
            borderRadius="6px 6px 0 0"
          />
        ))}
      </div>
    </div>

    {/* Skeleton Transaksi Terbaru */}
    <div style={{
      background: 'var(--color-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      border: '1px solid var(--color-border)',
    }}>
      <Skeleton width="45%" height="14px"
        style={{ marginBottom: '16px' }} />
      {[1,2,3].map((i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px',
        }}>
          <Skeleton 
            width="40px" 
            height="40px"
            borderRadius="50%"
            style={{ flexShrink: 0 }}
          />
          <div style={{ flex: 1 }}>
            <Skeleton width="60%" height="12px"
              style={{ marginBottom: '6px' }} />
            <Skeleton width="40%" height="10px" />
          </div>
          <Skeleton width="20%" height="12px" />
        </div>
      ))}
    </div>
  </div>
);

export default DashboardSkeleton;
