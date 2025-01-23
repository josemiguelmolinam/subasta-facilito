import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Heart } from "lucide-react";

interface ProductCardProps {
  title: string;
  currentBid: number;
  buyNowPrice?: number;
  timeLeft: string;
  imageUrl: string;
}

export const ProductCard = ({
  title,
  currentBid,
  buyNowPrice,
  timeLeft,
  imageUrl,
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
          <Heart className="w-5 h-5 text-auction-dark" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-auction-dark line-clamp-2">
            {title}
          </h3>
          
          <div className="flex items-center space-x-2 text-sm text-auction-secondary">
            <Clock className="w-4 h-4" />
            <span>{timeLeft}</span>
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
              <span className="text-sm text-auction-secondary">Comprar ahora</span>
              <span className="font-semibold text-auction-primary">
                {buyNowPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline"
            className="w-full hover:bg-auction-soft hover:text-auction-primary transition-colors"
          >
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