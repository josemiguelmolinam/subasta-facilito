
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, DollarSign, Wallet } from 'lucide-react';

interface PaymentFormHeaderProps {
  paymentMethod: string;
}

export const PaymentFormHeader = ({ paymentMethod }: PaymentFormHeaderProps) => {
  const getHeaderInfo = () => {
    switch (paymentMethod) {
      case 'credit-card':
        return {
          icon: <CreditCard className="w-6 h-6 mr-2 text-auction-primary" />,
          title: 'Información de Pago con Tarjeta',
          description: 'Completa los datos de tu tarjeta para procesar el pago de forma segura'
        };
      case 'paypal':
        return {
          icon: <DollarSign className="w-6 h-6 mr-2 text-[#0079C1]" />,
          title: 'Pago con PayPal',
          description: 'Serás redirigido a PayPal para completar tu pago de forma segura'
        };
      case 'wallet-pay':
        return {
          icon: <Wallet className="w-6 h-6 mr-2 text-gray-700" />,
          title: 'Pago con Digital Wallet',
          description: 'Selecciona tu wallet preferido para pagar de forma rápida y segura'
        };
      default:
        return {
          icon: <CreditCard className="w-6 h-6 mr-2 text-auction-primary" />,
          title: 'Información de Pago',
          description: 'Completa los datos para procesar el pago de forma segura'
        };
    }
  };

  const { icon, title, description } = getHeaderInfo();

  return (
    <CardHeader className={`
      bg-gradient-to-r 
      ${paymentMethod === 'credit-card' ? 'from-auction-primary/10 to-transparent' : 
        paymentMethod === 'paypal' ? 'from-[#0079C1]/10 to-transparent' : 
        'from-gray-100 to-transparent'}
      pb-4
    `}>
      <CardTitle className="text-2xl font-bold text-auction-dark flex items-center">
        {icon}
        {title}
      </CardTitle>
      <p className="text-sm text-gray-600 mt-2">
        {description}
      </p>
    </CardHeader>
  );
};
