import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader } from '@/components/ui/loader';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Banknote, Building, Wallet, Shield, Lock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils/currency';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, total } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  // Estados para la tarjeta de crédito
  const [state, setState] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "¡Pago exitoso!",
        description: "Tu pago ha sido procesado correctamente.",
      });

      navigate('/confirm-purchase/123');
    } catch (error) {
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Columna de métodos de pago */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-auction-dark">Método de Pago</h1>
            
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

            {paymentMethod === 'credit-card' && (
              <div className="mt-8 space-y-6">
                <Cards
                  number={state.number}
                  name={state.name}
                  expiry={state.expiry}
                  cvc={state.cvc}
                  focused={state.focus as any}
                />

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="number">Número de Tarjeta</Label>
                    <Input
                      type="text"
                      name="number"
                      placeholder="0000 0000 0000 0000"
                      value={state.number}
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
                      placeholder="NOMBRE COMPLETO"
                      value={state.name}
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
                        placeholder="MM/AA"
                        value={state.expiry}
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
                        placeholder="123"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        maxLength={3}
                        required
                        className="bg-white"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

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
              <div className="flex justify-between font-bold text-lg pt-3 border-t">
                <span>Total</span>
                <span className="text-auction-primary">{formatCurrency(total * 1.21)}</span>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-auction-primary hover:bg-auction-secondary text-white"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader className="mr-2" />
                  Procesando...
                </>
              ) : (
                'Confirmar Pago'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;