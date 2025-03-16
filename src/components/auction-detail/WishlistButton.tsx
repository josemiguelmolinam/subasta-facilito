
import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/components/ui/use-toast";

interface WishlistButtonProps {
  auctionId: string;
  auctionData: any; // Using any type here for brevity, can be typed more precisely
}

export const WishlistButton = ({ auctionId, auctionData }: WishlistButtonProps) => {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const { toast } = useToast();
  
  const inWishlist = isInWishlist(auctionId);
  
  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeItem(auctionId);
      toast({
        title: "Eliminado de favoritos",
        description: "El artículo ha sido eliminado de tu lista de favoritos",
      });
    } else {
      addItem(auctionData);
      toast({
        title: "Añadido a favoritos",
        description: "El artículo ha sido añadido a tu lista de favoritos",
      });
    }
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleToggleWishlist}
      className={`gap-2 ${inWishlist ? 'text-red-500 hover:text-red-600' : ''}`}
    >
      <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
      {inWishlist ? 'En favoritos' : 'Añadir a favoritos'}
    </Button>
  );
};
