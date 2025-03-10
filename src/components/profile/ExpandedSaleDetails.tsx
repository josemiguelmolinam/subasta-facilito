
import React from 'react';
import { Truck, User } from "lucide-react";
import { Sale } from "@/types/sales";
import { ShippingInfoForm } from "./ShippingInfoForm";
import { ShippingDetails } from "./ShippingDetails";
import { BuyerInfo } from "./BuyerInfo";
import { SaleActions } from "./SaleActions";

interface ExpandedSaleDetailsProps {
  sale: Sale;
  trackingForm: {
    trackingNumber: string;
    carrier: string;
  };
  onTrackingChange: (field: 'trackingNumber' | 'carrier', value: string) => void;
  onMarkDelivered: (saleId: string) => void;
  onCancelSale: (saleId: string) => void;
}

export const ExpandedSaleDetails = ({
  sale,
  trackingForm,
  onTrackingChange,
  onMarkDelivered,
  onCancelSale
}: ExpandedSaleDetailsProps) => {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tracking information column */}
        <div className="space-y-4">
          <h4 className="font-semibold text-auction-dark flex items-center gap-2">
            <Truck className="h-4 w-4 text-auction-primary" /> 
            Información de Envío
          </h4>
          
          {sale.status === 'pending' && (
            <ShippingInfoForm
              sale={sale}
              trackingForm={trackingForm}
              onTrackingChange={onTrackingChange}
            />
          )}
          
          {sale.status !== 'pending' && sale.shipping && (
            <ShippingDetails shipping={sale.shipping} />
          )}
        </div>
        
        {/* Buyer information and actions column */}
        <div className="space-y-4">
          <h4 className="font-semibold text-auction-dark flex items-center gap-2">
            <User className="h-4 w-4 text-auction-primary" /> 
            Información del Comprador
          </h4>
          
          <BuyerInfo buyer={sale.buyer} />
          
          {/* Only show SaleActions for non-iPhone sales */}
          {!sale.title.includes('iPhone 15 Pro Max') && (
            <SaleActions
              sale={sale}
              onMarkDelivered={onMarkDelivered}
              onCancelSale={onCancelSale}
            />
          )}
        </div>
      </div>
    </div>
  );
};
