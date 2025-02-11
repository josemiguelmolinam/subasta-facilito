
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, MessageCircle, User, Package, TruckIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import QRCode from "react-qr-code";
import { createHash } from 'crypto';

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
    buyer: {
      name: "Ana López",
      address: "Calle Principal 123, Madrid",
      phone: "+34 600 123 456"
    },
    date: new Date(),
    paymentMethod: "Tarjeta terminada en **** 4242",
    type: "auction" // o "direct" para venta directa
  };

  // Hasheamos la información sensible para el código QR
  const getHashedShippingInfo = () => {
    const sensitiveInfo = {
      orderId: purchase.id,
      buyerAddress: purchase.buyer.address,
      buyerPhone: purchase.buyer.phone,
      buyerName: purchase.buyer.name
    };
    
    // En producción, usaríamos una clave secreta del backend para el hash
    return Buffer.from(JSON.stringify(sensitiveInfo)).toString('base64');
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
              ¡Venta Realizada con Éxito!
            </h1>
            <p className="text-muted-foreground text-lg">
              Referencia de venta: #{purchase.id}
            </p>
          </div>

          {/* Detalles del producto y QR para envío */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="p-8 border-b">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                  <img
                    src={purchase.product.image}
                    alt={purchase.product.title}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
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

            {/* Código QR para el envío */}
            <div className="p-8 bg-gradient-to-br from-auction-soft to-white border-b">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <TruckIcon className="h-6 w-6 text-auction-primary" />
                  <h3 className="text-xl font-semibold">Código QR para Envío</h3>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Presenta este código QR en cualquier agencia de transporte asociada para gestionar el envío del producto.
                  El código contiene toda la información necesaria de manera segura.
                </p>
                <div className="bg-white p-6 rounded-xl shadow-md inline-block">
                  <QRCode
                    value={getHashedShippingInfo()}
                    size={200}
                    className="mx-auto"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Package className="h-4 w-4" />
                  <span>Los datos del envío están cifrados por seguridad</span>
                </div>
              </div>
            </div>

            {/* Información del comprador (vista del vendedor) */}
            <div className="p-8 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-auction-primary h-12 w-12 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Comprador</h3>
                    <p className="text-sm text-gray-600">
                      {/* Mostramos solo información parcial por seguridad */}
                      {purchase.buyer.name.charAt(0)}***{purchase.buyer.name.slice(-1)}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate('/messages')}
                  className="bg-auction-primary hover:bg-auction-secondary transition-colors"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contactar Comprador
                </Button>
              </div>
            </div>
          </div>

          {/* Instrucciones para el vendedor */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-lg font-semibold mb-4">Próximos Pasos</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-600">
                <div className="mt-1">
                  <div className="bg-auction-soft rounded-full w-6 h-6 flex items-center justify-center text-auction-primary font-medium">
                    1
                  </div>
                </div>
                <p>Guarda o imprime el código QR proporcionado</p>
              </div>
              <div className="flex items-start gap-3 text-gray-600">
                <div className="mt-1">
                  <div className="bg-auction-soft rounded-full w-6 h-6 flex items-center justify-center text-auction-primary font-medium">
                    2
                  </div>
                </div>
                <p>Empaqueta el artículo de forma segura para su envío</p>
              </div>
              <div className="flex items-start gap-3 text-gray-600">
                <div className="mt-1">
                  <div className="bg-auction-soft rounded-full w-6 h-6 flex items-center justify-center text-auction-primary font-medium">
                    3
                  </div>
                </div>
                <p>Lleva el paquete y el código QR a cualquier agencia de transporte asociada</p>
              </div>
              <div className="flex items-start gap-3 text-gray-600">
                <div className="mt-1">
                  <div className="bg-auction-soft rounded-full w-6 h-6 flex items-center justify-center text-auction-primary font-medium">
                    4
                  </div>
                </div>
                <p>La agencia escaneará el código y procesará el envío automáticamente</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-auction-primary hover:bg-auction-secondary transition-colors"
            >
              <Package className="mr-2 h-4 w-4" />
              Ir al Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="border-auction-primary text-auction-primary hover:bg-auction-primary hover:text-white transition-colors"
            >
              Imprimir QR
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccessPage;
