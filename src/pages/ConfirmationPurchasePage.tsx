import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "@/lib/utils/currency";
import { useState } from "react";
import { Truck, ShieldCheck, Package, Ruler, Scale, MapPin } from "lucide-react";
import { PageLoader } from "@/components/ui/loader";

const ConfirmPurchasePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock: Información del artículo (en un caso real, se obtendría de una API)
  const auction = {
    id,
    title: "iPhone 15 Pro Max - 256GB",
    description: "El último modelo de iPhone con pantalla de 6.7 pulgadas, procesador A16 Bionic y cámara profesional.",
    quantity: 1,
    buyNowPrice: 1199.99,
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80",
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [weight, setWeight] = useState(0.5);
  const [dimensions, setDimensions] = useState({ length: 10, width: 10, height: 10 });
  const [address, setAddress] = useState("");

  // Opciones de envío dinámicas en función del peso y dimensiones
  const shippingOptions = [
    { id: 1, name: "Envío estándar (3-5 días)", baseCost: 10, provider: "Correos" },
    { id: 2, name: "Envío rápido (1-2 días)", baseCost: 25, provider: "DHL" },
    { id: 3, name: "Envío urgente (24 horas)", baseCost: 50, provider: "FedEx" },
  ].map((option) => {
    const volumeFactor = (dimensions.length * dimensions.width * dimensions.height) / 5000; // Factor volumétrico
    const weightFactor = weight > 1 ? weight * 0.5 : 0; // Incremento por peso
    return {
      ...option,
      cost: option.baseCost + volumeFactor + weightFactor,
    };
  });

  // Función para proceder al Checkout
  const handleConfirm = async () => {
    if (!address) {
      alert("Por favor, ingrese una dirección de envío válida.");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simular proceso de confirmación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirigir a la página de éxito
      navigate('/order-success');
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return <PageLoader />;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Contenedor: Detalles del artículo */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-auction-dark mb-4">Detalles del Artículo</h2>
            <div className="flex items-center space-x-6">
              <img
                src={auction.imageUrl}
                alt={auction.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-auction-dark">{auction.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{auction.description}</p>
                <p className="text-sm text-gray-600">Cantidad: {auction.quantity}</p>
                <p className="text-lg font-bold text-auction-primary mt-2">
                  Precio: {formatCurrency(auction.buyNowPrice)}
                </p>
              </div>
            </div>
          </div>

          {/* Peso y dimensiones del artículo */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-auction-dark mb-4 flex items-center">
              <Scale className="w-6 h-6 text-auction-primary mr-2" /> Peso y Dimensiones del Artículo
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Peso (kg)</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0.1)}
                  className="w-full p-3 border rounded-md text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Largo (cm)</label>
                <input
                  type="number"
                  min="1"
                  value={dimensions.length}
                  onChange={(e) => setDimensions({ ...dimensions, length: parseFloat(e.target.value) || 1 })}
                  className="w-full p-3 border rounded-md text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Ancho (cm)</label>
                <input
                  type="number"
                  min="1"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({ ...dimensions, width: parseFloat(e.target.value) || 1 })}
                  className="w-full p-3 border rounded-md text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Alto (cm)</label>
                <input
                  type="number"
                  min="1"
                  value={dimensions.height}
                  onChange={(e) => setDimensions({ ...dimensions, height: parseFloat(e.target.value) || 1 })}
                  className="w-full p-3 border rounded-md text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Contenedor: Transporte */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-auction-dark mb-4 flex items-center">
              <Truck className="w-6 h-6 text-auction-primary mr-2" /> Transporte
            </h2>

            {/* Opciones de envío */}
            <div className="space-y-4">
              {shippingOptions.map((option) => (
                <div key={option.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-gray-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{option.name}</p>
                      <p className="text-sm text-gray-500">Proveedor: {option.provider}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{formatCurrency(option.cost)}</p>
                    <input
                      type="radio"
                      name="shipping"
                      className="mt-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contenedor: Dirección de envío */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-auction-dark mb-4 flex items-center">
              <MapPin className="w-6 h-6 text-auction-primary mr-2" /> Dirección de Envío
            </h2>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Introduce tu dirección completa"
              className="w-full p-4 border rounded-md text-gray-700"
              rows={4}
            ></textarea>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handleConfirm}
              className="bg-auction-primary hover:bg-auction-secondary w-full sm:w-auto"
              disabled={isProcessing}
            >
              Confirmar y Proceder al Pago
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto ml-4"
              disabled={isProcessing}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ConfirmPurchasePage;
