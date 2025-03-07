
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CardInput } from './CardInput';

interface PaymentFormCardProps {
  cardName: string;
  handleNameChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PaymentFormCard = ({ cardName, handleNameChange }: PaymentFormCardProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Nombre del Titular</Label>
        <Input
          type="text"
          name="name"
          placeholder="Nombre y Apellido"
          value={cardName}
          onChange={handleNameChange}
          required
          className="bg-white transition-all duration-200 border-gray-300 focus:border-auction-primary focus:ring-auction-primary/20"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Número de Tarjeta</Label>
        <CardInput />
      </div>
    </>
  );
};
