
import { Truck, MapPin, Info } from "lucide-react";

interface ShippingProps {
  shipping?: {
    isFree?: boolean;
    hasPickup?: boolean;
    hasMultipleOptions?: boolean;
    cost?: number;
  };
}

export const ProductShippingInfo = ({ shipping }: ShippingProps) => {
  if (!shipping) return null;
  
  if (shipping.isFree) {
    return (
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-green-500" />
        <span className="text-sm font-medium text-green-600">Envío gratis</span>
      </div>
    );
  }
  
  if (shipping.hasPickup) {
    return (
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-auction-secondary" />
        <span className="text-sm">Recogida en mano disponible</span>
      </div>
    );
  }
  
  if (shipping.hasMultipleOptions) {
    return (
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-auction-secondary" />
        <span className="text-sm">Opciones de envío disponibles</span>
      </div>
    );
  }
  
  if (shipping.cost) {
    return (
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-auction-secondary" />
        <span className="text-sm">
          Envío: {shipping.cost.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
        </span>
      </div>
    );
  }
  
  return null;
};
