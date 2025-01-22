import { MainLayout } from "@/components/layout/MainLayout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/currency";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { CreditCard, Landmark, Banknote, ShieldCheck } from "lucide-react";

const Payment = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 2000));

      clearCart();
      toast({
        title: "¡Pago exitoso!",
        description: "Tu pago ha sido procesado correctamente",
      });
      navigate("/confirmation");
    } catch (error) {
      toast({
        title: "Error en el pago",
        description: "Ha ocurrido un error al procesar tu pago",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-auction-dark mb-8">Información de Pago</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Métodos de Pago */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-auction-dark">Métodos de Pago</h2>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("creditCard")}
                        className={`flex items-center justify-center p-4 border rounded-md shadow-sm ${
                          paymentMethod === "creditCard" ? "border-auction-primary" : "border-gray-300"
                        }`}
                      >
                        <CreditCard className="w-6 h-6 text-auction-primary" />
                        <span className="ml-2 text-sm">Tarjeta</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`flex items-center justify-center p-4 border rounded-md shadow-sm ${
                          paymentMethod === "paypal" ? "border-auction-primary" : "border-gray-300"
                        }`}
                      >
                        <Banknote className="w-6 h-6 text-blue-500" />
                        <span className="ml-2 text-sm">PayPal</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("bankTransfer")}
                        className={`flex items-center justify-center p-4 border rounded-md shadow-sm ${
                          paymentMethod === "bankTransfer" ? "border-auction-primary" : "border-gray-300"
                        }`}
                      >
                        <Landmark className="w-6 h-6 text-gray-700" />
                        <span className="ml-2 text-sm">Transferencia</span>
                      </button>
                    </div>
                  </div>

                  {/* Detalles del Pago */}
                  {paymentMethod === "creditCard" && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-auction-dark">Detalles de la Tarjeta</h2>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                        <Input id="cardName" placeholder="Como aparece en la tarjeta" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número de tarjeta</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Fecha de expiración</Label>
                          <Input id="expiry" placeholder="MM/AA" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-auction-dark">Pagar con PayPal</h2>
                      <p className="text-sm text-gray-600">Serás redirigido a PayPal para completar tu compra.</p>
                    </div>
                  )}

                  {paymentMethod === "bankTransfer" && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-auction-dark">Transferencia Bancaria</h2>
                      <p className="text-sm text-gray-600">Realiza la transferencia al siguiente número de cuenta:</p>
                      <p className="font-medium text-gray-700">1234 5678 9012 3456</p>
                      <p className="text-sm text-gray-500">Por favor, incluye tu ID de pedido en la referencia.</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-auction-primary hover:bg-auction-secondary"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Procesando..." : "Pagar"}
                  </Button>
                </form>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-auction-dark mb-4">Resumen del Pedido</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.auction.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-muted-foreground">
                        {item.auction.title}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.auction.currentBid)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-muted-foreground">Comisión (5%)</span>
                      <span className="font-medium">
                        {formatCurrency(total * 0.05)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-auction-primary">
                        {formatCurrency(total * 1.05)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payment;