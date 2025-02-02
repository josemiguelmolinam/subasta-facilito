import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Package, Scale, Ruler, QrCode } from "lucide-react";
import QRCode from "react-qr-code";

const ShipmentManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showQR, setShowQR] = useState(false);
  const [shipmentData, setShipmentData] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
    description: "",
    specialInstructions: "",
  });

  // Función para ocultar parte del nombre de usuario
  const maskUsername = (name: string) => {
    if (!name) return "";
    return `${name.charAt(0)}${"*".repeat(name.length - 2)}${name.charAt(name.length - 1)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del envío:", shipmentData);
    
    // Generar un código único para el QR
    const shipmentCode = `SHIP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    setShowQR(true);
    toast({
      title: "¡Envío registrado!",
      description: "Se ha generado el código QR para el transportista.",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Header con información del usuario */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <img 
                  src={user?.avatar || "https://via.placeholder.com/40"} 
                  alt="Usuario" 
                  className="rounded-full"
                />
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold text-auction-dark">
                  Vendedor: {maskUsername(user?.name || "")}
                </h2>
                <p className="text-sm text-auction-secondary">
                  ID: {user?.id.slice(0, 4)}***{user?.id.slice(-4)}
                </p>
              </div>
              <Button 
                variant="outline" 
                className="ml-auto"
                onClick={() => toast({
                  title: "Chat iniciado",
                  description: "Conectando con el vendedor...",
                })}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </div>
          </div>

          {/* Formulario de envío */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-auction-primary" />
                Datos del paquete
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center">
                    <Scale className="w-4 h-4 mr-2" />
                    Peso (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={shipmentData.weight}
                    onChange={(e) => setShipmentData({...shipmentData, weight: e.target.value})}
                    placeholder="0.0"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dimensions" className="flex items-center">
                    <Ruler className="w-4 h-4 mr-2" />
                    Dimensiones (cm)
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      placeholder="Largo"
                      type="number"
                      value={shipmentData.length}
                      onChange={(e) => setShipmentData({...shipmentData, length: e.target.value})}
                    />
                    <Input
                      placeholder="Ancho"
                      type="number"
                      value={shipmentData.width}
                      onChange={(e) => setShipmentData({...shipmentData, width: e.target.value})}
                    />
                    <Input
                      placeholder="Alto"
                      type="number"
                      value={shipmentData.height}
                      onChange={(e) => setShipmentData({...shipmentData, height: e.target.value})}
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <Label htmlFor="description">Descripción del contenido</Label>
                  <Textarea
                    id="description"
                    value={shipmentData.description}
                    onChange={(e) => setShipmentData({...shipmentData, description: e.target.value})}
                    placeholder="Describe el contenido del paquete"
                    className="mt-1"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="instructions">Instrucciones especiales</Label>
                  <Textarea
                    id="instructions"
                    value={shipmentData.specialInstructions}
                    onChange={(e) => setShipmentData({...shipmentData, specialInstructions: e.target.value})}
                    placeholder="Instrucciones especiales para el manejo del paquete"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Sección del código QR */}
            {showQR && (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="mb-4">
                  <QrCode className="w-8 h-8 mx-auto mb-2 text-auction-primary" />
                  <h3 className="text-lg font-semibold">Código QR para el transportista</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Presenta este código en la empresa de transporte
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
                  <QRCode
                    value={JSON.stringify({
                      shipmentData,
                      timestamp: new Date().toISOString(),
                      sellerId: user?.id,
                    })}
                    size={200}
                  />
                </div>
                <p className="mt-4 text-sm text-auction-secondary">
                  El transportista escaneará este código para generar el albarán
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="bg-auction-primary hover:bg-auction-secondary"
              >
                Generar etiqueta de envío
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShipmentManagement;