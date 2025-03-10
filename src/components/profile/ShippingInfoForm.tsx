
import React from 'react';
import { Sale } from "@/types/sales";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ShippingInfoFormProps {
  sale: Sale;
  trackingForm: {
    trackingNumber: string;
    carrier: string;
  };
  onTrackingChange: (field: 'trackingNumber' | 'carrier', value: string) => void;
}

export const ShippingInfoForm = ({
  trackingForm,
  onTrackingChange
}: ShippingInfoFormProps) => {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="tracking">Número de seguimiento</Label>
          <Input
            id="tracking"
            placeholder="Introduce el número de seguimiento"
            value={trackingForm.trackingNumber}
            onChange={(e) => onTrackingChange('trackingNumber', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="carrier">Transportista</Label>
          <Input
            id="carrier"
            placeholder="Introduce el nombre del transportista"
            value={trackingForm.carrier}
            onChange={(e) => onTrackingChange('carrier', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
