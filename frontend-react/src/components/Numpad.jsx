import { motion } from 'framer-motion';
import { Delete } from 'lucide-react';

export default function Numpad({ onKeyPress, onDelete }) {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];

  return (
    <div className="numpad">
      {keys.map((key, i) => {
        if (key === '') return <div key={i} />;
        
        if (key === 'del') {
          return (
            <motion.button
              key="del"
              whileTap={{ scale: 0.9, backgroundColor: 'rgba(255,255,255,0.1)' }}
              className="num-btn"
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
            whileTap={{ scale: 0.9, backgroundColor: 'rgba(255,255,255,0.1)' }}
            className="num-btn"
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
