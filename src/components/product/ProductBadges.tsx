
import { Badge } from "@/components/ui/badge";
import { Flame, Star, Info, Zap, Timer, Award } from "lucide-react";

interface ConditionBadgeProps {
  condition?: 'new' | 'like-new' | 'used';
}

export const ConditionBadge = ({ condition }: ConditionBadgeProps) => {
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

interface StatusBadgesProps {
  isTrending?: boolean;
  isEnding?: boolean;
  isExclusive?: boolean;
  isFeatured?: boolean;
}

export const StatusBadges = ({ isTrending, isEnding, isExclusive, isFeatured }: StatusBadgesProps) => {
  if (!isTrending && !isEnding && !isExclusive && !isFeatured) {
    return null;
  }
  
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
