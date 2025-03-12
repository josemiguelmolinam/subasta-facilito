
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { MyPurchasesList } from '@/components/profile/MyPurchasesList';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Mock data service para simular la carga de compras desde una API
const fetchPurchases = async () => {
  // Simulamos una carga de datos
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: "pur1",
      title: "iPhone 15 Pro Max - 256GB",
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80",
      purchaseDate: new Date('2023-11-15'),
      price: 1299.99,
      status: 'delivered',
      paymentMethod: 'credit_card',
      paymentReleased: false,
      seller: {
        id: "sel1",
        name: "Carlos López",
        email: "carlos@ejemplo.com"
      },
      shipping: {
        trackingNumber: "ESP1234567890",
        carrier: "Correos Express",
        estimatedDelivery: new Date('2023-11-20')
      }
    },
    {
      id: "pur2",
      title: "MacBook Pro M3 - 14 pulgadas",
      image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&q=80",
      purchaseDate: new Date('2023-10-20'),
      price: 2499.99,
      status: 'shipped',
      paymentMethod: 'paypal',
      paymentReleased: false,
      seller: {
        id: "sel2",
        name: "Laura Martinez",
        email: "laura@ejemplo.com"
      },
      shipping: {
        trackingNumber: "MRW9876543210",
        carrier: "MRW",
        estimatedDelivery: new Date('2023-11-25')
      }
    },
    {
      id: "pur3",
      title: "AirPods Pro 2",
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80",
      purchaseDate: new Date('2023-10-05'),
      price: 279.99,
      status: 'completed',
      paymentMethod: 'transfer',
      paymentReleased: true,
      seller: {
        id: "sel3",
        name: "Antonio Ruiz",
        email: "antonio@ejemplo.com"
      },
      shipping: {
        trackingNumber: "SEUR1234567890",
        carrier: "SEUR",
        estimatedDelivery: new Date('2023-10-12')
      }
    }
  ];
};

const MyPurchasesPage = () => {
  const { toast } = useToast();
  
  // Consulta de datos con React Query
  const { data: purchases, isLoading } = useQuery({
    queryKey: ['purchases'],
    queryFn: fetchPurchases,
  });

  // Manejador para liberar el pago
  const handleReleasePayment = (purchaseId: string) => {
    // Aquí iría la lógica real para liberar el pago
    console.log(`Liberando pago para la compra: ${purchaseId}`);
    toast({
      title: "Pago liberado",
      description: "El pago ha sido liberado al vendedor correctamente"
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-8">
        <h1 className="text-3xl font-bold text-auction-dark mb-8">Mis Compras</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-auction-primary" />
          </div>
        ) : (
          <MyPurchasesList 
            purchases={purchases || []} 
            onReleasePayment={handleReleasePayment} 
          />
        )}
      </div>
    </MainLayout>
  );
};

export default MyPurchasesPage;
