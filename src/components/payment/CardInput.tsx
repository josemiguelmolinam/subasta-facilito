
import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { Shield, CreditCard, Visa, Mastercard } from 'lucide-react';

interface CardInputProps {
  className?: string;
}

export const CardInput = ({ className }: CardInputProps) => {
  return (
    <div className={className}>
      <div className="relative">
        <div className="rounded-md border border-gray-300 p-4 focus-within:ring-2 focus-within:ring-auction-primary/30 focus-within:border-auction-primary transition-all duration-200 shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
                  '::placeholder': { color: '#aab7c4' },
                  iconColor: '#9b87f5',
                  fontSmoothing: 'antialiased',
                },
                invalid: { 
                  color: '#e53e3e', 
                  iconColor: '#e53e3e' 
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
        <div className="absolute right-3 bottom-4 flex gap-2">
          <CreditCard className="h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start space-x-3 mt-6">
        <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-700">
          Tus datos están protegidos con encriptación SSL. Stripe procesa el pago de forma segura y cumple con PCI DSS.
        </p>
      </div>
    </div>
  );
};
