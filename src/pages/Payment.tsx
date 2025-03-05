
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader } from '@/components/ui/loader';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Banknote, Building, Wallet, Shield, Lock, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils/currency';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';

// Clave pública de Stripe (reemplazar con tu clave real en producción)
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, total } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-auction-dark">Finalizar Compra</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Columna de métodos de pago */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-auction-dark">Método de Pago</h2>
            
            <RadioGroup
              defaultValue="credit-card"
              onValueChange={setPaymentMethod}
              className="grid gap-4"
            >
              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer w-full">
                  <CreditCard className="h-4 w-4" />
                  <span className="flex-grow">Tarjeta de Crédito</span>
                  <div className="flex gap-2">
                    <img src="/visa.svg" alt="Visa" className="h-6" />
                    <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer w-full">
                  <Banknote className="h-4 w-4" />
                  <span className="flex-grow">PayPal</span>
                  <img src="/paypal.svg" alt="PayPal" className="h-6" />
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                <Label htmlFor="bank-transfer" className="flex items-center gap-2 cursor-pointer">
                  <Building className="h-4 w-4" />
                  Transferencia Bancaria
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="crypto" id="crypto" />
                <Label htmlFor="crypto" className="flex items-center gap-2 cursor-pointer">
                  <Wallet className="h-4 w-4" />
                  Criptomonedas
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'credit-card' && <StripeCardForm />}

            {paymentMethod === 'paypal' && (
              <div className="mt-8 text-center p-8 border rounded-lg bg-blue-50">
                <p className="text-gray-600">
                  Serás redirigido a PayPal para completar tu pago de forma segura
                </p>
              </div>
            )}

            {paymentMethod === 'bank-transfer' && (
              <div className="mt-8 p-6 border rounded-lg space-y-3 bg-gray-50">
                <p className="font-medium text-gray-900">Datos bancarios:</p>
                <p className="text-gray-600">Banco: Banco Example</p>
                <p className="text-gray-600">IBAN: ES00 0000 0000 0000 0000 0000</p>
                <p className="text-gray-600">BIC/SWIFT: EXAMPLEXXX</p>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="mt-8 text-center p-8 border rounded-lg bg-purple-50">
                <p className="text-gray-600">
                  Próximamente disponible
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4" />
              <span>Pago Seguro</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Protección al Comprador</span>
            </div>
          </div>
        </div>

        {/* Columna de resumen */}
        <OrderSummary items={items} total={total} />
      </div>
    </div>
  );
};

// Formulario de tarjeta con Stripe
const StripeCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para la tarjeta 3D
  const [cardState, setCardState] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setCardState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setCardState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulamos una respuesta exitosa de Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSucceeded(true);
      
      toast({
        title: "¡Pago exitoso!",
        description: "Tu pago ha sido procesado correctamente.",
      });

      // Redirigir después de un breve retraso para mostrar la animación de éxito
      setTimeout(() => {
        navigate('/confirm-purchase/123');
      }, 1500);
      
    } catch (err) {
      setError("Hubo un error al procesar tu pago. Por favor, intenta nuevamente.");
      
      toast({
        variant: "destructive",
        title: "Error en el pago",
        description: "Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="card-3d-container h-52 w-full perspective-1000">
        <motion.div 
          className="relative w-full h-full"
          animate={{ 
            rotateY: cardState.focus === 'cvc' ? 180 : 0 
          }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <div className="absolute w-full h-full backface-hidden">
            <Cards
              number={cardState.number}
              name={cardState.name}
              expiry={cardState.expiry}
              cvc={cardState.cvc}
              focused={cardState.focus as any}
            />
          </div>
        </motion.div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="number">Número de Tarjeta</Label>
          <Input
            type="text"
            name="number"
            id="number"
            placeholder="0000 0000 0000 0000"
            value={cardState.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength={16}
            required
            className="bg-white"
          />
        </div>

        <div>
          <Label htmlFor="name">Nombre del Titular</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="NOMBRE COMPLETO"
            value={cardState.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
            className="bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry">Fecha de Expiración</Label>
            <Input
              type="text"
              name="expiry"
              id="expiry"
              placeholder="MM/AA"
              value={cardState.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={4}
              required
              className="bg-white"
            />
          </div>
          <div>
            <Label htmlFor="cvc">CVC</Label>
            <Input
              type="text"
              name="cvc"
              id="cvc"
              placeholder="123"
              value={cardState.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={3}
              required
              className="bg-white"
            />
          </div>
        </div>

        <div className="mt-6 relative">
          <Label className="text-sm mb-2 block">Tarjeta con Stripe (Simulado)</Label>
          <div className="p-4 border rounded-md bg-white">
            <div className="h-10 flex items-center text-gray-500 text-sm">
              Campos de Stripe simulados
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}

        <Button
          type="submit"
          className="w-full bg-auction-primary hover:bg-auction-secondary text-white"
          disabled={isProcessing || succeeded}
        >
          {isProcessing ? (
            <>
              <Loader className="mr-2" />
              Procesando...
            </>
          ) : succeeded ? (
            <>
              <CheckCircle2 className="mr-2" />
              ¡Pago Completado!
            </>
          ) : (
            'Confirmar Pago'
          )}
        </Button>
      </form>
    </div>
  );
};

// Componente de resumen de orden
const OrderSummary = ({ items, total }: { items: any[], total: number }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-4">
      <h2 className="text-xl font-bold mb-6 text-auction-dark">Resumen de Compra</h2>
      
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.auction.id} className="flex gap-4 pb-4 border-b last:border-0">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <img
                src={item.auction.imageUrl}
                alt={item.auction.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-auction-dark line-clamp-2">
                {item.auction.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Cantidad: {item.quantity}
              </p>
              <p className="font-medium text-auction-primary mt-2">
                {formatCurrency(item.auction.currentBid)}
              </p>
            </div>
          </div>
        ))}

        <div className="space-y-3 pt-4">
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
            <span>{total > 1000 ? 'Gratis' : formatCurrency(15)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-3 border-t">
            <span>Total</span>
            <span className="text-auction-primary">
              {formatCurrency(total * 1.21 + (total > 1000 ? 0 : 15))}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-green-50 p-3 rounded-md text-sm text-green-700 flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Envío gratuito en compras superiores a 1.000€
          </div>
          
          <div className="border-t pt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Métodos de pago aceptados
            </div>
            <div className="flex space-x-2">
              <img src="/visa.svg" alt="Visa" className="h-6" />
              <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="/paypal.svg" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap con el contexto de Stripe
const PaymentWithStripe = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default PaymentWithStripe;
