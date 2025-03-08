
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentMethodSelector } from '@/components/payment/PaymentMethodSelector';
import { PaymentForm } from '@/components/payment/PaymentForm';
import { OrderSummary } from '@/components/payment/OrderSummary';
import { PaymentSecurity } from '@/components/payment/PaymentSecurity';
import { PaymentLayout } from '@/components/payment/PaymentLayout';
import { fadeInUp, staggerContainer } from '@/components/payment/PaymentAnimations';

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

  // Cálculo de la comisión por procesamiento de pago (2.9% + 0.30€)
  const calculateFee = (subtotal) => {
    return (subtotal * 0.029) + 0.30;
  };

  // Left column content - Payment method selection and forms
  const leftColumnContent = (
    <>
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-auction-primary/10 via-auction-secondary/5 to-transparent">
          <CardTitle className="text-2xl font-bold">Método de Pago</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          <Elements stripe={stripePromise}>
            <PaymentForm 
              orderId={orderId} 
              paymentMethod={paymentMethod} 
            />
          </Elements>
        </CardContent>
      </Card>

      <PaymentSecurity />
    </>
  );

  // Right column content - Order summary
  const rightColumnContent = (
    <OrderSummary 
      items={items}
      total={total}
      processingFee={calculateFee(total)}
      variants={staggerContainer}
      fadeInUp={fadeInUp}
    />
  );

  return (
    <PaymentLayout
      title="Finalizar Compra"
      leftColumn={leftColumnContent}
      rightColumn={rightColumnContent}
    />
  );
};

export default PaymentPage;
