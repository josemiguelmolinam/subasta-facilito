
import { ProductShippingInfo } from "./ProductShippingInfo";

interface ProductPricingProps {
  currentBid: number;
  buyNowPrice?: number;
  shipping?: {
    isFree?: boolean;
    hasPickup?: boolean;
    hasMultipleOptions?: boolean;
    cost?: number;
  };
}

export const ProductPricing = ({ currentBid, buyNowPrice, shipping }: ProductPricingProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-auction-secondary">Puja actual</span>
        <span className="font-semibold text-auction-dark">
          {currentBid.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
        </span>
      </div>
      
      {buyNowPrice && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-[#D946EF]">Cómpralo ya</span>
          <span className="text-base font-semibold text-black">
            {buyNowPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </span>
        </div>
      )}

      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <ProductShippingInfo shipping={shipping} />
      </div>
    </div>
  );
};
