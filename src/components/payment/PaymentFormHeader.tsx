
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

export const PaymentFormHeader = () => {
  return (
    <CardHeader className="bg-gradient-to-r from-auction-primary/10 to-transparent pb-4">
      <CardTitle className="text-2xl font-bold text-auction-dark flex items-center">
        <CreditCard className="w-6 h-6 mr-2 text-auction-primary" />
        Información de Pago
      </CardTitle>
      <p className="text-sm text-gray-600 mt-2">
        Completa los datos de tu tarjeta para procesar el pago de forma segura
      </p>
    </CardHeader>
  );
};
