
import React from 'react';
import { Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const EmptySalesList = () => {
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
};
