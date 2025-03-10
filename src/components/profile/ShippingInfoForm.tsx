
import React from 'react';
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { Sale } from "@/types/sales";

interface ShippingInfoFormProps {
  sale: Sale;
  trackingForm: {
    trackingNumber: string;
    carrier: string;
  };
  onTrackingChange: (field: 'trackingNumber' | 'carrier', value: string) => void;
  onSubmitTracking: (saleId: string) => void;
  onMarkShipped: (saleId: string) => void;
}

export const ShippingInfoForm = ({ 
  sale, 
  trackingForm, 
  onTrackingChange, 
  onSubmitTracking, 
  onMarkShipped 
}: ShippingInfoFormProps) => {
  return (
    <div className="space-y-3 border rounded-lg p-4 bg-white">
      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Número de seguimiento
          </label>
          <input 
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={trackingForm.trackingNumber}
            onChange={(e) => onTrackingChange('trackingNumber', e.target.value)}
            placeholder="Introduce el número de seguimiento"
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Compañía transportista
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            value={trackingForm.carrier}
            onChange={(e) => onTrackingChange('carrier', e.target.value)}
          >
            <option value="">Selecciona una compañía</option>
            <option value="Correos">Correos</option>
            <option value="SEUR">SEUR</option>
            <option value="MRW">MRW</option>
            <option value="DHL">DHL</option>
            <option value="FedEx">FedEx</option>
            <option value="UPS">UPS</option>
          </select>
        </div>
      </div>
      
      <div className="pt-2 flex gap-2">
        <Button 
          onClick={() => onSubmitTracking(sale.id)}
          size="sm"
          className="flex-1"
        >
          Actualizar seguimiento
        </Button>
        <Button 
          onClick={() => onMarkShipped(sale.id)}
          size="sm"
          variant="success"
          className="flex-1"
        >
          <Truck className="h-4 w-4 mr-2" />
          Marcar como enviado
        </Button>
      </div>
    </div>
  );
};
