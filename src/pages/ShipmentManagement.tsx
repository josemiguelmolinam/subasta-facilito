import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Package, 
  Scale, 
  Ruler, 
  QrCode, 
  Truck,
  User,
  DollarSign,
  Trophy,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ShipmentManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { id } = useParams();
  const [showQR, setShowQR] = useState(false);
  const [shippingPayer, setShippingPayer] = useState<"seller" | "buyer">("seller");
  const [shipmentData, setShipmentData] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
    description: "",
    specialInstructions: "",
  });

  // Mock data - En producción vendría de una API
  const auctionData = {
    title: "iPhone 15 Pro Max - 256GB",
    finalPrice: 950,
    buyer: {
      name: "María García",
      id: "12345",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
    },
    images: ["https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80"]
  };

  const maskUsername = (name: string) => {
    if (!name) return "";
    return `${name.charAt(0)}${"*".repeat(name.length - 2)}${name.charAt(name.length - 1)}`;
  };

  const isFormValid = () => {
    return (
      shipmentData.weight.trim() !== "" &&
      shipmentData.length.trim() !== "" &&
      shipmentData.width.trim() !== "" &&
      shipmentData.height.trim() !== "" &&
      shipmentData.description.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, completa todos los campos requeridos antes de generar el código QR.",
      });
      return;
    }
    
    console.log("Datos del envío:", { ...shipmentData, shippingPayer });
    const shipmentCode = `SHIP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    setShowQR(true);
    toast({
      title: "¡Envío registrado!",
      description: "Se ha generado el código QR para el transportista.",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Detalles de la subasta */}
          <Card className="border-2 border-auction-soft bg-gradient-to-br from-white to-auction-soft/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-auction-dark">
                  Gestión del Envío
                </CardTitle>
                <Badge variant="secondary" className="text-auction-primary">
                  ID: {id}
                </Badge>
              </div>
              <CardDescription>
                Completa los detalles del envío para generar la etiqueta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Información del artículo */}
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={auctionData.images[0]} 
                      alt={auctionData.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold truncate">{auctionData.title}</h3>
                      <div className="flex items-center gap-2 text-white/90">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">{auctionData.finalPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información del comprador */}
                <div className="bg-white rounded-xl p-4 border border-auction-soft shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <Trophy className="w-6 h-6 text-auction-primary" />
                    <h3 className="text-lg font-semibold">Ganador de la Subasta</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-auction-soft">
                      <img src={auctionData.buyer.avatar} alt="Comprador" />
                    </Avatar>
                    <div>
                      <p className="font-medium">{maskUsername(auctionData.buyer.name)}</p>
                      <p className="text-sm text-gray-500">ID: {auctionData.buyer.id.slice(0, 4)}***{auctionData.buyer.id.slice(-4)}</p>
                      <Badge variant="outline" className="mt-2">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verificado
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Información del vendedor */}
              <div className="bg-white rounded-xl p-6 border border-auction-soft shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 border-2 border-auction-primary">
                        <img 
                          src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                          alt="Usuario" 
                          className="rounded-full object-cover"
                        />
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-auction-dark">
                        Vendedor: {maskUsername(user?.name || "")}
                      </h2>
                      <p className="text-sm text-auction-secondary">
                        ID: {user?.id?.slice(0, 4)}***{user?.id?.slice(-4)}
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

              {/* Selector de quién paga el envío */}
              <div className="bg-white rounded-xl p-6 border border-auction-soft shadow-sm">
                <Label className="text-lg mb-4 block">¿Quién se hace cargo del envío?</Label>
                <Select value={shippingPayer} onValueChange={(value: "seller" | "buyer") => setShippingPayer(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona quién paga el envío" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seller">Vendedor</SelectItem>
                    <SelectItem value="buyer">Comprador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Package className="w-8 h-8 text-auction-primary" />
                      <CardTitle>Detalles del Paquete</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <Label htmlFor="weight" className="flex items-center gap-2 text-lg">
                          <Scale className="w-5 h-5 text-auction-secondary" />
                          Peso (kg) *
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          step="0.1"
                          value={shipmentData.weight}
                          onChange={(e) => setShipmentData({...shipmentData, weight: e.target.value})}
                          placeholder="0.0"
                          className="text-lg"
                          required
                        />
                      </div>

                      <div className="space-y-4">
                        <Label className="flex items-center gap-2 text-lg">
                          <Ruler className="w-5 h-5 text-auction-secondary" />
                          Dimensiones (cm) *
                        </Label>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Input
                              placeholder="Largo"
                              type="number"
                              value={shipmentData.length}
                              onChange={(e) => setShipmentData({...shipmentData, length: e.target.value})}
                              className="text-center"
                              required
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
                              required
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
                              required
                            />
                            <span className="text-xs text-auction-secondary mt-1 block text-center">Alto</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-2 space-y-4">
                        <Label htmlFor="description" className="text-lg">Descripción del contenido *</Label>
                        <Textarea
                          id="description"
                          value={shipmentData.description}
                          onChange={(e) => setShipmentData({...shipmentData, description: e.target.value})}
                          placeholder="Describe el contenido del paquete"
                          className="min-h-[100px] text-lg"
                          required
                        />
                      </div>

                      <div className="col-span-2 space-y-4">
                        <Label htmlFor="instructions" className="text-lg">Instrucciones especiales</Label>
                        <Textarea
                          id="instructions"
                          value={shipmentData.specialInstructions}
                          onChange={(e) => setShipmentData({...shipmentData, specialInstructions: e.target.value})}
                          placeholder="Instrucciones especiales para el manejo del paquete (opcional)"
                          className="min-h-[100px] text-lg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sección del código QR */}
                {showQR && isFormValid() && (
                  <Card className="border-2 border-auction-soft animate-fade-in">
                    <CardContent className="p-8">
                      <div className="max-w-md mx-auto text-center">
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
                              shippingPayer,
                              timestamp: new Date().toISOString(),
                              sellerId: user?.id,
                              buyerId: auctionData.buyer.id,
                              auctionId: id,
                              finalPrice: auctionData.finalPrice
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
                    </CardContent>
                  </Card>
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
                    disabled={!isFormValid()}
                  >
                    <Package className="w-5 h-5" />
                    Generar etiqueta
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShipmentManagement;