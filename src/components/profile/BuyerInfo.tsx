
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Sale } from "@/types/sales";
import { useToast } from "@/hooks/use-toast";

interface BuyerInfoProps {
  buyer: Sale['buyer'];
}

export const BuyerInfo = ({ buyer }: BuyerInfoProps) => {
  const { toast } = useToast();
  
  return (
    <div className="border rounded-lg p-4 bg-white space-y-3">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Nombre:</span>
          <span className="font-medium">{buyer.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Email:</span>
          <span className="font-medium">{buyer.email}</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        className="w-full mt-2"
        onClick={() => {
          toast({
            title: "Contactando al comprador",
            description: "Te redirigiremos al chat con el comprador"
          });
        }}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Contactar comprador
      </Button>
    </div>
  );
};
