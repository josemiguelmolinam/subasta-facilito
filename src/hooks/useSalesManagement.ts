
import { useState } from 'react';
import { Sale } from "@/types/sales";
import { useToast } from '@/hooks/use-toast';
import { mockSales } from '@/data/MockSalesData';

export const useSalesManagement = () => {
  const { toast } = useToast();
  const [sales, setSales] = useState<Sale[]>(mockSales);

  // Handler for updating tracking information
  const handleUpdateTracking = (saleId: string, trackingNumber: string, carrier: string) => {
    setSales(sales.map(sale => {
      if (sale.id === saleId) {
        return {
          ...sale,
          shipping: {
            ...(sale.shipping || {}),
            trackingNumber,
            carrier,
            estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // Estimated: 5 days from now
          }
        };
      }
      return sale;
    }));
    
    toast({
      title: "Información de envío actualizada",
      description: "Se ha actualizado el número de seguimiento y transportista"
    });
  };

  // Handler for marking a sale as shipped
  const handleMarkShipped = (saleId: string) => {
    setSales(sales.map(sale => {
      if (sale.id === saleId) {
        return {
          ...sale,
          status: 'shipped',
          shipping: {
            ...(sale.shipping || {}),
            trackingNumber: sale.shipping?.trackingNumber || '',
            carrier: sale.shipping?.carrier || '',
            estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // Estimated: 5 days from now
          }
        };
      }
      return sale;
    }));
    
    toast({
      title: "Venta actualizada",
      description: "El producto ha sido marcado como enviado"
    });
  };

  // Handler for marking a sale as delivered
  const handleMarkDelivered = (saleId: string) => {
    setSales(sales.map(sale => {
      if (sale.id === saleId) {
        return {
          ...sale,
          status: 'delivered',
          paymentReleased: true,
          shipping: {
            ...(sale.shipping || {}),
            trackingNumber: sale.shipping?.trackingNumber || '',
            carrier: sale.shipping?.carrier || '',
            estimatedDelivery: sale.shipping?.estimatedDelivery || new Date()
          }
        };
      }
      return sale;
    }));
    
    toast({
      title: "Entrega confirmada",
      description: "Se ha marcado como entregado y el pago ha sido liberado"
    });
  };

  // Handler for cancelling a sale
  const handleCancelSale = (saleId: string) => {
    setSales(sales.map(sale => {
      if (sale.id === saleId) {
        return {
          ...sale,
          status: 'cancelled',
          shipping: {
            ...(sale.shipping || {}),
            trackingNumber: sale.shipping?.trackingNumber || '',
            carrier: sale.shipping?.carrier || '',
            estimatedDelivery: sale.shipping?.estimatedDelivery || new Date()
          }
        };
      }
      return sale;
    }));
    
    toast({
      title: "Venta cancelada",
      description: "La venta ha sido cancelada correctamente"
    });
  };

  return {
    sales,
    handleUpdateTracking,
    handleMarkShipped,
    handleMarkDelivered,
    handleCancelSale
  };
};
