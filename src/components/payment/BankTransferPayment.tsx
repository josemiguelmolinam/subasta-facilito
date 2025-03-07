
import React from 'react';
import { motion } from 'framer-motion';
import { Building } from 'lucide-react';

interface BankTransferPaymentProps {
  orderId: string;
}

export const BankTransferPayment = ({ orderId }: BankTransferPaymentProps) => {
  return (
    <motion.div 
      className="mt-8 p-6 border border-green-100 rounded-xl space-y-4 bg-green-50 shadow-inner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-3 text-green-700">
        <Building className="h-5 w-5" />
        <h3 className="font-bold">Datos bancarios:</h3>
      </div>
      <div className="bg-white p-4 rounded-lg border border-green-100 space-y-3">
        <p className="flex justify-between text-sm">
          <span className="text-gray-500">Banco:</span>
          <span className="font-medium">Banco Example</span>
        </p>
        <p className="flex justify-between text-sm">
          <span className="text-gray-500">IBAN:</span>
          <span className="font-medium font-mono">ES00 0000 0000 0000 0000 0000</span>
        </p>
        <p className="flex justify-between text-sm">
          <span className="text-gray-500">BIC/SWIFT:</span>
          <span className="font-medium font-mono">EXAMPLEXXX</span>
        </p>
        <p className="flex justify-between text-sm">
          <span className="text-gray-500">Beneficiario:</span>
          <span className="font-medium">Subastalo S.L.</span>
        </p>
        <p className="flex justify-between text-sm">
          <span className="text-gray-500">Concepto:</span>
          <span className="font-medium font-mono">{`REF-${orderId}`}</span>
        </p>
      </div>
      <div className="text-sm text-green-700 bg-green-100 p-3 rounded-lg">
        <p>Una vez realizada la transferencia, recibirás un email de confirmación en 24-48h hábiles.</p>
      </div>
    </motion.div>
  );
};
