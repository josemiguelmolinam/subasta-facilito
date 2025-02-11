
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, Truck, Calendar, CreditCard } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  
  // Mock data (en un caso real vendría de un contexto o estado)
  const purchase = {
    id: "ORD" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    product: {
      title: "iPhone 15 Pro Max - 256GB",
      price: 1199.99,
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80",
      description: "El último modelo de iPhone con pantalla de 6.7 pulgadas, procesador A16 Bionic y cámara profesional."
    },
    date: new Date(),
    paymentMethod: "Tarjeta terminada en **** 4242",
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Header - Animación de éxito */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
              <CheckCircle className="h-24 w-24 text-green-500 mx-auto relative animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-auction-dark mt-6 mb-2">
              ¡Compra Realizada con Éxito!
            </h1>
            <p className="text-muted-foreground text-lg">
              Tu pedido #{purchase.id} ha sido confirmado
            </p>
          </div>

          {/* Contenedor principal */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* Detalles del producto */}
            <div className="p-8 border-b">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                  <img
                    src={purchase.product.image}
                    alt={purchase.product.title}
                    className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                  <h2 className="text-2xl font-semibold text-auction-dark">
                    {purchase.product.title}
                  </h2>
                  <p className="text-gray-600">
                    {purchase.product.description}
                  </p>
                  <div className="text-2xl font-bold text-auction-primary">
                    {formatCurrency(purchase.product.price)}
                  </div>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-gray-50">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-auction-primary" />
                <div>
                  <p className="text-sm text-gray-600">Fecha de compra</p>
                  <p className="font-medium">
                    {format(purchase.date, "dd 'de' MMMM, yyyy", { locale: es })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-auction-primary" />
                <div>
                  <p className="text-sm text-gray-600">Método de pago</p>
                  <p className="font-medium">{purchase.paymentMethod}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-8 w-8 text-auction-primary" />
                <div>
                  <p className="text-sm text-gray-600">Entrega estimada</p>
                  <p className="font-medium">
                    {format(purchase.estimatedDelivery, "dd 'de' MMMM", { locale: es })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => navigate('/auctions/explore')}
              className="bg-auction-primary hover:bg-auction-secondary transition-colors"
            >
              <Package className="mr-2 h-4 w-4" />
              Explorar más Subastas
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/my-purchases')}
              className="border-auction-primary text-auction-primary hover:bg-auction-primary hover:text-white transition-colors"
            >
              <Truck className="mr-2 h-4 w-4" />
              Ver mis Compras
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccessPage;
