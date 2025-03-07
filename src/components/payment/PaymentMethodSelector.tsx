
import React from 'react';
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Banknote, Building, Wallet } from 'lucide-react';

// Iconos
import visaIcon from '@/assets/visa.svg';
import mastercardIcon from '@/assets/mastercard.svg';
import amexIcon from '@/assets/amex.svg';
import paypalIcon from '@/assets/paypal.svg';
import bitcoinIcon from '@/assets/Bitcoin.svg';
import bankTransfer from '@/assets/bank-transfer.svg';

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
          <span className="flex-grow font-medium">Tarjeta de Crédito</span>
          <div className="flex gap-2">
            <img src={visaIcon} alt="Visa" className="h-7" />
            <img src={mastercardIcon} alt="Mastercard" className="h-7" />
            <img src={amexIcon} alt="American Express" className="h-7" />
          </div>
        </Label>
      </motion.div>

      <motion.div 
        className="flex items-center space-x-4 border p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 hover:border-blue-300/30 hover:shadow-sm"
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <RadioGroupItem value="paypal" id="paypal" />
        <Label
          htmlFor="paypal"
          className="flex items-center gap-4 cursor-pointer w-full"
        >
          <div className="bg-blue-100 p-2 rounded-full">
            <Banknote className="h-5 w-5 text-blue-600" />
          </div>
          <span className="flex-grow font-medium">PayPal</span>
          <img src={paypalIcon} alt="PayPal" className="h-8 ml-auto" />
        </Label>
      </motion.div>

      <motion.div 
        className="flex items-center space-x-4 border p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 hover:border-green-300/30 hover:shadow-sm"
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <RadioGroupItem value="bank-transfer" id="bank-transfer" />
        <Label
          htmlFor="bank-transfer"
          className="flex items-center gap-4 cursor-pointer w-full"
        >
          <div className="bg-green-100 p-2 rounded-full">
            <Building className="h-5 w-5 text-green-600" />
          </div>
          <span className="flex-grow font-medium">Transferencia Bancaria</span>
          <img src={bankTransfer} alt="BankTransfer" className="h-9 ml-auto" />
        </Label>
      </motion.div>

      <motion.div 
        className="flex items-center space-x-4 border p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 hover:border-amber-300/30 hover:shadow-sm"
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <RadioGroupItem value="crypto" id="crypto" />
        <Label
          htmlFor="crypto"
          className="flex items-center gap-4 cursor-pointer w-full"
        >
          <div className="bg-amber-100 p-2 rounded-full">
            <Wallet className="h-5 w-5 text-amber-600" />
          </div>
          <span className="flex-grow font-medium">Criptomonedas</span>
          <img src={bitcoinIcon} alt="Bitcoin" className="h-7 ml-auto" />
        </Label>
      </motion.div>
    </RadioGroup>
  );
};
