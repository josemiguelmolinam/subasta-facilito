import { formatDate } from '@/lib/utils/date';
import { formatCurrency } from '@/lib/utils/currency';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, MessageCircle, Eye, Package, Clock, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'En tránsito':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'En preparación':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl bg-white border-auction-soft">
      <div className="relative h-48">
        <img
          src={purchase.image}
          alt={purchase.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-semibold text-lg text-white line-clamp-2">
            {purchase.title}
          </h3>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`
            px-3 py-1.5 rounded-full text-sm font-medium border
            ${getStatusColor(purchase.status)}
          `}>
            {purchase.status}
          </span>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-auction-secondary" />
            <span className="text-sm text-auction-secondary">
              {formatDate(purchase.purchaseDate)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-auction-secondary" />
            <span className="text-sm text-auction-secondary">
              {purchase.paymentMethod}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-auction-soft/30 rounded-lg">
          <span className="text-sm font-medium text-auction-secondary">Total</span>
          <span className="text-lg font-semibold text-auction-primary">
            {formatCurrency(purchase.totalPrice)}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-auction-soft hover:text-auction-primary transition-colors"
            onClick={() => console.log('View details')}
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-auction-soft hover:text-auction-primary transition-colors"
            onClick={handleDownloadInvoice}
          >
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full hover:bg-auction-soft hover:text-auction-primary transition-colors"
            onClick={handleContactSeller}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Button>
        </div>
      </div>
    </Card>
  );
};