import React, { useState } from 'react';
import { 
  Truck, User, Download, CreditCard, MessageCircle, ShieldCheck, CheckCircle,
  Wallet, Building2
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils/date";
import { formatCurrency } from "@/lib/utils/currency";

interface Purchase {
  id: string;
  title: string;
  image: string;
  purchaseDate: Date;
  price: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'completed';
  paymentMethod: 'credit_card' | 'paypal' | 'transfer';
  paymentReleased: boolean;
  seller: {
    id: string;
    name: string;
    email: string;
  };
  shipping?: {
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: Date;
  };
}

interface MyPurchaseDetailsProps {
  purchase: Purchase;
  onReleasePayment: (purchaseId: string) => void;
}

// Función para hashear el nombre del vendedor
const hashName = (name: string): string => {
  if (!name) return '****';
  const firstChar = name.charAt(0);
  const lastChar = name.charAt(name.length - 1);
  const middleHash = '*'.repeat(Math.min(4, name.length - 2));
  return `${firstChar}${middleHash}${lastChar}`;
};

// Función para obtener el ícono del método de pago
const getPaymentMethodIcon = (method: Purchase['paymentMethod']) => {
  switch (method) {
    case 'paypal':
      return <Wallet className="h-4 w-4 text-blue-500" />;
    case 'transfer':
      return <Building2 className="h-4 w-4 text-green-500" />;
    case 'credit_card':
    default:
      return <CreditCard className="h-4 w-4 text-gray-700" />;
  }
};

// Función para obtener el texto del método de pago
const getPaymentMethodText = (method: Purchase['paymentMethod']) => {
  switch (method) {
    case 'paypal':
      return 'PayPal';
    case 'transfer':
      return 'Transferencia Bancaria';
    case 'credit_card':
    default:
      return 'Tarjeta de Crédito';
  }
};

export const MyPurchaseDetails = ({ purchase, onReleasePayment }: MyPurchaseDetailsProps) => {
  const { toast } = useToast();
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  
  const handleDownloadInvoice = () => {
    toast({
      title: "Descargando factura",
      description: "Tu factura se descargará en breve"
    });
  };
  
  const handleContactSeller = () => {
    toast({
      title: "Contactando al vendedor",
      description: "Te redirigiremos al chat con el vendedor"
    });
  };
  
  const handleVerifyAndReleasePayment = () => {
    onReleasePayment(purchase.id);
    setIsVerificationOpen(false);
    toast({
      title: "Pago liberado",
      description: "El pago ha sido liberado al vendedor"
    });
  };
  
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información de envío */}
        <div className="space-y-4">
          <h4 className="font-semibold text-auction-dark flex items-center gap-2">
            <Truck className="h-4 w-4 text-auction-primary" /> 
            Información de Envío
          </h4>
          
          <div className="border rounded-lg p-4 bg-white">
            <div className="space-y-2">
              {purchase.shipping?.trackingNumber ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Número de seguimiento:</span>
                    <span className="font-medium">{purchase.shipping.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transportista:</span>
                    <span className="font-medium">{purchase.shipping.carrier}</span>
                  </div>
                  {purchase.shipping.estimatedDelivery && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Entrega estimada:</span>
                      <span className="font-medium">
                        {formatDate(purchase.shipping.estimatedDelivery)}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500 py-2">
                  Información de envío pendiente
                </div>
              )}
            </div>
          </div>
          
          {/* Información de pago */}
          <h4 className="font-semibold text-auction-dark flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-auction-primary" /> 
            Detalles del Pago
          </h4>
          
          <div className="border rounded-lg p-4 bg-white">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Método de pago:</span>
                <span className="font-medium flex items-center gap-2">
                  {getPaymentMethodIcon(purchase.paymentMethod)}
                  {getPaymentMethodText(purchase.paymentMethod)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fecha de compra:</span>
                <span className="font-medium">{formatDate(purchase.purchaseDate)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total pagado:</span>
                <span className="font-medium text-auction-primary">{formatCurrency(purchase.price)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estado del pago:</span>
                <span className={`font-medium ${purchase.paymentReleased ? 'text-green-600' : 'text-orange-500'}`}>
                  {purchase.paymentReleased ? 'Liberado' : 'Pendiente de liberación'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Información del vendedor y acciones */}
        <div className="space-y-4">
          <h4 className="font-semibold text-auction-dark flex items-center gap-2">
            <User className="h-4 w-4 text-auction-primary" /> 
            Información del Vendedor
          </h4>
          
          <div className="border rounded-lg p-4 bg-white space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Vendedor:</span>
                <span className="font-medium">{hashName(purchase.seller.name)}</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              className="w-full"
              onClick={handleContactSeller}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contactar vendedor
            </Button>
          </div>
          
          {/* Acciones de compra */}
          <h4 className="font-semibold text-auction-dark flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-auction-primary" /> 
            Acciones
          </h4>
          
          <div className="space-y-3">
            <Button 
              variant="outline"
              className="w-full"
              onClick={handleDownloadInvoice}
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar factura
            </Button>
            
            {!purchase.paymentReleased && purchase.status === 'delivered' && (
              <Button 
                variant="success"
                className="w-full"
                onClick={() => setIsVerificationOpen(true)}
              >
                <ShieldCheck className="h-4 w-4 mr-2" />
                Verificar y liberar pago
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal de verificación */}
      <Dialog open={isVerificationOpen} onOpenChange={setIsVerificationOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Verificación del producto</DialogTitle>
            <DialogDescription>
              Por favor, confirma que has recibido el producto en perfectas condiciones 
              antes de liberar el pago al vendedor.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">El producto está en buenas condiciones</p>
                <p className="text-sm text-gray-500">He revisado el producto y está tal como se describía</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">El producto funciona correctamente</p>
                <p className="text-sm text-gray-500">He probado el producto y funciona como se esperaba</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Confirmo la liberación del pago</p>
                <p className="text-sm text-gray-500">Entiendo que esta acción no se puede deshacer</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerificationOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleVerifyAndReleasePayment}>
              Liberar pago
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
