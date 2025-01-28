import { formatDate } from '@/lib/utils/date';
import { formatCurrency } from '@/lib/utils/currency';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, MessageCircle, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Purchase {
  id: string;
  title: string;
  image: string;
  purchaseDate: Date;
  totalPrice: number;
  paymentMethod: string;
  status: string;
  seller: {
    id: string;
    name: string;
    email: string;
  };
}

interface PurchaseCardProps {
  purchase: Purchase;
}

export const PurchaseCard = ({ purchase }: PurchaseCardProps) => {
  const { toast } = useToast();

  const handleDownloadInvoice = () => {
    console.log('Downloading invoice for purchase:', purchase.id);
    toast({
      title: "Descargando factura",
      description: "Tu factura se descargará en breve",
    });
  };

  const handleContactSeller = () => {
    console.log('Contacting seller:', purchase.seller.email);
    toast({
      title: "Contactar vendedor",
      description: `Contactando a ${purchase.seller.name}...`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <img
          src={purchase.image}
          alt={purchase.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${purchase.status === 'Entregado' ? 'bg-green-100 text-green-800' :
              purchase.status === 'En tránsito' ? 'bg-blue-100 text-blue-800' :
              purchase.status === 'En preparación' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'}
          `}>
            {purchase.status}
          </span>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-auction-dark line-clamp-2">
            {purchase.title}
          </h3>
          <p className="text-sm text-auction-secondary mt-1">
            {formatDate(purchase.purchaseDate)}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-auction-secondary">Total</span>
            <span className="font-semibold text-auction-dark">
              {formatCurrency(purchase.totalPrice)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-auction-secondary">Método de pago</span>
            <span className="text-sm text-auction-dark">{purchase.paymentMethod}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => console.log('View details')}
          >
            <Eye className="w-4 h-4 mr-1" />
            Ver
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleDownloadInvoice}
          >
            <Download className="w-4 h-4 mr-1" />
            PDF
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleContactSeller}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
        </div>
      </div>
    </Card>
  );
};