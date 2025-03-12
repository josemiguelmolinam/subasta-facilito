
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2, CreditCard, Wallet, ShieldCheck, BadgeCheck, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils/currency';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface CartItem {
  auction: {
    id: string;
    title: string;
    imageUrl: string;
    currentBid: number;
    category?: string;
  };
  quantity: number;
}

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  processingFee: number;
  variants: any;
  fadeInUp: any;
}

export const OrderSummary = ({ items, total, processingFee, variants, fadeInUp }: OrderSummaryProps) => {
  const totalIva = total * 0.21;
  const shippingCost = total > 500 ? 0 : 4.95;
  const finalTotal = total + totalIva + processingFee + shippingCost;
  
  return (
    <Card className="sticky top-4 border-0 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-auction-primary/10 via-auction-secondary/5 to-transparent">
        <CardTitle className="text-xl font-bold flex items-center">
          <BadgeCheck className="w-5 h-5 mr-2 text-auction-primary" />
          Resumen de tu Compra
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div 
          className="space-y-6"
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-h-64 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-auction-primary/20 scrollbar-track-gray-50">
            {items.map((item) => (
              <motion.div
                key={item.auction.id}
                className="flex gap-4 pb-4 border-b last:border-0 group"
                variants={fadeInUp}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={item.auction.imageUrl}
                    alt={item.auction.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.quantity > 1 && (
                    <div className="absolute top-0 right-0 bg-auction-primary text-white text-xs font-bold rounded-bl-lg px-1.5 py-0.5">
                      x{item.quantity}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-auction-dark line-clamp-2 group-hover:text-auction-primary transition-colors duration-300">
                    {item.auction.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.auction.category && (
                      <Badge variant="outline" className="text-xs bg-gray-50">
                        <Tag className="h-3 w-3 mr-1" />
                        {item.auction.category}
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500">
                      Cantidad: {item.quantity}
                    </p>
                    <p className="font-medium text-auction-primary mt-1 text-lg">
                      {formatCurrency(item.auction.currentBid)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-lg overflow-hidden border border-gray-100">
            <div className="bg-gray-50 p-3 border-b border-gray-100">
              <h3 className="font-medium text-auction-dark">Detalles del precio</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>IVA (21%)</span>
                <span>{formatCurrency(totalIva)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Comisión de pago</span>
                <span>{formatCurrency(processingFee)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Gastos de envío</span>
                <span className="flex items-center">
                  {total > 500 ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Gratis
                    </span>
                  ) : (
                    formatCurrency(shippingCost)
                  )}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span className="text-auction-primary text-xl">
                  {formatCurrency(finalTotal)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-700">
              <p className="font-medium">Envío gratuito</p>
              <p className="text-green-600">En compras superiores a 500€</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Pago seguro garantizado</p>
                <p className="text-blue-600">Todos los pagos están protegidos con encriptación SSL</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm text-gray-500">Aceptamos</span>
              <div className="flex space-x-3">
                <CreditCard className="h-6 w-6 text-gray-700" />
                <Wallet className="h-6 w-6 text-gray-700" />
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
