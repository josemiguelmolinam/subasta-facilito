
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Package, Truck, Clock, CheckCircle2, AlertCircle, 
  ChevronDown, ChevronUp, XCircle, PackageCheck 
} from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Define the Sale type
interface Buyer {
  id: string;
  name: string;
  email: string;
}

interface Sale {
  id: string;
  title: string;
  image: string;
  price: number;
  saleDate: Date;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'completed';
  buyer: Buyer;
  shipping?: {
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: Date;
  };
  paymentReleased: boolean;
}

interface MySalesListProps {
  sales: Sale[];
  onUpdateTracking: (saleId: string, trackingNumber: string, carrier: string) => void;
  onMarkShipped: (saleId: string) => void;
  onMarkDelivered: (saleId: string) => void;
  onCancelSale: (saleId: string) => void;
}

export const MySalesList = ({ 
  sales, 
  onUpdateTracking, 
  onMarkShipped,
  onMarkDelivered,
  onCancelSale
}: MySalesListProps) => {
  const { toast } = useToast();
  const [expandedSaleId, setExpandedSaleId] = useState<string | null>(null);
  const [trackingForm, setTrackingForm] = useState<{
    trackingNumber: string;
    carrier: string;
  }>({
    trackingNumber: '',
    carrier: ''
  });

  const toggleExpandSale = (saleId: string) => {
    if (expandedSaleId === saleId) {
      setExpandedSaleId(null);
    } else {
      setExpandedSaleId(saleId);
      // Reset tracking form when expanding a new sale
      setTrackingForm({
        trackingNumber: sales.find(s => s.id === saleId)?.shipping?.trackingNumber || '',
        carrier: sales.find(s => s.id === saleId)?.shipping?.carrier || ''
      });
    }
  };

  const handleSubmitTracking = (saleId: string) => {
    if (!trackingForm.trackingNumber || !trackingForm.carrier) {
      toast({
        title: "Información incompleta",
        description: "Por favor ingresa el número de seguimiento y la compañía transportista",
        variant: "destructive"
      });
      return;
    }

    onUpdateTracking(saleId, trackingForm.trackingNumber, trackingForm.carrier);
    toast({
      title: "Información de envío actualizada",
      description: "Los datos de seguimiento han sido actualizados"
    });
  };

  const handleMarkShipped = (saleId: string) => {
    if (!trackingForm.trackingNumber || !trackingForm.carrier) {
      toast({
        title: "Información incompleta",
        description: "Por favor ingresa el número de seguimiento y la compañía transportista",
        variant: "destructive"
      });
      return;
    }

    onMarkShipped(saleId);
    toast({
      title: "Producto enviado",
      description: "Has marcado el producto como enviado"
    });
  };

  const getStatusBadge = (status: Sale['status']) => {
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

  const getStatusIcon = (status: Sale['status']) => {
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

  if (sales.length === 0) {
    return (
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No tienes ventas aún</h3>
            <p className="text-gray-500 mt-2">
              Cuando vendas productos, aparecerán aquí
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Package className="h-5 w-5 text-auction-primary" />
          Mis Ventas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Comprador</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <React.Fragment key={sale.id}>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden">
                          <img 
                            src={sale.image} 
                            alt={sale.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="font-medium text-sm">{sale.title}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(sale.status)}
                        {getStatusBadge(sale.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {formatDate(sale.saleDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{sale.buyer.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-auction-primary">
                        {formatCurrency(sale.price)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {sale.paymentReleased ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Liberado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Pendiente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleExpandSale(sale.id)}
                        className="text-auction-secondary"
                      >
                        {expandedSaleId === sale.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className="ml-2">Detalles</span>
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Expanded row with details and actions */}
                  {expandedSaleId === sale.id && (
                    <TableRow className="bg-gray-50/50">
                      <TableCell colSpan={7} className="p-0">
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tracking information column */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-auction-dark flex items-center gap-2">
                                <Truck className="h-4 w-4 text-auction-primary" /> 
                                Información de Envío
                              </h4>
                              
                              {sale.status === 'pending' && (
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
                                        onChange={(e) => setTrackingForm({
                                          ...trackingForm,
                                          trackingNumber: e.target.value
                                        })}
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
                                        onChange={(e) => setTrackingForm({
                                          ...trackingForm,
                                          carrier: e.target.value
                                        })}
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
                                      onClick={() => handleSubmitTracking(sale.id)}
                                      size="sm"
                                      className="flex-1"
                                    >
                                      Actualizar seguimiento
                                    </Button>
                                    <Button 
                                      onClick={() => handleMarkShipped(sale.id)}
                                      size="sm"
                                      variant="success"
                                      className="flex-1"
                                    >
                                      <Truck className="h-4 w-4 mr-2" />
                                      Marcar como enviado
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {sale.status !== 'pending' && sale.shipping && (
                                <div className="border rounded-lg p-4 bg-white">
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Número de seguimiento:</span>
                                      <span className="font-medium">{sale.shipping.trackingNumber}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Transportista:</span>
                                      <span className="font-medium">{sale.shipping.carrier}</span>
                                    </div>
                                    {sale.shipping.estimatedDelivery && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Entrega estimada:</span>
                                        <span className="font-medium">
                                          {formatDate(sale.shipping.estimatedDelivery)}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Buyer information and actions column */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-auction-dark flex items-center gap-2">
                                <User className="h-4 w-4 text-auction-primary" /> 
                                Información del Comprador
                              </h4>
                              
                              <div className="border rounded-lg p-4 bg-white space-y-3">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Nombre:</span>
                                    <span className="font-medium">{sale.buyer.name}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Email:</span>
                                    <span className="font-medium">{sale.buyer.email}</span>
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
                              
                              <div className="pt-2 space-y-3">
                                {sale.status === 'shipped' && (
                                  <Button 
                                    variant="processing"
                                    className="w-full"
                                    onClick={() => onMarkDelivered(sale.id)}
                                  >
                                    <PackageCheck className="h-4 w-4 mr-2" />
                                    Confirmar entrega
                                  </Button>
                                )}
                                
                                {sale.status === 'pending' && (
                                  <Button 
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() => {
                                      if (confirm('¿Estás seguro de que deseas cancelar esta venta?')) {
                                        onCancelSale(sale.id);
                                      }
                                    }}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Cancelar venta
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
