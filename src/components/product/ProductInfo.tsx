
import { Clock, Gavel } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  title: string;
  timeLeft: string;
  isEnding?: boolean;
  totalBids?: number;
}

export const ProductInfo = ({ 
  title, 
  timeLeft, 
  isEnding = false, 
  totalBids = 0 
}: ProductInfoProps) => {
  return (
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
  );
};
