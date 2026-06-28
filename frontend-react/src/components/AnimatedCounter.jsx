import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function AnimatedCounter({ value }) {
  const [currentValue, setCurrentValue] = useState(0);
  
  const spring = useSpring(currentValue, {
    mass: 1,
    stiffness: 100,
    damping: 15
  });

  const display = useTransform(spring, (current) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Math.round(current))
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}
