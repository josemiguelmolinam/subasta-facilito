
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import { Sale } from "@/types/sales";
import { getStatusBadge, getStatusIcon, getPaymentStatusBadge } from "./SaleStatusDisplay";

// Función para hashear el nombre del comprador
const hashName = (name: string): string => {
  if (!name) return '****';
  const firstChar = name.charAt(0);
  const lastChar = name.charAt(name.length - 1);
  const middleHash = '*'.repeat(Math.min(4, name.length - 2));
  return `${firstChar}${middleHash}${lastChar}`;
};

interface SaleTableRowProps {
  sale: Sale;
  isExpanded: boolean;
  onToggleExpand: (saleId: string) => void;
}

export const SaleTableRow = ({ sale, isExpanded, onToggleExpand }: SaleTableRowProps) => {
  return (
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
        <div className="text-sm">{hashName(sale.buyer.name)}</div>
      </TableCell>
      <TableCell>
        <div className="font-medium text-auction-primary">
          {formatCurrency(sale.price)}
        </div>
      </TableCell>
      <TableCell>
        {getPaymentStatusBadge(sale.paymentReleased)}
      </TableCell>
      <TableCell>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onToggleExpand(sale.id)}
          className="text-auction-secondary"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          <span className="ml-2">Detalles</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};
