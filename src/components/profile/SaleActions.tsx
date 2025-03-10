
import React from 'react';
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { Sale } from "@/types/sales";

interface SaleActionsProps {
  sale: Sale;
  onMarkDelivered: (saleId: string) => void;
  onCancelSale: (saleId: string) => void;
}

export const SaleActions = ({ sale, onMarkDelivered, onCancelSale }: SaleActionsProps) => {
  return (
    <div className="pt-2 space-y-3">
      {/* Removed the "Confirmar Entrega" button for sales with status 'shipped' */}
      
      {sale.status === 'pending' && (
        <Button 
          variant="destructive"
          className="w-full"
          onClick={() => {
            if (confirm('¿Estás seguro de que deseas cancelar esta venta?')) {
              onCancelSale(sale.id);
            }
          }}
        >
          <XCircle className="h-4 w-4 mr-2" />
          Cancelar venta
        </Button>
      )}
    </div>
  );
};
