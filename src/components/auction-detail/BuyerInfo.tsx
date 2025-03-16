
import React from "react";
import { Star, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BuyerInfoProps {
  buyer: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
}

export const BuyerInfo = ({ buyer }: BuyerInfoProps) => (
  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6 animate-fade-in">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={buyer.avatar} />
          <AvatarFallback>{buyer.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-purple-600">Comprador</p>
          <p className="font-semibold">{buyer.name}</p>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm">{buyer.rating}</span>
          </div>
        </div>
      </div>
      <Trophy className="h-10 w-10 text-yellow-500" />
    </div>
  </div>
);
