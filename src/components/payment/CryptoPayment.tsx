
import React from 'react';
import { motion } from 'framer-motion';
import bitcoinIcon from '@/assets/Bitcoin.svg';

export const CryptoPayment = () => {
  return (
    <motion.div 
      className="mt-8 text-center p-8 border border-purple-200 rounded-xl bg-purple-50 shadow-inner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img src={bitcoinIcon} alt="Bitcoin" className="h-16 mx-auto mb-4 animate-pulse" />
      <p className="text-purple-700 font-medium">
        Próximamente disponible
      </p>
      <p className="text-sm text-purple-600 mt-2">
        Estamos trabajando para ofrecerte pagos con Bitcoin, Ethereum y otras criptomonedas
      </p>
    </motion.div>
  );
};
