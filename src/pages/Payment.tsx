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
import { CreditCard, Paypal, Building, Wallet } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Columna de métodos de pago */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Método de Pago</h1>
          
          <RadioGroup
            defaultValue="credit-card"
            onValueChange={setPaymentMethod}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="credit-card" id="credit-card" />
              <Label htmlFor="credit-card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Tarjeta de Crédito
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex items-center gap-2">
                <Paypal className="h-4 w-4" />
                PayPal
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="bank-transfer" id="bank-transfer" />
              <Label htmlFor="bank-transfer" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Transferencia Bancaria
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="crypto" id="crypto" />
              <Label htmlFor="crypto" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Criptomonedas
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'credit-card' && (
            <div className="space-y-6">
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
                    />
                  </div>
                </div>
              </form>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="text-center p-8 border rounded-lg">
              <p className="text-muted-foreground">
                Serás redirigido a PayPal para completar tu pago
              </p>
            </div>
          )}

          {paymentMethod === 'bank-transfer' && (
            <div className="p-4 border rounded-lg space-y-2">
              <p className="font-medium">Datos bancarios:</p>
              <p>Banco: Banco Example</p>
              <p>IBAN: ES00 0000 0000 0000 0000 0000</p>
              <p>BIC/SWIFT: EXAMPLEXXX</p>
            </div>
          )}

          {paymentMethod === 'crypto' && (
            <div className="text-center p-8 border rounded-lg">
              <p className="text-muted-foreground">
                Próximamente disponible
              </p>
            </div>
          )}
        </div>

        {/* Columna de resumen */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h2 className="text-2xl font-bold">Resumen de Compra</h2>
          
          {items.map((item) => (
            <div key={item.auction.id} className="flex gap-4 border-b pb-4">
              <img
                src={item.auction.imageUrl}
                alt={item.auction.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="font-medium">{item.auction.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Cantidad: {item.quantity}
                </p>
                <p className="font-medium text-primary">
                  {formatCurrency(item.auction.currentBid)}
                </p>
              </div>
            </div>
          ))}

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Impuestos</span>
              <span>{formatCurrency(total * 0.21)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(total * 1.21)}</span>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
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
  );
};

export default Payment;