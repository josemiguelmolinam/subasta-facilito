
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { MySalesList } from '@/components/profile/MySalesList';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Sale } from '@/types/sales';

// Mock data for demonstration
const mockSales: Sale[] = [
  {
    id: "sale1",
    title: "iPhone 15 Pro Max - 256GB",
    image: "https://images.unsplash.com/photo-1633053699034-459674171bec?q=80&w=500",
    price: 1199.99,
    saleDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    status: 'pending',
    buyer: {
      id: "buyer1",
      name: "Carlos Méndez",
      email: "carlos@example.com"
    },
    paymentReleased: false
  },
  {
    id: "sale2",
    title: "MacBook Pro M3 - 14 pulgadas",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500",
    price: 1799.99,
    saleDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    status: 'shipped',
    buyer: {
      id: "buyer2",
      name: "Laura Fernández",
      email: "laura@example.com"
    },
    shipping: {
      trackingNumber: "SP123456789ES",
      carrier: "SEUR",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    },
    paymentReleased: false
  },
  {
    id: "sale3",
    title: "Samsung Galaxy S23 Ultra",
    image: "https://images.unsplash.com/photo-1614634224242-3bfcbf1f3f41?q=80&w=500",
    price: 899.99,
    saleDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    status: 'delivered',
    buyer: {
      id: "buyer3",
      name: "Miguel Ángel",
      email: "miguelangel@example.com"
    },
    shipping: {
      trackingNumber: "MR987654321ES",
      carrier: "MRW",
      estimatedDelivery: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    paymentReleased: false
  },
  {
    id: "sale4",
    title: "iPad Air 5",
    image: "https://images.unsplash.com/photo-1635016372614-52ee1837e8d6?q=80&w=500",
    price: 599.99,
    saleDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    status: 'completed',
    buyer: {
      id: "buyer4",
      name: "Sandra López",
      email: "sandra@example.com"
    },
    shipping: {
      trackingNumber: "CR123456789ES",
      carrier: "Correos",
      estimatedDelivery: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) // 20 days ago
    },
    paymentReleased: true
  }
];

const MySalesPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sales, setSales] = useState<Sale[]>(mockSales);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

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

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-auction-primary"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-auction-dark mb-2">Mis Ventas</h1>
          <p className="text-gray-600">
            Gestiona tus ventas, actualiza la información de envío y confirma las entregas
          </p>
        </div>

        <MySalesList
          sales={sales}
          onUpdateTracking={handleUpdateTracking}
          onMarkShipped={handleMarkShipped}
          onMarkDelivered={handleMarkDelivered}
          onCancelSale={handleCancelSale}
        />
      </div>
    </MainLayout>
  );
};

export default MySalesPage;
