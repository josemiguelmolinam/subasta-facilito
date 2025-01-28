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
    <div className="relative">
      {/* Progress Track */}
      <div className="h-2 bg-gray-200 rounded-full mb-8">
        <div 
          className={`h-full bg-auction-primary rounded-full transition-all duration-1000 ease-in-out ${getProgressWidth()}`}
        />
      </div>

      {/* Delivery Steps */}
      <div className="flex justify-between mb-8">
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
            ${status === 'En preparación' ? 'bg-auction-primary text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <span className="text-sm text-auction-secondary">Pedido recibido</span>
        </div>

        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
            ${status === 'En preparación' ? 'bg-auction-primary text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <span className="text-sm text-auction-secondary">Preparando</span>
        </div>

        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
            ${status === 'En tránsito' ? 'bg-auction-primary text-white' : 'bg-gray-200'}`}>
            3
          </div>
          <span className="text-sm text-auction-secondary">En tránsito</span>
        </div>

        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
            ${status === 'Entregado' ? 'bg-auction-primary text-white' : 'bg-gray-200'}`}>
            4
          </div>
          <span className="text-sm text-auction-secondary">Entregado</span>
        </div>
      </div>

      {/* Animated Truck */}
      <div className={`
        absolute top-12 transform -translate-y-full transition-all duration-1000 ease-in-out
        ${status === 'En preparación' ? 'left-1/4' :
          status === 'En tránsito' ? 'left-3/4' :
          status === 'Entregado' ? 'left-full' : 'left-0'}
      `}>
        <svg
          className="w-12 h-12 animate-float"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 15H17V13H19M19 11H17V9H19M19 7H17V5H19M15 15H13V13H15M15 11H13V9H15M15 7H13V5H15M11 15H9V13H11M11 11H9V9H11M11 7H9V5H11M7 15H5V13H7M7 11H5V9H7M7 7H5V5H7"
            fill="#9b87f5"
          />
          <path
            d="M3 21V3H21V21H3ZM5 19H19V5H5V19Z"
            fill="#9b87f5"
          />
        </svg>
      </div>
    </div>
  );
};