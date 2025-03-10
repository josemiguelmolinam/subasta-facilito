
import React, { useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { MySalesList } from '@/components/profile/MySalesList';
import { SalesLoadingState } from '@/components/profile/SalesLoadingState';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSalesManagement } from '@/hooks/useSalesManagement';

const MySalesPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { 
    sales, 
    handleUpdateTracking, 
    handleMarkShipped, 
    handleMarkDelivered, 
    handleCancelSale 
  } = useSalesManagement();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 mt-16">
          <SalesLoadingState />
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
