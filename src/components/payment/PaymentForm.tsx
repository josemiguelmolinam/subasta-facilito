
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { useToast } from '@/components/ui/use-toast';
import { PaymentProcessing } from '@/components/ui/payment-processing';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, ChevronRight, CheckCircle2, Shield } from 'lucide-react';

// Iconos
import visaIcon from '@/assets/visa.svg';
import mastercardIcon from '@/assets/mastercard.svg';
import amexIcon from '@/assets/amex.svg';

interface PaymentFormProps {
  orderId: string;
}

export const PaymentForm = ({ orderId }: PaymentFormProps) => {
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
    if (!elements) return;

    const cardElement = elements.getElement(CardElement);
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
  }, [elements]);

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCardData((prev) => ({ ...prev, name: evt.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

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
      
      const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:3000';
      console.log(
        '📤 Enviando solicitud a:',
        `${API_URL}/api/create-payment-intent`
      );

      const cardElement = elements.getElement(CardElement);
      if (!cardElement)
        throw new Error('No se pudo acceder al elemento de tarjeta');

      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: cardData.name,
            email: user.email || 'cliente@ejemplo.com',
          },
        });

      if (pmError) throw new Error(pmError.message);

      // Para desarrollo, simulamos una respuesta exitosa
      setIsSuccess(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate(`/confirm-purchase/sim_${orderId}`);
      
      // En producción, descomentar y usar este código:
      /*
      const response = await fetch(`${API_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 1.21 * 100),
          currency: 'eur',
          orderId,
          paymentMethod: paymentMethod.id,
          userId: user.id,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en PaymentIntent: ${errorText}`);
      }

      const { clientSecret } = await response.json();
      console.log('🔑 ClientSecret recibido:', clientSecret);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (error) throw new Error(error.message);

      if (paymentIntent.status === 'requires_action') {
        const { error: confirmError } = await stripe.confirmCardPayment(
          clientSecret
        );
        if (confirmError) throw new Error(confirmError.message);
      }

      if (
        paymentIntent.status === 'succeeded' ||
        paymentIntent.status === 'requires_capture'
      ) {
        console.log('✅ Pago procesado con estado:', paymentIntent.status);
        setIsSuccess(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate(`/confirm-purchase/${paymentIntent.id}`);
      }
      */
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

  return (
    <>
      <PaymentProcessing isProcessing={isProcessing} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border border-gray-200 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-auction-primary/10 to-transparent pb-4">
            <CardTitle className="text-2xl font-bold text-auction-dark flex items-center">
              <CreditCard className="w-6 h-6 mr-2 text-auction-primary" />
              Detalles de Pago
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Nombre del Titular</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Nombre y Apellido"
                  value={cardData.name}
                  onChange={handleNameChange}
                  required
                  className="bg-white transition-all duration-200 border-gray-300 focus:border-auction-primary focus:ring-auction-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Número de Tarjeta</Label>
                <div className="relative">
                  <div className="rounded-md border border-gray-300 p-4 focus-within:ring-2 focus-within:ring-auction-primary/30 focus-within:border-auction-primary transition-all duration-200">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#32325d',
                            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                            '::placeholder': { color: '#aab7c4' },
                            iconColor: '#9b87f5',
                          },
                          invalid: { color: '#fa755a', iconColor: '#fa755a' },
                        },
                        hidePostalCode: true,
                      }}
                    />
                  </div>
                  <div className="absolute right-3 bottom-4 flex gap-2">
                    <img src={visaIcon} alt="Visa" className="h-5 opacity-50" />
                    <img src={mastercardIcon} alt="Mastercard" className="h-5 opacity-50" />
                    <img src={amexIcon} alt="Amex" className="h-5 opacity-50" />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start space-x-3 mt-6">
                <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  Tus datos están protegidos con encriptación de grado bancario. Nunca almacenamos información completa de tu tarjeta.
                </p>
              </div>
              
              <Button
                type="submit"
                disabled={isProcessing || isSuccess || total * 1.21 <= 0}
                variant="payment"
                className="w-full py-6 mt-4 font-medium text-base"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="mr-2 animate-spin" />
                    <span>Procesando pago...</span>
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="mr-2 text-white animate-pulse" />
                    <span>¡Pago Completado!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Confirmar Pago</span>
                    <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};
