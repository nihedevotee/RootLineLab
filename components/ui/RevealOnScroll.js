'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { APPLE_EASE } from '@/lib/animations';

export default function RevealOnScroll({
  children,
  delay = 0,
  duration = 0.7,
  y = 32,
  className = '',
  amount = 0.15,
  as = 'div',
}) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: APPLE_EASE,
      },
    },
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </Component>
  );
}
