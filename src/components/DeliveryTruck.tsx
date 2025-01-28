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
    <div className="relative bg-gradient-to-br from-auction-soft via-white to-auction-soft p-8 rounded-xl shadow-lg">
      {/* Enhanced Progress Track with Double Gradient */}
      <div className="h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-auction-primary/20 to-auction-secondary/20 animate-shimmer" />
        <div 
          className={`h-full bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-primary rounded-full transition-all duration-1000 ease-in-out ${getProgressWidth()}`}
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>

      {/* Delivery Steps with Enhanced Icons and Animations */}
      <div className="flex justify-between mb-8 relative">
        {[
          { icon: Package, label: 'Pedido recibido', status: 'En preparación' },
          { icon: Package, label: 'Preparando', status: 'En preparación' },
          { icon: Truck, label: 'En tránsito', status: 'En tránsito' },
          { icon: Home, label: 'Entregado', status: 'Entregado' }
        ].map((step, index) => (
          <div key={index} className="flex flex-col items-center relative group">
            <div 
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-500
                ${status === step.status 
                  ? 'bg-gradient-to-br from-auction-primary to-auction-secondary scale-110 shadow-lg' 
                  : 'bg-gray-100 group-hover:bg-auction-soft'}`}
            >
              <step.icon 
                className={`w-7 h-7 transition-all duration-300 transform group-hover:scale-110
                  ${status === step.status ? 'text-white' : 'text-auction-secondary'}`} 
              />
            </div>
            <span className="text-sm font-medium text-auction-secondary whitespace-nowrap">
              {step.label}
            </span>
            {status === step.status && (
              <div className="absolute -top-2 -right-2">
                <div className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-auction-primary opacity-75"></div>
                <div className="relative inline-flex rounded-full h-3 w-3 bg-auction-secondary"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Animated Truck with Enhanced Effects */}
      <div className={`
        absolute top-14 transform -translate-y-full transition-all duration-1000 ease-in-out
        ${status === 'En preparación' ? 'left-1/4' :
          status === 'En tránsito' ? 'left-3/4' :
          status === 'Entregado' ? 'left-full' : 'left-0'}
      `}>
        <div className="relative">
          {/* Enhanced Shadow Effect */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-black/20 rounded-full blur-sm transform-gpu animate-pulse"></div>
          
          {/* Enhanced Truck Icon with Multiple Animations */}
          <div className="bg-gradient-to-br from-auction-primary to-auction-secondary p-4 rounded-xl shadow-xl animate-float transform-gpu hover:scale-110 transition-transform duration-300">
            <Truck className="w-10 h-10 text-white transform-gpu animate-pulse" />
          </div>
          
          {/* Enhanced Status Indicator */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-xl">
            <span className="text-sm font-semibold bg-gradient-to-r from-auction-primary to-auction-secondary bg-clip-text text-transparent whitespace-nowrap animate-pulse">
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};