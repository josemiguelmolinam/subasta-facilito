
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, MessageCircle, User, ShoppingBag } from "lucide-react";
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
      description: "El último modelo de iPhone con pantalla de 6.7 pulgadas, procesador A16 Bionic y cámara profesional. Comprado hace 3 meses, en perfecto estado.",
      condition: "Como nuevo",
      location: "Madrid, España"
    },
    seller: {
      name: "Carlos Martinez",
      rating: 4.8,
      totalSales: 127,
      joinedDate: new Date(2023, 5, 15)
    },
    date: new Date(),
    paymentMethod: "Tarjeta terminada en **** 4242",
    type: "auction" // o "direct" para venta directa
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Header - Animación de éxito */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
              <CheckCircle className="h-24 w-24 text-green-500 mx-auto relative animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold text-auction-dark mt-6 mb-2">
              ¡{purchase.type === 'auction' ? 'Has ganado la subasta!' : 'Compra realizada con éxito!'}
            </h1>
            <p className="text-muted-foreground text-lg">
              Referencia de compra: #{purchase.id}
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
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      {purchase.product.condition}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      {purchase.product.location}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-auction-primary">
                    {formatCurrency(purchase.product.price)}
                  </div>
                </div>
              </div>
            </div>

            {/* Información del vendedor */}
            <div className="p-8 bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-auction-primary h-12 w-12 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{purchase.seller.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>⭐ {purchase.seller.rating}</span>
                      <span>•</span>
                      <span>{purchase.seller.totalSales} ventas</span>
                      <span>•</span>
                      <span>Miembro desde {format(purchase.seller.joinedDate, 'MMMM yyyy', { locale: es })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles de la compra */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Fecha de compra</p>
                  <p className="font-medium">
                    {format(purchase.date, "dd 'de' MMMM, yyyy", { locale: es })}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Método de pago</p>
                  <p className="font-medium">{purchase.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Próximos pasos y botones de acción */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-lg font-semibold mb-4">Próximos pasos</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <MessageCircle className="h-5 w-5 text-auction-primary" />
                <p>Ponte en contacto con el vendedor para coordinar los detalles de la entrega</p>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <ShoppingBag className="h-5 w-5 text-auction-primary" />
                <p>Revisa el estado y los detalles del producto al recibirlo</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => navigate('/messages')}
              className="bg-auction-primary hover:bg-auction-secondary transition-colors"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Contactar con el Vendedor
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/auctions/explore')}
              className="border-auction-primary text-auction-primary hover:bg-auction-primary hover:text-white transition-colors"
            >
              <Package className="mr-2 h-4 w-4" />
              Explorar más Subastas
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccessPage;

