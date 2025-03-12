
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Check, DollarSign, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentButtonProps {
  isProcessing: boolean;
  isSuccess: boolean;
  isDisabled: boolean;
  paymentMethod?: string;
}

export const PaymentButton = ({ isProcessing, isSuccess, isDisabled, paymentMethod = 'credit-card' }: PaymentButtonProps) => {
  
  const getButtonContent = () => {
    if (isSuccess) {
      return (
        <span className="flex items-center">
          <Check className="mr-2 h-5 w-5 animate-bounce" />
          ¡Pago completado!
        </span>
      );
    }
    
    if (isProcessing) {
      return (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Procesando...
        </span>
      );
    }
    
    switch (paymentMethod) {
      case 'credit-card':
        return (
          <span className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Pagar con Tarjeta
          </span>
        );
      case 'paypal':
        return (
          <span className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Pagar con PayPal
          </span>
        );
      case 'wallet-pay':
        return (
          <span className="flex items-center">
            <Wallet className="mr-2 h-5 w-5" />
            Pagar con Wallet
          </span>
        );
      default:
        return 'Realizar Pago';
    }
  };
  
  const getButtonStyle = () => {
    if (isSuccess) return "bg-green-600 hover:bg-green-700";
    if (isProcessing) return "bg-gray-600 cursor-wait";
    
    switch (paymentMethod) {
      case 'credit-card':
        return "bg-auction-primary hover:bg-auction-secondary";
      case 'paypal':
        return "bg-[#0079C1] hover:bg-[#00457C]";
      case 'wallet-pay':
        return "bg-gray-800 hover:bg-gray-900";
      default:
        return "bg-auction-primary hover:bg-auction-secondary";
    }
  };
  
  return (
    <motion.div 
      whileHover={{ scale: isDisabled || isProcessing ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled || isProcessing ? 1 : 0.98 }}
    >
      <Button
        type="submit"
        className={`w-full py-6 text-base font-medium ${getButtonStyle()}`}
        disabled={isDisabled || isProcessing}
      >
        {getButtonContent()}
      </Button>
    </motion.div>
  );
};
