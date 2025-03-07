
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

export const PaymentFormHeader = () => {
  return (
    <CardHeader className="bg-gradient-to-r from-auction-primary/10 to-transparent pb-4">
      <CardTitle className="text-2xl font-bold text-auction-dark flex items-center">
        <CreditCard className="w-6 h-6 mr-2 text-auction-primary" />
        Detalles de Pago
      </CardTitle>
    </CardHeader>
  );
};
