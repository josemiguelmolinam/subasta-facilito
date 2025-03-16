
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { ProductPricing } from "./ProductPricing";
import { ProductActions } from "./ProductActions";

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
  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-lg bg-white",
      className
    )}>
      <ProductImage 
        imageUrl={imageUrl}
        title={title}
        condition={condition}
        isTrending={isTrending}
        isEnding={isEnding}
        isExclusive={isExclusive}
        isFeatured={isFeatured}
      />
      
      <div className="p-4 space-y-4">
        <ProductInfo 
          title={title}
          timeLeft={timeLeft}
          isEnding={isEnding}
          totalBids={totalBids}
        />
        
        <ProductPricing 
          currentBid={currentBid}
          buyNowPrice={buyNowPrice}
          shipping={shipping}
        />
        
        <ProductActions buyNowPrice={buyNowPrice} />
      </div>
    </Card>
  );
};
