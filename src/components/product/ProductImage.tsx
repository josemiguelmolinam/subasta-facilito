
import { Heart } from "lucide-react";
import { ConditionBadge, StatusBadges } from "./ProductBadges";

interface ProductImageProps {
  imageUrl: string;
  title: string;
  condition?: 'new' | 'like-new' | 'used';
  isTrending?: boolean;
  isEnding?: boolean;
  isExclusive?: boolean;
  isFeatured?: boolean;
}

export const ProductImage = ({ 
  imageUrl,
  title,
  condition,
  isTrending,
  isEnding,
  isExclusive,
  isFeatured
}: ProductImageProps) => {
  return (
    <div className="relative overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <ConditionBadge condition={condition} />
      <StatusBadges 
        isTrending={isTrending} 
        isEnding={isEnding} 
        isExclusive={isExclusive} 
        isFeatured={isFeatured} 
      />
      <button 
        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors hover:scale-110 duration-300"
        aria-label="Añadir a favoritos"
      >
        <Heart className="w-5 h-5 text-auction-dark hover:text-pink-500 transition-colors" />
      </button>
    </div>
  );
};
