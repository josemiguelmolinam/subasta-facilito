
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import paypalIcon from '@/assets/paypal.svg';

export const PaypalPayment = () => {
  return (
    <motion.div 
      className="mt-8 p-8 border border-blue-200 rounded-xl bg-blue-50 shadow-inner text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img src={paypalIcon} alt="PayPal" className="h-12 mx-auto mb-4" />
      <p className="text-blue-700 font-medium">
        Serás redirigido a PayPal para completar tu pago de forma segura
      </p>
      <Button className="mt-6 bg-[#0070ba] hover:bg-[#003087] text-white font-medium px-8 py-5">
        Continuar con PayPal
      </Button>
    </motion.div>
  );
};
