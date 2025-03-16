
import { Button } from "@/components/ui/button";
import { Gavel } from "lucide-react";

interface ProductActionsProps {
  buyNowPrice?: number;
}

export const ProductActions = ({ buyNowPrice }: ProductActionsProps) => {
  return (
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
  );
};
