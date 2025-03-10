
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  Package, Truck, Clock, CheckCircle2, 
  XCircle, AlertCircle
} from "lucide-react";
import { Sale } from "@/types/sales";

export const getStatusBadge = (status: Sale['status']) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente de envío</Badge>;
    case 'shipped':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Enviado</Badge>;
    case 'delivered':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Entregado</Badge>;
    case 'completed':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completado</Badge>;
    case 'cancelled':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelado</Badge>;
    default:
      return <Badge variant="outline">Desconocido</Badge>;
  }
};

export const getStatusIcon = (status: Sale['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'shipped':
      return <Truck className="h-5 w-5 text-blue-500" />;
    case 'delivered':
      return <Package className="h-5 w-5 text-green-500" />;
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'cancelled':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />;
  }
};

export const getPaymentStatusBadge = (isReleased: boolean) => {
  return isReleased ? (
    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
      Liberado
    </Badge>
  ) : (
    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
      Pendiente
    </Badge>
  );
};
