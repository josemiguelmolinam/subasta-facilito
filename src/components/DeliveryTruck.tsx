import { Package, Truck, Home, CheckCircle } from 'lucide-react';

interface DeliveryTruckProps {
  status: string;
}

export const DeliveryTruck = ({ status }: DeliveryTruckProps) => {
  const getProgressWidth = () => {
    switch (status) {
      case 'En preparación':
        return 'w-1/4';
      case 'En tránsito':
        return 'w-3/4';
      case 'Entregado':
        return 'w-full';
      default:
        return 'w-0';
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-auction-soft to-white p-8 rounded-xl shadow-lg">
      {/* Progress Track with Gradient */}
      <div className="h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-12">
        <div 
          className={`h-full bg-gradient-to-r from-auction-primary to-auction-secondary rounded-full transition-all duration-1000 ease-in-out ${getProgressWidth()}`}
        />
      </div>

      {/* Delivery Steps with Enhanced Icons */}
      <div className="flex justify-between mb-8 relative">
        <div className="flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300
            ${status === 'En preparación' ? 'bg-auction-primary text-white scale-110' : 'bg-gray-100'}`}>
            <Package className={`w-6 h-6 ${status === 'En preparación' ? 'text-white' : 'text-auction-secondary'}`} />
          </div>
          <span className="text-sm font-medium text-auction-secondary">Pedido recibido</span>
        </div>

        <div className="flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300
            ${status === 'En preparación' ? 'bg-auction-primary text-white scale-110' : 'bg-gray-100'}`}>
            <Package className={`w-6 h-6 ${status === 'En preparación' ? 'text-white' : 'text-auction-secondary'}`} />
          </div>
          <span className="text-sm font-medium text-auction-secondary">Preparando</span>
        </div>

        <div className="flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300
            ${status === 'En tránsito' ? 'bg-auction-primary text-white scale-110' : 'bg-gray-100'}`}>
            <Truck className={`w-6 h-6 ${status === 'En tránsito' ? 'text-white' : 'text-auction-secondary'}`} />
          </div>
          <span className="text-sm font-medium text-auction-secondary">En tránsito</span>
        </div>

        <div className="flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300
            ${status === 'Entregado' ? 'bg-auction-primary text-white scale-110' : 'bg-gray-100'}`}>
            <Home className={`w-6 h-6 ${status === 'Entregado' ? 'text-white' : 'text-auction-secondary'}`} />
          </div>
          <span className="text-sm font-medium text-auction-secondary">Entregado</span>
        </div>
      </div>

      {/* Animated Truck with Enhanced Effects */}
      <div className={`
        absolute top-14 transform -translate-y-full transition-all duration-1000 ease-in-out
        ${status === 'En preparación' ? 'left-1/4' :
          status === 'En tránsito' ? 'left-3/4' :
          status === 'Entregado' ? 'left-full' : 'left-0'}
      `}>
        <div className="relative">
          {/* Shadow Effect */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/10 rounded-full blur-sm"></div>
          
          {/* Truck Icon with Animation */}
          <div className="bg-auction-primary p-3 rounded-lg shadow-lg animate-float">
            <Truck className="w-8 h-8 text-white" />
          </div>
          
          {/* Status Indicator */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md">
            <span className="text-xs font-medium text-auction-secondary whitespace-nowrap">
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};