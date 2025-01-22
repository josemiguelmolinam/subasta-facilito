import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-auction-dark mb-4">
              ¡Pedido Completado!
            </h1>
            <p className="text-muted-foreground mb-8">
              Tu pedido ha sido procesado exitosamente. Te hemos enviado un correo con los detalles de tu compra.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => navigate('/explore')}
              className="bg-auction-primary hover:bg-auction-secondary w-full sm:w-auto"
            >
              Volver a las Subastas
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
              className="w-full sm:w-auto sm:ml-4"
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
