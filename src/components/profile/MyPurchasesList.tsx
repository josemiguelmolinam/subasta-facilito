
import React, { useState } from 'react';
import { 
  Table, TableBody, TableHead, TableHeader, TableRow, TableCell 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import { MyPurchaseDetails } from "./MyPurchaseDetails";

// Tipos de datos
interface Purchase {
  id: string;
  title: string;
  image: string;
  purchaseDate: Date;
  price: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'completed';
  paymentMethod: 'credit_card' | 'paypal' | 'transfer';
  paymentReleased: boolean;
  seller: {
    id: string;
    name: string;
    email: string;
  };
  shipping?: {
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: Date;
  };
}

interface MyPurchasesListProps {
  purchases: Purchase[];
  onReleasePayment: (purchaseId: string) => void;
}

// Función para hashear el nombre del vendedor
const hashName = (name: string): string => {
  if (!name) return '****';
  const firstChar = name.charAt(0);
  const lastChar = name.charAt(name.length - 1);
  const middleHash = '*'.repeat(Math.min(4, name.length - 2));
  return `${firstChar}${middleHash}${lastChar}`;
};

// Función para obtener el badge de estado
const getStatusBadge = (status: Purchase['status']) => {
  switch (status) {
    case 'pending':
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pendiente</span>;
    case 'shipped':
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">En camino</span>;
    case 'delivered':
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Entregado</span>;
    case 'cancelled':
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Cancelado</span>;
    case 'completed':
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Completado</span>;
    default:
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Desconocido</span>;
  }
};

export const MyPurchasesList = ({ purchases, onReleasePayment }: MyPurchasesListProps) => {
  const { toast } = useToast();
  const [expandedPurchaseId, setExpandedPurchaseId] = useState<string | null>(null);

  const toggleExpandPurchase = (purchaseId: string) => {
    setExpandedPurchaseId(expandedPurchaseId === purchaseId ? null : purchaseId);
  };

  if (purchases.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-auction-primary" />
            Mis Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No tienes compras aún</h3>
            <p className="text-gray-500">
              Cuando realices tu primera compra, aparecerá aquí.
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
          <ShoppingBag className="h-5 w-5 text-auction-primary" />
          Mis Compras
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
                <TableHead>Vendedor</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase) => (
                <React.Fragment key={purchase.id}>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden">
                          <img 
                            src={purchase.image} 
                            alt={purchase.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="font-medium text-sm">{purchase.title}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(purchase.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {formatDate(purchase.purchaseDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{hashName(purchase.seller.name)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-auction-primary">
                        {formatCurrency(purchase.price)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        purchase.paymentReleased 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {purchase.paymentReleased ? 'Liberado' : 'Pendiente'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleExpandPurchase(purchase.id)}
                        className="text-auction-secondary"
                      >
                        {expandedPurchaseId === purchase.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className="ml-2">Detalles</span>
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Expanded row with details and actions */}
                  {expandedPurchaseId === purchase.id && (
                    <TableRow className="bg-gray-50/50">
                      <TableCell colSpan={7} className="p-0">
                        <MyPurchaseDetails 
                          purchase={purchase}
                          onReleasePayment={onReleasePayment}
                        />
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
