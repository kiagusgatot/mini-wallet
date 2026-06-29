import { motion } from 'framer-motion';

const pageVariants = {
  slideIn: {
    initial: { 
      opacity: 0, 
      x: '100%' 
    },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0, 
      x: '-30%',
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  },
  slideOut: {
    initial: { 
      opacity: 0, 
      x: '-100%' 
    },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0, 
      x: '30%',
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.15 }
    },
  },
};

const PageTransition = ({ 
  children, 
  variant = 'slideIn' 
}) => {
  const v = pageVariants[variant];
  return (
    <motion.div
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflowX: 'hidden',
        background: 'var(--color-bg)',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
