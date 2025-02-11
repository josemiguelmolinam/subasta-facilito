
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/lib/utils/currency";
import { Package, MessageCircle, CreditCard, Receipt, Clock, User, MapPin, Truck } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const PurchaseConfirmationPage = () => {
  const navigate = useNavigate();

  // Mock data (en un caso real vendría de una API)
  const purchase = {
    id: "PUR" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    product: {
      title: "iPhone 15 Pro Max - 256GB",
      price: 1199.99,
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80",
      condition: "Como nuevo",
      description: "El último modelo de iPhone con pantalla de 6.7 pulgadas, procesador A16 Bionic y cámara profesional."
    },
    seller: {
      name: "Carlos Martinez",
      rating: 4.8,
      totalSales: 127,
      response_time: "2 horas"
    },
    shipping: {
      status: "Pendiente de envío",
      address: "Calle Principal 123, Madrid, España",
      estimated_delivery: "3-5 días hábiles",
      tracking_number: null
    },
    payment: {
      method: "Tarjeta terminada en **** 4242",
      total: 1199.99,
      date: new Date().toISOString(),
      status: "Completado"
    }
  };

  const handleContactSeller = () => {
    toast({
      title: "Contactando al vendedor",
      description: "Te redirigiremos al chat con el vendedor",
    });
    // En un caso real, aquí redirigiríamos al chat
    navigate('/messages');
  };

  const handleDownloadInvoice = () => {
    toast({
      title: "Descargando factura",
      description: "Tu factura se descargará en breve",
    });
    // Aquí iría la lógica real de descarga
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Cabecera de confirmación */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Package className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-auction-dark">¡Compra Realizada con Éxito!</h1>
            <p className="text-gray-600">
              Pedido #{purchase.id} • {new Date(purchase.payment.date).toLocaleDateString()}
            </p>
          </div>

          {/* Detalles del producto */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex gap-6">
                <div className="w-32 h-32">
                  <img
                    src={purchase.product.image}
                    alt={purchase.product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <h2 className="text-xl font-semibold text-auction-dark">
                    {purchase.product.title}
                  </h2>
                  <p className="text-gray-600">{purchase.product.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-auction-soft rounded-full text-sm text-auction-primary">
                      {purchase.product.condition}
                    </span>
                    <span className="text-xl font-bold text-auction-primary">
                      {formatCurrency(purchase.product.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información del vendedor */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-auction-soft rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-auction-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-auction-dark">{purchase.seller.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>⭐ {purchase.seller.rating}</span>
                    <span>•</span>
                    <span>{purchase.seller.totalSales} ventas</span>
                  </div>
                </div>
              </div>
              <Button onClick={handleContactSeller} variant="outline" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Contactar
              </Button>
            </div>
          </div>

          {/* Estado del envío */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-auction-dark flex items-center gap-2">
              <Truck className="w-5 h-5 text-auction-primary" />
              Información de Envío
            </h3>
            <div className="grid gap-4">
              <div className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-auction-secondary mt-1" />
                <div>
                  <p className="font-medium text-auction-dark">Dirección de envío</p>
                  <p>{purchase.shipping.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-auction-secondary mt-1" />
                <div>
                  <p className="font-medium text-auction-dark">Entrega estimada</p>
                  <p>{purchase.shipping.estimated_delivery}</p>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-800">
                  El vendedor tiene 48 horas para realizar el envío. Recibirás una notificación cuando el producto sea enviado.
                </p>
              </div>
            </div>
          </div>

          {/* Resumen de pago */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-auction-dark flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-auction-primary" />
              Detalles del Pago
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Método de pago</span>
                <span>{purchase.payment.method}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estado</span>
                <span className="text-green-600 font-medium">{purchase.payment.status}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-medium text-auction-dark">Total pagado</span>
                <span className="text-xl font-bold text-auction-primary">
                  {formatCurrency(purchase.payment.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate('/my-purchases')} className="bg-auction-primary hover:bg-auction-secondary">
              <Package className="mr-2 h-4 w-4" />
              Ver Mis Compras
            </Button>
            <Button variant="outline" onClick={handleDownloadInvoice}>
              <Receipt className="mr-2 h-4 w-4" />
              Descargar Factura
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PurchaseConfirmationPage;
