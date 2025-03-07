
import React from 'react';
import { motion } from 'framer-motion';

interface PaymentLayoutProps {
  title: string;
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  footer?: React.ReactNode;
}

export const PaymentLayout = ({
  title,
  leftColumn,
  rightColumn,
  footer
}: PaymentLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.h1 
        className="text-3xl font-bold mb-8 text-auction-dark text-center md:text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      
      <div className="grid md:grid-cols-5 gap-8">
        {/* Left column (3/5) */}
        <motion.div 
          className="md:col-span-3 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {leftColumn}
        </motion.div>

        {/* Right column (2/5) */}
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {rightColumn}
        </motion.div>
      </div>
      
      {footer && (
        <div className="mt-6">
          {footer}
        </div>
      )}
    </div>
  );
};
