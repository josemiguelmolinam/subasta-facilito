
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface PaymentButtonProps {
  isProcessing: boolean;
  isSuccess: boolean;
  isDisabled: boolean;
}

export const PaymentButton = ({ isProcessing, isSuccess, isDisabled }: PaymentButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isProcessing || isSuccess || isDisabled}
      variant="payment"
      className="w-full py-6 mt-4 font-medium text-base"
    >
      {isProcessing ? (
        <div className="flex items-center justify-center gap-2">
          <Loader className="mr-2 animate-spin" />
          <span>Procesando pago...</span>
        </div>
      ) : isSuccess ? (
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="mr-2 text-white animate-pulse" />
          <span>¡Pago Completado!</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <span>Confirmar Pago</span>
          <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </Button>
  );
};
