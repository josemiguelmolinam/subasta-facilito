import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import QRCode from "react-qr-code";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const trackingCode = "TR" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-auction-dark mb-4">
              ¡Pedido Completado con Éxito!
            </h1>
            <p className="text-muted-foreground mb-8">
              Te hemos enviado un correo electrónico con los detalles de tu compra y el código QR.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <QRCode value={trackingCode} size={200} />
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg font-semibold mb-2">Código de Seguimiento:</p>
            <p className="text-2xl font-bold text-auction-primary">{trackingCode}</p>
            <p className="text-sm text-gray-600 mt-4">
              Presenta este código QR en la agencia de transportes para la entrega de tu producto
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => navigate('/auctions/explore')}
              className="bg-auction-primary hover:bg-auction-secondary"
            >
              Explorar más Subastas
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
            >
              Ver mis Compras
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccessPage;