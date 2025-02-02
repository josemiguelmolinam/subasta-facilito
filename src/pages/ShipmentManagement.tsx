import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Package, Scale, Ruler, QrCode, Truck, AlertCircle } from "lucide-react";
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

  const maskUsername = (name: string) => {
    if (!name) return "";
    return `${name.charAt(0)}${"*".repeat(name.length - 2)}${name.charAt(name.length - 1)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del envío:", shipmentData);
    
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
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header con información del usuario y progreso */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-auction-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="w-16 h-16 border-2 border-auction-primary">
                    <img 
                      src={user?.avatar || "https://via.placeholder.com/64"} 
                      alt="Usuario" 
                      className="rounded-full object-cover"
                    />
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-auction-dark">
                    Vendedor: {maskUsername(user?.name || "")}
                  </h2>
                  <p className="text-sm text-auction-secondary">
                    ID: {user?.id.slice(0, 4)}***{user?.id.slice(-4)}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline"
                className="flex items-center gap-2 hover:bg-auction-soft transition-colors"
                onClick={() => toast({
                  title: "Chat iniciado",
                  description: "Conectando con el vendedor...",
                })}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contactar</span>
              </Button>
            </div>
          </div>

          {/* Formulario de envío con diseño mejorado */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-auction-soft">
              <div className="flex items-center gap-3 mb-8">
                <Package className="w-8 h-8 text-auction-primary" />
                <h3 className="text-2xl font-bold text-auction-dark">Detalles del Paquete</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label htmlFor="weight" className="flex items-center gap-2 text-lg">
                    <Scale className="w-5 h-5 text-auction-secondary" />
                    Peso (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={shipmentData.weight}
                    onChange={(e) => setShipmentData({...shipmentData, weight: e.target.value})}
                    placeholder="0.0"
                    className="text-lg"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-lg">
                    <Ruler className="w-5 h-5 text-auction-secondary" />
                    Dimensiones (cm)
                  </Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Input
                        placeholder="Largo"
                        type="number"
                        value={shipmentData.length}
                        onChange={(e) => setShipmentData({...shipmentData, length: e.target.value})}
                        className="text-center"
                      />
                      <span className="text-xs text-auction-secondary mt-1 block text-center">Largo</span>
                    </div>
                    <div>
                      <Input
                        placeholder="Ancho"
                        type="number"
                        value={shipmentData.width}
                        onChange={(e) => setShipmentData({...shipmentData, width: e.target.value})}
                        className="text-center"
                      />
                      <span className="text-xs text-auction-secondary mt-1 block text-center">Ancho</span>
                    </div>
                    <div>
                      <Input
                        placeholder="Alto"
                        type="number"
                        value={shipmentData.height}
                        onChange={(e) => setShipmentData({...shipmentData, height: e.target.value})}
                        className="text-center"
                      />
                      <span className="text-xs text-auction-secondary mt-1 block text-center">Alto</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 space-y-4">
                  <Label htmlFor="description" className="text-lg">Descripción del contenido</Label>
                  <Textarea
                    id="description"
                    value={shipmentData.description}
                    onChange={(e) => setShipmentData({...shipmentData, description: e.target.value})}
                    placeholder="Describe el contenido del paquete"
                    className="min-h-[100px] text-lg"
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <Label htmlFor="instructions" className="text-lg">Instrucciones especiales</Label>
                  <Textarea
                    id="instructions"
                    value={shipmentData.specialInstructions}
                    onChange={(e) => setShipmentData({...shipmentData, specialInstructions: e.target.value})}
                    placeholder="Instrucciones especiales para el manejo del paquete"
                    className="min-h-[100px] text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Sección del código QR con animación y diseño mejorado */}
            {showQR && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-auction-soft animate-fade-in">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <div className="bg-auction-soft w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <QrCode className="w-8 h-8 text-auction-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-auction-dark mb-2">
                      Código QR para el transportista
                    </h3>
                    <p className="text-auction-secondary">
                      Presenta este código en la empresa de transporte
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg inline-block shadow-lg border-2 border-auction-soft hover:shadow-xl transition-shadow">
                    <QRCode
                      value={JSON.stringify({
                        shipmentData,
                        timestamp: new Date().toISOString(),
                        sellerId: user?.id,
                      })}
                      size={200}
                    />
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-auction-secondary">
                    <Truck className="w-5 h-5" />
                    <p className="text-sm">
                      El transportista escaneará este código para generar el albarán
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                className="min-w-[150px]"
                onClick={() => window.history.back()}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="min-w-[150px] bg-auction-primary hover:bg-auction-secondary text-white gap-2"
              >
                <Package className="w-5 h-5" />
                Generar etiqueta
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShipmentManagement;