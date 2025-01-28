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
    <div className="relative bg-gradient-to-br from-auction-soft via-white to-auction-soft p-4 md:p-6 rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* Enhanced Progress Track */}
      <div className="h-2 md:h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full mb-6 md:mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-auction-primary/20 to-auction-secondary/20 animate-shimmer" />
        <div 
          className={`h-full bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-primary rounded-full transition-all duration-1000 ease-in-out ${getProgressWidth()}`}
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>

      {/* Delivery Steps with Professional Icons */}
      <div className="flex justify-between mb-4 md:mb-6 relative">
        {[
          { icon: Package, label: 'Pedido recibido', status: 'En preparación', description: 'Procesando' },
          { icon: Package, label: 'En preparación', status: 'En preparación', description: 'Empaquetando' },
          { icon: Truck, label: 'En tránsito', status: 'En tránsito', description: 'En camino' },
          { icon: Home, label: 'Entregado', status: 'Entregado', description: 'Completado' }
        ].map((step, index) => (
          <div key={index} className="flex flex-col items-center relative group">
            <div 
              className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500
                ${status === step.status 
                  ? 'bg-gradient-to-br from-auction-primary to-auction-secondary scale-105 shadow-lg' 
                  : 'bg-gray-100 group-hover:bg-auction-soft'}`}
            >
              <step.icon 
                className={`w-4 h-4 md:w-6 md:h-6 transition-all duration-300
                  ${status === step.status ? 'text-white' : 'text-auction-secondary'}`} 
              />
            </div>
            <span className="hidden md:block text-xs md:text-sm font-medium text-auction-secondary text-center">
              {step.label}
            </span>
            <span className="block md:hidden text-[10px] font-medium text-auction-secondary text-center">
              {step.description}
            </span>
            {status === step.status && (
              <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2">
                <div className="animate-pulse absolute inline-flex h-2 w-2 md:h-3 md:w-3 rounded-full bg-auction-primary opacity-75"></div>
                <div className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-auction-secondary"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Professional Animated Truck */}
      <div className={`
        absolute top-8 md:top-12 transform -translate-y-1/2 transition-all duration-1000 ease-in-out
        ${status === 'En preparación' ? 'left-1/4' :
          status === 'En tránsito' ? 'left-3/4' :
          status === 'Entregado' ? 'left-full' : 'left-0'}
      `}>
        <div className="relative">
          {/* Enhanced Shadow */}
          <div className="absolute -bottom-1 md:-bottom-2 left-1/2 -translate-x-1/2 w-6 md:w-10 h-1.5 md:h-2 bg-black/10 rounded-full blur-sm"></div>
          
          {/* Professional Truck Icon */}
          <div className="bg-gradient-to-br from-auction-primary to-auction-secondary p-2 md:p-3 rounded-lg shadow-lg transform-gpu transition-all duration-300 hover:scale-105">
            <Truck className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          
          {/* Status Indicator */}
          <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-full shadow-md">
            <span className="text-[10px] md:text-xs font-semibold bg-gradient-to-r from-auction-primary to-auction-secondary bg-clip-text text-transparent whitespace-nowrap">
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};