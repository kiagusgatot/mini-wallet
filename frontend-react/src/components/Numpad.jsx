import { motion } from 'framer-motion';
import { Delete } from 'lucide-react';

export default function Numpad({ onKeyPress, onDelete }) {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 72px)',
    gap: '12px',
    justifyContent: 'center',
    margin: '2rem auto 0 auto'
  };

  const btnStyle = {
    width: '72px',
    height: '72px',
    minWidth: '72px',
    minHeight: '72px',
    borderRadius: '16px',
    background: '#1e293b',
    border: '1px solid #334155',
    color: '#f1f5f9',
    fontSize: '24px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    boxSizing: 'border-box',
    transition: 'background-color 0.1s ease',
    padding: 0,
    outline: 'none'
  };

  return (
    <div style={gridStyle}>
      {keys.map((key, i) => {
        if (key === '') return <div key={i} />;
        
        if (key === 'del') {
          return (
            <motion.button
              key="del"
              whileTap={{ scale: 0.95, backgroundColor: '#10b981', color: '#ffffff' }}
              style={btnStyle}
              onClick={onDelete}
              type="button"
            >
              <Delete size={28} />
            </motion.button>
          );
        }

        return (
          <motion.button
            key={key}
            whileTap={{ scale: 0.95, backgroundColor: '#10b981', color: '#ffffff' }}
            style={btnStyle}
            onClick={() => onKeyPress(key.toString())}
            type="button"
          >
            {key}
          </motion.button>
        );
      })}
    </div>
  );
}
