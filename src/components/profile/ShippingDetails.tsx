
import React from 'react';
import { formatDate } from "@/lib/utils/date";
import { Sale } from "@/types/sales";

interface ShippingDetailsProps {
  shipping: NonNullable<Sale['shipping']>;
}

export const ShippingDetails = ({ shipping }: ShippingDetailsProps) => {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Número de seguimiento:</span>
          <span className="font-medium">{shipping.trackingNumber}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Transportista:</span>
          <span className="font-medium">{shipping.carrier}</span>
        </div>
        {shipping.estimatedDelivery && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Entrega estimada:</span>
            <span className="font-medium">
              {formatDate(shipping.estimatedDelivery)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
