import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      onClick={() => to ? navigate(to) : navigate(-1)}
      whileTap={{ scale: 0.88 }}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: '#F0FDF4'
      }}
      transition={{ duration: 0.15 }}
      style={{
        width: '40px',
        height: '40px',
        minWidth: '40px',
        minHeight: '40px',
        borderRadius: '50%',
        background: '#FFFFFF',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: 'none',
        flexShrink: 0
      }}
      aria-label="Kembali"
    >
      <ChevronLeft size={20} color="#1A1A2E" strokeWidth={2.5} />
    </motion.button>
  );
};

export default BackButton;
