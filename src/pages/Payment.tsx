
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader } from '@/components/ui/loader';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentProcessing } from '@/components/ui/payment-processing';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  CreditCard,
  Banknote,
  Building,
  Wallet,
  Shield,
  Lock,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency } from '@/lib/utils/currency';

// Iconos
import visaIcon from '@/assets/visa.svg';
import mastercardIcon from '@/assets/mastercard.svg';
import amexIcon from '@/assets/amex.svg';
import paypalIcon from '@/assets/paypal.svg';
import bitcoinIcon from '@/assets/Bitcoin.svg';
import bankTransfer from '@/assets/bank-transfer.svg';

// Cargar Stripe con la clave pública desde .env (Vite)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

const PaymentForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, total } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [cardData, setCardData] = useState({ name: '' });
  const [orderId] = useState(`order_${Date.now()}`);

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
    return () => cardElement.off('change', handleChange);
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
      <PaymentProcessing isProcessing={isProcessing} onComplete={() => {}} />
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
                    <span className="font-bold ml-1">{formatCurrency(total * 1.21)}</span>
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

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const { items, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

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
              <RadioGroup
                defaultValue="credit-card"
                onValueChange={setPaymentMethod}
                className="grid gap-4"
              >
                <motion.div 
                  className="flex items-center space-x-4 border p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 hover:border-auction-primary/30 hover:shadow-sm"
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label
                    htmlFor="credit-card"
                    className="flex items-center gap-4 cursor-pointer w-full"
                  >
                    <div className="bg-auction-primary/10 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-auction-primary" />
                    </div>
                    <span className="flex-grow font-medium">Tarjeta de Crédito</span>
                    <div className="flex gap-2">
                      <img src={visaIcon} alt="Visa" className="h-7" />
                      <img src={mastercardIcon} alt="Mastercard" className="h-7" />
                      <img src={amexIcon} alt="American Express" className="h-7" />
                    </div>
                  </Label>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-4 border p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 hover:border-blue-300/30 hover:shadow-sm"
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label
                    htmlFor="paypal"
                    className="flex items-center gap-4 cursor-pointer w-full"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Banknote className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="flex-grow font-medium">PayPal</span>
                    <img src={paypalIcon} alt="PayPal" className="h-8 ml-auto" />
                  </Label>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-4 border p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 hover:border-green-300/30 hover:shadow-sm"
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                  <Label
                    htmlFor="bank-transfer"
                    className="flex items-center gap-4 cursor-pointer w-full"
                  >
                    <div className="bg-green-100 p-2 rounded-full">
                      <Building className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="flex-grow font-medium">Transferencia Bancaria</span>
                    <img src={bankTransfer} alt="BankTransfer" className="h-9 ml-auto" />
                  </Label>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-4 border p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 hover:border-amber-300/30 hover:shadow-sm"
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  <RadioGroupItem value="crypto" id="crypto" />
                  <Label
                    htmlFor="crypto"
                    className="flex items-center gap-4 cursor-pointer w-full"
                  >
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Wallet className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="flex-grow font-medium">Criptomonedas</span>
                    <img src={bitcoinIcon} alt="Bitcoin" className="h-7 ml-auto" />
                  </Label>
                </motion.div>
              </RadioGroup>

              {paymentMethod === 'credit-card' && (
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <Elements stripe={stripePromise}>
                    <PaymentForm />
                  </Elements>
                </motion.div>
              )}

              {paymentMethod === 'paypal' && (
                <motion.div 
                  className="mt-8 p-8 border border-blue-200 rounded-xl bg-blue-50 shadow-inner text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={paypalIcon} alt="PayPal" className="h-12 mx-auto mb-4" />
                  <p className="text-blue-700 font-medium">
                    Serás redirigido a PayPal para completar tu pago de forma segura
                  </p>
                  <Button className="mt-6 bg-[#0070ba] hover:bg-[#003087] text-white font-medium px-8 py-5">
                    Continuar con PayPal
                  </Button>
                </motion.div>
              )}

              {paymentMethod === 'bank-transfer' && (
                <motion.div 
                  className="mt-8 p-6 border border-green-100 rounded-xl space-y-4 bg-green-50 shadow-inner"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-3 text-green-700">
                    <Building className="h-5 w-5" />
                    <h3 className="font-bold">Datos bancarios:</h3>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-100 space-y-3">
                    <p className="flex justify-between text-sm">
                      <span className="text-gray-500">Banco:</span>
                      <span className="font-medium">Banco Example</span>
                    </p>
                    <p className="flex justify-between text-sm">
                      <span className="text-gray-500">IBAN:</span>
                      <span className="font-medium font-mono">ES00 0000 0000 0000 0000 0000</span>
                    </p>
                    <p className="flex justify-between text-sm">
                      <span className="text-gray-500">BIC/SWIFT:</span>
                      <span className="font-medium font-mono">EXAMPLEXXX</span>
                    </p>
                    <p className="flex justify-between text-sm">
                      <span className="text-gray-500">Beneficiario:</span>
                      <span className="font-medium">Subastalo S.L.</span>
                    </p>
                    <p className="flex justify-between text-sm">
                      <span className="text-gray-500">Concepto:</span>
                      <span className="font-medium font-mono">{`REF-${orderId}`}</span>
                    </p>
                  </div>
                  <div className="text-sm text-green-700 bg-green-100 p-3 rounded-lg">
                    <p>Una vez realizada la transferencia, recibirás un email de confirmación en 24-48h hábiles.</p>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'crypto' && (
                <motion.div 
                  className="mt-8 text-center p-8 border border-purple-200 rounded-xl bg-purple-50 shadow-inner"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={bitcoinIcon} alt="Bitcoin" className="h-16 mx-auto mb-4 animate-float" />
                  <p className="text-purple-700 font-medium">
                    Próximamente disponible
                  </p>
                  <p className="text-sm text-purple-600 mt-2">
                    Estamos trabajando para ofrecerte pagos con Bitcoin, Ethereum y otras criptomonedas
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          <motion.div 
            className="flex items-center justify-center gap-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Lock className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-700 font-medium">Pago Seguro</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-gray-700 font-medium">Protección al Comprador</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Columna derecha (2/5) */}
        <motion.div 
          className="md:col-span-2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <Card className="sticky top-4 border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-auction-primary/10 via-auction-secondary/5 to-transparent">
              <CardTitle className="text-xl font-bold">Resumen de Compra</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
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
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;
