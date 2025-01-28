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
    <div className="relative bg-gradient-to-br from-auction-soft via-white to-auction-soft p-4 md:p-8 rounded-xl shadow-lg overflow-hidden">
      {/* Enhanced Progress Track with Gradient and Shimmer */}
      <div className="h-2 md:h-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full mb-8 md:mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-auction-primary/20 to-auction-secondary/20 animate-shimmer" />
        <div 
          className={`h-full bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-primary rounded-full transition-all duration-1000 ease-in-out ${getProgressWidth()}`}
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>

      {/* Delivery Steps with Professional Icons and Responsive Design */}
      <div className="flex justify-between mb-6 md:mb-8 relative">
        {[
          { icon: Package, label: 'Pedido recibido', status: 'En preparación', description: 'Procesando' },
          { icon: Package, label: 'En preparación', status: 'En preparación', description: 'Empaquetando' },
          { icon: Truck, label: 'En tránsito', status: 'En tránsito', description: 'En camino' },
          { icon: Home, label: 'Entregado', status: 'Entregado', description: 'Completado' }
        ].map((step, index) => (
          <div key={index} className="flex flex-col items-center relative group">
            <div 
              className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2 md:mb-3 transition-all duration-500
                ${status === step.status 
                  ? 'bg-gradient-to-br from-auction-primary to-auction-secondary scale-110 shadow-lg' 
                  : 'bg-gray-100 group-hover:bg-auction-soft'}`}
            >
              <step.icon 
                className={`w-5 h-5 md:w-7 md:h-7 transition-all duration-300 transform group-hover:scale-110
                  ${status === step.status ? 'text-white' : 'text-auction-secondary'}`} 
              />
            </div>
            <span className="hidden md:block text-sm font-medium text-auction-secondary whitespace-nowrap">
              {step.label}
            </span>
            <span className="block md:hidden text-xs font-medium text-auction-secondary whitespace-nowrap">
              {step.description}
            </span>
            {status === step.status && (
              <div className="absolute -top-2 -right-2">
                <div className="animate-ping absolute inline-flex h-2 w-2 md:h-3 md:w-3 rounded-full bg-auction-primary opacity-75"></div>
                <div className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-auction-secondary"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Professional Animated Truck with Enhanced Mobile Responsiveness */}
      <div className={`
        absolute top-10 md:top-14 transform -translate-y-full transition-all duration-1000 ease-in-out
        ${status === 'En preparación' ? 'left-1/4' :
          status === 'En tránsito' ? 'left-3/4' :
          status === 'Entregado' ? 'left-full' : 'left-0'}
      `}>
        <div className="relative">
          {/* Enhanced Shadow Effect */}
          <div className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 w-8 md:w-12 h-2 md:h-3 bg-black/20 rounded-full blur-sm transform-gpu animate-pulse"></div>
          
          {/* Professional Truck Icon with Multiple Animations */}
          <div className="bg-gradient-to-br from-auction-primary to-auction-secondary p-2 md:p-4 rounded-xl shadow-xl animate-float transform-gpu hover:scale-110 transition-transform duration-300">
            <Truck className="w-6 h-6 md:w-10 md:h-10 text-white transform-gpu animate-pulse" />
          </div>
          
          {/* Enhanced Status Indicator */}
          <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1 md:px-4 md:py-2 rounded-full shadow-xl">
            <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-auction-primary to-auction-secondary bg-clip-text text-transparent whitespace-nowrap animate-pulse">
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};