
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, Heart, Calendar, Settings, 
  CreditCard, ShoppingCart, Gift, 
  Truck, FileText, ArrowUpRight, 
  Store
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/my-purchases')}
            className="flex flex-col h-24 gap-1 hover:bg-auction-soft hover:text-auction-primary transition-colors"
          >
            <Package className="h-5 w-5" />
            <span>Mis Compras</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => navigate('/my-sales')}
            className="flex flex-col h-24 gap-1 hover:bg-auction-soft hover:text-auction-primary transition-colors"
          >
            <Store className="h-5 w-5" />
            <span>Mis Ventas</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => navigate('/wishlist')}
            className="flex flex-col h-24 gap-1 hover:bg-auction-soft hover:text-auction-primary transition-colors"
          >
            <Heart className="h-5 w-5" />
            <span>Lista de deseos</span>
          </Button>

          <Button 
            variant="outline" 
            onClick={() => navigate('/profile/edit')}
            className="flex flex-col h-24 gap-1 hover:bg-auction-soft hover:text-auction-primary transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span>Ajustes</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/payment')}
            className="flex flex-col h-24 gap-1 hover:bg-auction-soft hover:text-auction-primary transition-colors"
          >
            <CreditCard className="h-5 w-5" />
            <span>Métodos de pago</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/cart')}
            className="flex flex-col h-24 gap-1 hover:bg-auction-soft hover:text-auction-primary transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Carrito</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/auctions/create')}
            className="flex flex-col h-24 gap-1 hover:bg-auction-soft hover:text-auction-primary transition-colors"
          >
            <Gift className="h-5 w-5" />
            <span>Crear subasta</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/shipment/123')}
            className="flex flex-col h-24 gap-1 hover:bg-auction-soft hover:text-auction-primary transition-colors"
          >
            <Truck className="h-5 w-5" />
            <span>Ver envíos</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
