
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PaymentProcessing } from '@/components/ui/payment-processing';

export default function PaymentProcessingDemo() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartProcessing = () => {
    setIsProcessing(true);
    
    // Simular finalización del proceso después de 8 segundos
    setTimeout(() => {
      setIsProcessing(false);
    }, 8000);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Demo de Procesamiento de Pago</h1>
        
        <div className="space-y-6">
          <div className="border rounded-md p-4">
            <h2 className="font-medium mb-2">Resumen de Compra</h2>
            <div className="flex justify-between text-sm">
              <span>Producto Premium</span>
              <span>€99.99</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>IVA (21%)</span>
              <span>€21.00</span>
            </div>
            <div className="flex justify-between font-medium mt-2 pt-2 border-t">
              <span>Total</span>
              <span>€120.99</span>
            </div>
          </div>
          
          <Button 
            variant="processing" 
            fullWidth={true}
            size="lg"
            onClick={handleStartProcessing}
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando...' : 'Realizar Pago'}
          </Button>
        </div>
      </div>
      
      <PaymentProcessing isProcessing={isProcessing} />
    </div>
  );
}
