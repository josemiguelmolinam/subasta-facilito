import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Heart, 
  Gavel, 
  Truck, 
  MapPin, 
  Info, 
  Star, 
  Flame, 
  Award, 
  Zap, 
  Timer 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  currentBid: number;
  buyNowPrice?: number;
  timeLeft: string;
  imageUrl: string;
  totalBids?: number;
  condition?: 'new' | 'like-new' | 'used';
  isTrending?: boolean;
  isEnding?: boolean;
  isExclusive?: boolean;
  isFeatured?: boolean;
  shipping?: {
    isFree?: boolean;
    hasPickup?: boolean;
    hasMultipleOptions?: boolean;
    cost?: number;
  };
  className?: string;
}

export const ProductCard = ({
  title,
  currentBid,
  buyNowPrice,
  timeLeft,
  imageUrl,
  totalBids = 0,
  condition,
  isTrending,
  isEnding,
  isExclusive,
  isFeatured,
  shipping,
  className,
}: ProductCardProps) => {
  const getConditionBadge = () => {
    switch (condition) {
      case 'new':
        return (
          <Badge className="absolute top-3 left-3 bg-green-500 text-white border-0 gap-1">
            <Flame className="w-3 h-3" /> Nuevo
          </Badge>
        );
      case 'like-new':
        return (
          <Badge className="absolute top-3 left-3 bg-blue-500 text-white border-0 gap-1">
            <Star className="w-3 h-3" /> Como nuevo
          </Badge>
        );
      case 'used':
        return (
          <Badge className="absolute top-3 left-3 bg-gray-500 text-white border-0 gap-1">
            <Info className="w-3 h-3" /> Usado
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusBadges = () => {
    return (
      <div className="absolute top-3 right-12 flex flex-col gap-2">
        {isTrending && (
          <Badge className="bg-purple-500 text-white border-0 gap-1">
            <Zap className="w-3 h-3" /> En tendencia
          </Badge>
        )}
        {isEnding && (
          <Badge className="bg-red-500 text-white border-0 gap-1">
            <Timer className="w-3 h-3" /> Última oportunidad
          </Badge>
        )}
        {isExclusive && (
          <Badge className="bg-yellow-500 text-white border-0 gap-1">
            <Award className="w-3 h-3" /> Exclusivo
          </Badge>
        )}
        {isFeatured && (
          <Badge className="bg-auction-primary text-white border-0 gap-1">
            <Star className="w-3 h-3" /> Destacado
          </Badge>
        )}
      </div>
    );
  };

  const getShippingBadge = () => {
    if (shipping?.isFree) {
      return (
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-600">Envío gratis</span>
        </div>
      );
    }
    if (shipping?.hasPickup) {
      return (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-auction-secondary" />
          <span className="text-sm">Recogida en mano disponible</span>
        </div>
      );
    }
    if (shipping?.hasMultipleOptions) {
      return (
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-auction-secondary" />
          <span className="text-sm">Opciones de envío disponibles</span>
        </div>
      );
    }
    if (shipping?.cost) {
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

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-lg bg-white",
      className
    )}>
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {getConditionBadge()}
        {getStatusBadges()}
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors hover:scale-110 duration-300"
          aria-label="Añadir a favoritos"
        >
          <Heart className="w-5 h-5 text-auction-dark hover:text-pink-500 transition-colors" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-auction-dark line-clamp-2 group-hover:text-auction-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-auction-secondary">
              <Clock className={cn(
                "w-4 h-4",
                isEnding ? "text-red-500 animate-pulse" : ""
              )} />
              <span className={cn(
                isEnding ? "text-red-500 font-medium" : ""
              )}>{timeLeft}</span>
            </div>
            
            <Badge variant="secondary" className="gap-1">
              <Gavel className="w-3 h-3" />
              {totalBids} pujas
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-auction-secondary">Puja actual</span>
            <span className="font-semibold text-auction-dark">
              {currentBid.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
          
          {buyNowPrice && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#D946EF]">Cómpralo ya</span>
              <span className="text-base font-semibold text-black">
                {buyNowPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            {getShippingBadge()}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline"
            className="w-full bg-red-500 hover:bg-red-600 text-white border-0 transition-colors"
          >
            <Gavel className="w-4 h-4 mr-1" />
            Pujar
          </Button>
          {buyNowPrice && (
            <Button 
              className="w-full bg-auction-primary hover:bg-auction-secondary text-white transition-colors"
            >
              Comprar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};