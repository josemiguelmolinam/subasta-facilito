
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { PaymentProcessing } from '@/components/ui/payment-processing';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { PaymentFormHeader } from './PaymentFormHeader';
import { PaymentFormCard } from './PaymentFormCard';
import { PaymentButton } from './PaymentButton';
import { processPayment } from './paymentService';
import { WalletPayment } from './WalletPayment';
import { PaypalPayment } from './PaypalPayment';

interface PaymentFormProps {
  orderId: string;
  paymentMethod: string;
}

export const PaymentForm = ({ orderId, paymentMethod }: PaymentFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { total } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [cardData, setCardData] = useState({ name: '' });

  useEffect(() => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Debes iniciar sesión para realizar un pago.',
      });
      navigate('/login');
    } else {
      console.log('✅ Usuario autenticado en PaymentForm:', user);
    }
  }, [user, navigate, toast]);

  useEffect(() => {
    if (!elements || paymentMethod !== 'credit-card') return;

    const cardElement = elements.getElement('card');
    if (!cardElement) return;

    const handleChange = (event) => {
      console.log('📌 Cambio en CardElement:', {
        complete: event.complete,
        empty: event.empty,
      });
    };

    cardElement.on('change', handleChange);
    return () => {
      cardElement.off('change', handleChange);
    };
  }, [elements, paymentMethod]);

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCardData((prev) => ({ ...prev, name: evt.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'wallet-pay') {
      toast({
        title: "Pago con Wallet",
        description: "Esta funcionalidad estará disponible próximamente.",
      });
      setIsProcessing(false);
      return;
    }

    if (paymentMethod === 'paypal') {
      toast({
        title: "Pago con PayPal",
        description: "Redirigiendo a PayPal para completar el pago...",
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
      navigate(`/confirm-purchase/${orderId}`);
      return;
    }

    if (!stripe || !elements) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Stripe no está cargado correctamente.',
      });
      setIsProcessing(false);
      return;
    }

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Usuario no autenticado. Por favor, inicia sesión.',
      });
      setIsProcessing(false);
      navigate('/login');
      return;
    }

    try {
      // Simular una pausa para una mejor experiencia visual
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await processPayment({
        stripe,
        elements,
        cardName: cardData.name,
        email: user.email || '',
        total: total,
        orderId,
        userId: user.id || '',
      });

      if (result.success) {
        setIsSuccess(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate(`/confirm-purchase/${result.paymentIntentId}`);
      }
    } catch (error) {
      console.error('❌ Error en el pago:', error.message);
      toast({
        variant: 'destructive',
        title: 'Error en el pago',
        description: error.message || 'Hubo un problema al procesar tu pago.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Animated variants for content transitions
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <>
      <PaymentProcessing isProcessing={isProcessing} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border border-gray-200 shadow-lg overflow-hidden">
          <PaymentFormHeader paymentMethod={paymentMethod} />
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={paymentMethod}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={contentVariants}
                >
                  {paymentMethod === 'credit-card' && (
                    <PaymentFormCard 
                      cardName={cardData.name}
                      handleNameChange={handleNameChange}
                    />
                  )}
                  
                  {paymentMethod === 'wallet-pay' && (
                    <WalletPayment />
                  )}
                  
                  {paymentMethod === 'paypal' && (
                    <PaypalPayment />
                  )}
                </motion.div>
              </AnimatePresence>
              
              <PaymentButton 
                isProcessing={isProcessing}
                isSuccess={isSuccess}
                isDisabled={total <= 0}
                paymentMethod={paymentMethod}
              />
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};
