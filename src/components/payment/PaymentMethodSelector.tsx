
import React from 'react';
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Wallet, Apple, Smartphone } from 'lucide-react';

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export const PaymentMethodSelector = ({
  paymentMethod,
  setPaymentMethod
}: PaymentMethodSelectorProps) => {
  return (
    <RadioGroup
      defaultValue={paymentMethod}
      value={paymentMethod}
      onValueChange={setPaymentMethod}
      className="grid gap-4"
    >
      <motion.div 
        className="flex items-center space-x-4 border p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 hover:border-auction-primary/30 hover:shadow-sm"
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <RadioGroupItem value="credit-card" id="credit-card" />
        <Label
          htmlFor="credit-card"
          className="flex items-center gap-4 cursor-pointer w-full"
        >
          <div className="bg-auction-primary/10 p-2 rounded-full">
            <CreditCard className="h-5 w-5 text-auction-primary" />
          </div>
          <span className="flex-grow font-medium">Tarjeta de Crédito/Débito</span>
          <div className="flex gap-2">
            <CreditCard className="h-7 w-7 text-blue-600" />
          </div>
        </Label>
      </motion.div>

      <motion.div 
        className="flex items-center space-x-4 border p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 hover:border-gray-300/50 hover:shadow-sm"
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <RadioGroupItem value="wallet-pay" id="wallet-pay" />
        <Label
          htmlFor="wallet-pay"
          className="flex items-center gap-4 cursor-pointer w-full"
        >
          <div className="bg-gray-100 p-2 rounded-full">
            <Wallet className="h-5 w-5 text-gray-600" />
          </div>
          <span className="flex-grow font-medium">Apple Pay / Google Pay</span>
          <div className="flex gap-2">
            <Apple className="h-7 w-7 text-black" />
            <Smartphone className="h-7 w-7 text-blue-500" />
          </div>
        </Label>
      </motion.div>
    </RadioGroup>
  );
};
