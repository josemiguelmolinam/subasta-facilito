
import React from 'react';
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Wallet, Smartphone, DollarSign, Shield } from 'lucide-react';
import Image from '@/components/ui/image';

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
        className={`flex items-center space-x-4 border p-4 rounded-xl transition-colors duration-300 ${paymentMethod === 'credit-card' ? 'bg-auction-primary/5 border-auction-primary/50 shadow-sm' : 'hover:bg-gray-50 hover:border-auction-primary/30 hover:shadow-sm'}`}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <RadioGroupItem value="credit-card" id="credit-card" />
        <Label
          htmlFor="credit-card"
          className="flex items-center gap-4 cursor-pointer w-full"
        >
          <div className={`${paymentMethod === 'credit-card' ? 'bg-auction-primary' : 'bg-auction-primary/10'} p-2 rounded-full transition-colors duration-300`}>
            <CreditCard className={`h-5 w-5 ${paymentMethod === 'credit-card' ? 'text-white' : 'text-auction-primary'}`} />
          </div>
          <span className="flex-grow font-medium">Tarjeta de Crédito/Débito</span>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded shadow-sm flex items-center justify-center bg-white">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div className="w-8 h-8 rounded shadow-sm flex items-center justify-center bg-[#EB001B]">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div className="w-8 h-8 rounded shadow-sm flex items-center justify-center bg-[#1434CB]">
              <Shield className="h-4 w-4 text-white" />
            </div>
          </div>
        </Label>
      </motion.div>

      <motion.div 
        className={`flex items-center space-x-4 border p-4 rounded-xl transition-colors duration-300 ${paymentMethod === 'paypal' ? 'bg-[#0079C1]/5 border-[#0079C1]/50 shadow-sm' : 'hover:bg-gray-50 hover:border-gray-300/50 hover:shadow-sm'}`}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <RadioGroupItem value="paypal" id="paypal" />
        <Label
          htmlFor="paypal"
          className="flex items-center gap-4 cursor-pointer w-full"
        >
          <div className={`${paymentMethod === 'paypal' ? 'bg-[#0079C1]' : 'bg-[#0079C1]/10'} p-2 rounded-full transition-colors duration-300`}>
            <DollarSign className={`h-5 w-5 ${paymentMethod === 'paypal' ? 'text-white' : 'text-[#0079C1]'}`} />
          </div>
          <span className="flex-grow font-medium">PayPal</span>
          <div className="flex gap-2">
            <span className="text-[#0079C1] font-bold text-lg">Pay<span className="text-[#00457C]">Pal</span></span>
          </div>
        </Label>
      </motion.div>

      <motion.div 
        className={`flex items-center space-x-4 border p-4 rounded-xl transition-colors duration-300 ${paymentMethod === 'wallet-pay' ? 'bg-gray-100 border-gray-400/50 shadow-sm' : 'hover:bg-gray-50 hover:border-gray-300/50 hover:shadow-sm'}`}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <RadioGroupItem value="wallet-pay" id="wallet-pay" />
        <Label
          htmlFor="wallet-pay"
          className="flex items-center gap-4 cursor-pointer w-full"
        >
          <div className={`${paymentMethod === 'wallet-pay' ? 'bg-gray-800' : 'bg-gray-100'} p-2 rounded-full transition-colors duration-300`}>
            <Wallet className={`h-5 w-5 ${paymentMethod === 'wallet-pay' ? 'text-white' : 'text-gray-600'}`} />
          </div>
          <span className="flex-grow font-medium">Apple Pay / Google Pay</span>
          <div className="flex gap-3">
            <img src="/src/assets/apple-pay.svg" alt="Apple Pay" className="h-6" />
            <img src="/src/assets/google-pay.svg" alt="Google Pay" className="h-6" />
          </div>
        </Label>
      </motion.div>
    </RadioGroup>
  );
};
