
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Shield } from 'lucide-react';

export const PaypalPayment = () => {
  return (
    <motion.div 
      className="mt-6 p-6 border border-[#0079C1]/20 rounded-xl space-y-6 bg-[#f5f9fc]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-[#0079C1]/10 max-w-sm">
          <div className="mb-4 flex justify-center">
            <div className="bg-[#0079C1] text-white p-3 rounded-full">
              <DollarSign className="h-8 w-8" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-[#0079C1]">Pago seguro con PayPal</h3>
          
          <p className="text-gray-600 mb-6">
            Al hacer clic en "Pagar con PayPal", serás redirigido a PayPal para completar tu compra de forma segura.
          </p>
          
          <div className="flex justify-center">
            <span className="text-[#0079C1] font-bold text-2xl">Pay<span className="text-[#00457C]">Pal</span></span>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start space-x-3 mt-4">
        <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-700">
          <p className="font-medium">Protección al comprador de PayPal</p>
          <p className="text-blue-600">Tu compra está protegida por la política de protección al comprador de PayPal.</p>
        </div>
      </div>
    </motion.div>
  );
};
