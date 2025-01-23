import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Heart, Gavel } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  title: string;
  currentBid: number;
  buyNowPrice?: number;
  timeLeft: string;
  imageUrl: string;
  totalBids?: number;
  isEnding?: boolean;
}

export const ProductCard = ({
  title,
  currentBid,
  buyNowPrice,
  timeLeft,
  imageUrl,
  totalBids = 0,
  isEnding = false,
}: ProductCardProps) => {
  const minutesLeft = parseInt(timeLeft);
  const isEndingSoon = !isNaN(minutesLeft) && minutesLeft < 10;

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-xl",
      isEndingSoon && "border-2 border-red-500"
    )}>
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg hover:scale-110 transform duration-200">
          <Heart className="w-5 h-5 text-auction-dark" />
        </button>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-xl text-auction-dark line-clamp-2 group-hover:text-auction-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className={cn(
                "w-5 h-5",
                isEndingSoon ? "text-red-500 animate-pulse" : "text-auction-secondary"
              )} />
              <span className={cn(
                "font-medium",
                isEndingSoon ? "text-red-500" : "text-auction-secondary"
              )}>
                {timeLeft}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-auction-secondary">
              <Gavel className="w-5 h-5" />
              <span>{totalBids} pujas</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-auction-secondary">Puja actual</span>
            <span className="text-2xl font-bold text-auction-primary">
              {currentBid.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
          
          {buyNowPrice && (
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm text-auction-secondary">Comprar ahora</span>
              <span className="text-lg font-semibold text-auction-secondary">
                {buyNowPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button 
            variant="outline"
            className="w-full hover:bg-auction-soft hover:text-auction-primary transition-colors text-base py-6"
          >
            Pujar
          </Button>
          {buyNowPrice && (
            <Button 
              className="w-full bg-auction-primary hover:bg-auction-secondary text-white transition-colors text-base py-6"
            >
              Comprar
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};