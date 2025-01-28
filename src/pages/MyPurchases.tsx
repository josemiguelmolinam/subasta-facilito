import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DeliveryTruck } from '@/components/DeliveryTruck';
import { PurchaseCard } from '@/components/PurchaseCard';
import { PurchaseFilters } from '@/components/PurchaseFilters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

const fetchPurchases = async () => {
  console.log('Fetching purchases...');
  return [
    {
      id: '1',
      title: 'iPhone 15 Pro Max',
      image: 'https://picsum.photos/200/300',
      purchaseDate: new Date('2024-03-15'),
      totalPrice: 1299.99,
      paymentMethod: 'Tarjeta de crédito',
      status: 'En tránsito',
      seller: {
        id: '1',
        name: 'Apple Store',
        email: 'support@apple.com'
      }
    },
    {
      id: '2',
      title: 'MacBook Pro M3',
      image: 'https://picsum.photos/200/301',
      purchaseDate: new Date('2024-03-10'),
      totalPrice: 2499.99,
      paymentMethod: 'PayPal',
      status: 'Entregado',
      seller: {
        id: '2',
        name: 'Mac Store',
        email: 'support@mac.com'
      }
    },
  ];
};

const MyPurchases = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const { data: purchases, isLoading } = useQuery({
    queryKey: ['purchases'],
    queryFn: fetchPurchases,
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-auction-primary" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        <h1 className="text-2xl md:text-3xl font-bold text-auction-dark mb-6 md:mb-8">Mis Compras</h1>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 md:mb-8">
          <PurchaseFilters 
            currentFilter={currentFilter} 
            onFilterChange={setCurrentFilter} 
          />
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px] bg-white">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Más recientes</SelectItem>
              <SelectItem value="date-asc">Más antiguos</SelectItem>
              <SelectItem value="price-desc">Mayor precio</SelectItem>
              <SelectItem value="price-asc">Menor precio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <DeliveryTruck status="En tránsito" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {purchases?.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyPurchases;
