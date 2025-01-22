import { MainLayout } from "@/components/layout/MainLayout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, removeItem, clearCart, total } = useCart();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold text-auction-dark mb-8">Mi Carrito</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-16 w-16 text-auction-soft mb-4" />
            <h2 className="text-2xl font-semibold text-auction-dark mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-muted-foreground mb-4">
              ¡Explora nuestras subastas y encuentra algo especial!
            </p>
            <Button
              onClick={() => navigate('/auctions')}
              className="bg-auction-primary hover:bg-auction-secondary text-white"
            >
              Ver Subastas
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {items.map((item) => (
                  <div
                    key={item.auction.id}
                    className="flex items-center gap-4 p-4 border-b last:border-b-0"
                  >
                    <img
                      src={item.auction.imageUrl}
                      alt={item.auction.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-auction-dark">
                        {item.auction.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="font-medium text-auction-primary">
                        {formatCurrency(item.auction.currentBid)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.auction.id)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpiar Carrito
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-auction-dark mb-4">
                  Resumen del Pedido
                </h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comisión (5%)</span>
                    <span className="font-medium">{formatCurrency(total * 0.05)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-auction-primary">
                        {formatCurrency(total * 1.05)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => navigate('/payment')}
                  className="w-full bg-auction-primary hover:bg-auction-secondary text-white"
                >
                  Proceder al Pago
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;