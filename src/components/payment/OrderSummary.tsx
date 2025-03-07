
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils/currency';

// Iconos
import visaIcon from '@/assets/visa.svg';
import mastercardIcon from '@/assets/mastercard.svg';
import amexIcon from '@/assets/amex.svg';
import paypalIcon from '@/assets/paypal.svg';

interface CartItem {
  auction: {
    id: string;
    title: string;
    imageUrl: string;
    currentBid: number;
  };
  quantity: number;
}

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  variants: any;
  fadeInUp: any;
}

export const OrderSummary = ({ items, total, variants, fadeInUp }: OrderSummaryProps) => {
  return (
    <Card className="sticky top-4 border-0 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-auction-primary/10 via-auction-secondary/5 to-transparent">
        <CardTitle className="text-xl font-bold">Resumen de Compra</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <motion.div 
          className="space-y-6"
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item) => (
            <motion.div
              key={item.auction.id}
              className="flex gap-4 pb-4 border-b last:border-0 group"
              variants={fadeInUp}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md">
                <img
                  src={item.auction.imageUrl}
                  alt={item.auction.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-auction-dark line-clamp-2 group-hover:text-auction-primary transition-colors duration-300">
                  {item.auction.title}
                </h3>
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

          <div className="space-y-3 pt-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>IVA (21%)</span>
              <span>{formatCurrency(total * 0.21)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Gastos de envío</span>
              <span>{total > 500 ? 'Gratis' : formatCurrency(4.95)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t">
              <span>Total</span>
              <span className="text-auction-primary text-xl">
                {formatCurrency(total * 1.21 + (total > 500 ? 0 : 4.95))}
              </span>
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex items-start space-x-3 mt-4">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-700">
              Envío gratuito en compras superiores a 500€
            </p>
          </div>

          <div className="mt-4 space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center text-sm text-blue-800 border border-blue-100">
              <p className="flex items-center justify-center">
                <Lock className="inline-block mr-2 w-4 h-4" />
                Todos los pagos están protegidos con encriptación SSL
              </p>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-sm text-gray-500">Aceptamos</span>
              <div className="flex space-x-2">
                <img src={visaIcon} alt="Visa" className="h-6" />
                <img src={mastercardIcon} alt="Mastercard" className="h-6" />
                <img src={amexIcon} alt="Amex" className="h-6" />
                <img src={paypalIcon} alt="PayPal" className="h-6" />
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
