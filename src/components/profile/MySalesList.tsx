
import React, { useState } from 'react';
import { 
  Table, TableBody, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sale, SalesActionProps } from "@/types/sales";
import { EmptySalesList } from "./EmptySalesList";
import { SaleTableRow } from "./SaleTableRow";
import { ExpandedSaleDetails } from "./ExpandedSaleDetails";

interface MySalesListProps extends SalesActionProps {
  sales: Sale[];
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

  const handleTrackingChange = (field: 'trackingNumber' | 'carrier', value: string) => {
    setTrackingForm({
      ...trackingForm,
      [field]: value
    });
  };

  if (sales.length === 0) {
    return <EmptySalesList />;
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
                  <SaleTableRow 
                    sale={sale} 
                    isExpanded={expandedSaleId === sale.id}
                    onToggleExpand={toggleExpandSale}
                  />

                  {/* Expanded row with details and actions */}
                  {expandedSaleId === sale.id && (
                    <TableRow className="bg-gray-50/50">
                      <TableCell colSpan={7} className="p-0">
                        <ExpandedSaleDetails
                          sale={sale}
                          trackingForm={trackingForm}
                          onTrackingChange={handleTrackingChange}
                          onMarkDelivered={onMarkDelivered}
                          onCancelSale={onCancelSale}
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
