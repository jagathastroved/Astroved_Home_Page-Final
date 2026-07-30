import React, { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface AnimatedGridProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const AnimatedGrid = forwardRef<HTMLDivElement, AnimatedGridProps>(
  ({ children, className = '', staggerDelay = 0.2, ...props }, ref) => {
    const containerVariants = {
      hidden: {},
      show: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedGrid.displayName = 'AnimatedGrid';
