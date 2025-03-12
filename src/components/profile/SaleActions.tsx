
import React from 'react';
import { Button } from "@/components/ui/button";
import { XCircle, Check } from "lucide-react";
import { Sale } from "@/types/sales";

interface SaleActionsProps {
  sale: Sale;
  onMarkDelivered: (saleId: string) => void;
  onCancelSale: (saleId: string) => void;
}

export const SaleActions = ({ sale, onMarkDelivered, onCancelSale }: SaleActionsProps) => {
  return (
    <div className="pt-2 space-y-3">
      {/* Added back the "Confirmar Entrega" button for sales with status 'shipped' */}
      {sale.status === 'shipped' && (
        <Button 
          variant="default"
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => {
            if (confirm('¿Confirmas que el producto ha sido entregado correctamente?')) {
              onMarkDelivered(sale.id);
            }
          }}
        >
          <Check className="h-4 w-4 mr-2" />
          Confirmar Entrega
        </Button>
      )}
      
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
