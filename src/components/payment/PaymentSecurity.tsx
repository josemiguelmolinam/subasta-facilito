
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield } from 'lucide-react';

export const PaymentSecurity = () => {
  return (
    <motion.div 
      className="flex items-center justify-center gap-6 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
        <Lock className="w-4 h-4 text-yellow-500" />
        <span className="text-gray-700 font-medium">Pago Seguro</span>
      </div>
      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
        <Shield className="w-4 h-4 text-green-500" />
        <span className="text-gray-700 font-medium">Protección al Comprador</span>
      </div>
    </motion.div>
  );
};
