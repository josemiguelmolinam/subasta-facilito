
import React, { useState } from 'react';
import { 
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/";
import { 
  Package, 
  User, 
  Download, 
  MessageCircle, 
  CheckCircle2, 
  CreditCard,
  CalendarClock,
  Building2
} from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import { useToast } from "@/hooks/use-toast";

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

// Función para obtener el texto del método de pago
const getPaymentMethodText = (method: string) => {
  switch (method) {
    case 'credit_card':
      return 'Tarjeta de crédito';
    case 'paypal':
      return 'PayPal';
    case 'transfer':
      return 'Transferencia bancaria';
    default:
      return 'Desconocido';
  }
};

export const MyPurchaseDetails = ({ purchase, onReleasePayment }: MyPurchaseDetailsProps) => {
  const { toast } = useToast();
  const [isReleaseDialogOpen, setIsReleaseDialogOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleDownloadInvoice = () => {
    console.log('Descargando factura para compra:', purchase.id);
    toast({
      title: "Descargando factura",
      description: "Tu factura se descargará en breve"
    });
  };

  const handleContactSeller = () => {
    console.log('Contactando vendedor:', purchase.seller.email);
    toast({
      title: "Contactar vendedor",
      description: `Contactando a ${purchase.seller.name}...`
    });
  };

  const handleVerifyAndRelease = () => {
    if (isVerified) {
      onReleasePayment(purchase.id);
      setIsReleaseDialogOpen(false);
      setIsVerified(false);
    } else {
      toast({
        title: "Verificación necesaria",
        description: "Por favor, verifica que has recibido el producto correctamente",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información de envío */}
        <div className="space-y-4">
          <h4 className="font-semibold text-auction-dark flex items-center gap-2">
            <Package className="h-4 w-4 text-auction-primary" /> 
            Información de Envío
          </h4>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            {purchase.shipping ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Número de seguimiento:</span>
                  <span className="text-sm font-medium">{purchase.shipping.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Transportista:</span>
                  <span className="text-sm font-medium">{purchase.shipping.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Entrega estimada:</span>
                  <span className="text-sm font-medium">
                    {purchase.shipping.estimatedDelivery 
                      ? formatDate(purchase.shipping.estimatedDelivery) 
                      : 'No disponible'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-sm text-gray-500">No hay información de envío disponible</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Información de pago y vendedor */}
        <div className="space-y-4">
          <h4 className="font-semibold text-auction-dark flex items-center gap-2">
            <Building2 className="h-4 w-4 text-auction-primary" /> 
            Información del Vendedor
          </h4>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Vendedor:</span>
                <span className="text-sm font-medium">{purchase.seller.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Fecha de compra:</span>
                <span className="text-sm font-medium">{formatDate(purchase.purchaseDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Método de pago:</span>
                <span className="text-sm font-medium">{getPaymentMethodText(purchase.paymentMethod)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total:</span>
                <span className="text-sm font-medium text-auction-primary">{formatCurrency(purchase.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Acciones */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleDownloadInvoice}
          className="flex-1"
        >
          <Download className="h-4 w-4 mr-2" />
          Descargar factura
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleContactSeller}
          className="flex-1"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Contactar vendedor
        </Button>
        
        {!purchase.paymentReleased && purchase.status === 'delivered' && (
          <Dialog open={isReleaseDialogOpen} onOpenChange={setIsReleaseDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Liberar pago
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmación de liberación de pago</DialogTitle>
                <DialogDescription>
                  Antes de liberar el pago al vendedor, por favor verifica que:
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex items-start gap-2">
                  <input 
                    type="checkbox" 
                    id="verify-product" 
                    className="mt-1"
                    checked={isVerified}
                    onChange={(e) => setIsVerified(e.target.checked)}
                  />
                  <label htmlFor="verify-product" className="text-sm">
                    He recibido el producto en buenas condiciones y corresponde con la descripción del anuncio.
                    Entiendo que al liberar el pago, acepto el producto como se describe y termina el proceso de compra.
                  </label>
                </div>
                
                <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
                  <p className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4" />
                    Si no liberas el pago, se liberará automáticamente a los 14 días de la entrega confirmada.
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReleaseDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  onClick={handleVerifyAndRelease}
                  disabled={!isVerified}
                  className={!isVerified ? 'opacity-50' : ''}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Confirmar y liberar pago
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};
