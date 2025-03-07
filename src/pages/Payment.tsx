
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentMethodSelector } from '@/components/payment/PaymentMethodSelector';
import { PaymentForm } from '@/components/payment/PaymentForm';
import { OrderSummary } from '@/components/payment/OrderSummary';
import { PaypalPayment } from '@/components/payment/PaypalPayment';
import { BankTransferPayment } from '@/components/payment/BankTransferPayment';
import { CryptoPayment } from '@/components/payment/CryptoPayment';
import { PaymentSecurity } from '@/components/payment/PaymentSecurity';

// Cargar Stripe con la clave pública desde .env (Vite)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const { items, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderId] = useState(`order_${Date.now()}`);

  useEffect(() => {
    if (!user && !window.location.pathname.includes('/confirm-purchase')) {
      console.log(
        '🚨 Usuario no autenticado, redirigiendo a /login desde PaymentPage'
      );
      navigate('/login');
    }
  }, [user, navigate]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.h1 
        className="text-3xl font-bold mb-8 text-auction-dark text-center md:text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Finalizar Compra
      </motion.h1>
      
      <div className="grid md:grid-cols-5 gap-8">
        {/* Columna izquierda (3/5) */}
        <motion.div 
          className="md:col-span-3 space-y-8"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-auction-primary/10 via-auction-secondary/5 to-transparent">
              <CardTitle className="text-2xl font-bold">Método de Pago</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <PaymentMethodSelector
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />

              {paymentMethod === 'credit-card' && (
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <Elements stripe={stripePromise}>
                    <PaymentForm orderId={orderId} />
                  </Elements>
                </motion.div>
              )}

              {paymentMethod === 'paypal' && (
                <PaypalPayment />
              )}

              {paymentMethod === 'bank-transfer' && (
                <BankTransferPayment orderId={orderId} />
              )}

              {paymentMethod === 'crypto' && (
                <CryptoPayment />
              )}
            </CardContent>
          </Card>

          <PaymentSecurity />
        </motion.div>

        {/* Columna derecha (2/5) */}
        <motion.div 
          className="md:col-span-2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <OrderSummary 
            items={items}
            total={total}
            variants={staggerContainer}
            fadeInUp={fadeInUp}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;
