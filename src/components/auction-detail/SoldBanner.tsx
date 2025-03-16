
import React from "react";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/currency";

interface SoldBannerProps {
  finalPrice: number;
  soldDate: Date;
}

export const SoldBanner = ({ finalPrice, soldDate }: SoldBannerProps) => (
  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg shadow-md mb-6 animate-fade-in">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-full">
          <ShoppingBag className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-bold text-lg">¡Artículo Vendido!</h3>
          <p className="text-sm text-purple-100">
            Este artículo fue vendido el {soldDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
      <Badge className="bg-white text-purple-800 border-0">
        {formatCurrency(finalPrice)}
      </Badge>
    </div>
  </div>
);
