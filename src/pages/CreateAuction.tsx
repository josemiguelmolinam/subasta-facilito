import { MainLayout } from "@/components/layout/MainLayout";
import { useAuction } from "@/contexts/AuctionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import {
  Upload,
  MapPin,
  Box,
  DollarSign,
  Truck,
  Edit3,
  Award,
  ShoppingCart,
  ClipboardList,
  Archive,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Importa los SVG de las agencias de transporte como imágenes
import correosIcon from '@/assets/correos.svg';
import seurIcon from '@/assets/seur.svg';
import mrwIcon from '@/assets/mrw.svg';
import dhlIcon from '@/assets/dhl.svg';

interface CloudUploadIconProps {
  className?: string;
}

const CloudUploadIcon = ({ className = "h-11 w-11" }: CloudUploadIconProps) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#A855F7"
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
    />
    <path fill="#FFFFFF" d="M13 16v-4h3l-4-4-4 4h3v4h2z" />
  </svg>
);


// Componente CustomToggle: un pequeño switch que actúa como toggle
const CustomToggle = ({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled?: boolean;
}) => {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
        />
        <div className="w-10 h-4 bg-gray-300 rounded-full peer peer-checked:bg-auction-primary transition-colors"></div>
        <div className="absolute -top-1 -left-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-full"></div>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
};

const CreateAuction = () => {
  const navigate = useNavigate();
  const { createAuction } = useAuction();

  // Estados del formulario principal
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [duration, setDuration] = useState<string>("3");

  // Datos generales del producto
  const [itemCondition, setItemCondition] = useState<string>("");

  // Datos de envío
  const [shippingCost, setShippingCost] = useState<string>("0");
  const [shippingPayer, setShippingPayer] = useState<string>("seller");
  const [transport, setTransport] = useState<string>("");

  // Configuración de venta usando dos toggles independientes
  const [enableAuction, setEnableAuction] = useState<boolean>(false);
  const [auctionPrice, setAuctionPrice] = useState<string>("");
  const [buyNowAuctionPrice, setBuyNowAuctionPrice] = useState<string>("");
  const [enableDirectSale, setEnableDirectSale] = useState<boolean>(false);
  const [directSalePrice, setDirectSalePrice] = useState<string>("");

  // Configurador avanzado de envío (Modal)
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [boxSize, setBoxSize] = useState("");
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [additionalShippingCost, setAdditionalShippingCost] = useState("");
  const [shippingObservations, setShippingObservations] = useState("");

  // Ref para input de archivos
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;

      // Construimos el objeto saleOptions según la opción activada
      const saleOptions: any = {};
      if (enableAuction) {
        saleOptions.auctionPrice = Number(auctionPrice);
        if (buyNowAuctionPrice) {
          saleOptions.buyNowAuctionPrice = Number(buyNowAuctionPrice);
        }
      }
      if (enableDirectSale) {
        saleOptions.directSalePrice = Number(directSalePrice);
      }

      const endDate = new Date();
      endDate.setDate(endDate.getDate() + parseInt(duration));

      await createAuction({
        title,
        description,
        saleOptions,
        itemCondition,
        shippingCost: Number(shippingCost),
        shippingPayer,
        transport,
        images,
        endDate,
        sellerId: "user123",
        categoryId: category,
        status: "active",
        shippingDetails: {
          originCity,
          destinationCity,
          boxSize,
          weight: Number(weight),
          dimensions,
          additionalShippingCost: Number(additionalShippingCost),
          shippingObservations,
        },
      });

      toast({
        title: "Subasta creada",
        description: "Tu subasta se creó con éxito",
      });
      navigate("/auctions");
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error al crear la subasta",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Lógica para mantener la exclusividad de los toggles de venta
  const toggleAuction = () => {
    if (!enableAuction) {
      setEnableAuction(true);
      setEnableDirectSale(false);
    } else {
      setEnableAuction(false);
    }
  };

  const toggleDirectSale = () => {
    if (!enableDirectSale) {
      setEnableDirectSale(true);
      setEnableAuction(false);
    } else {
      setEnableDirectSale(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16 min-h-screen bg-gradient-to-br from-white to-auction-soft">
        <div className="max-w-5xl mx-auto">
          <h1 className="flex items-center gap-3 text-4xl font-bold text-auction-dark mb-8 animate-fade-in">
            <Award className="text-auction-primary h-8 w-8" />
            <span className="bg-gradient-to-r from-auction-primary to-auction-secondary bg-clip-text text-transparent">
              Crear Nueva Subasta
            </span>
          </h1>

          <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Sección de imágenes con animación en hover */}
              <div className="mb-6">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-auction-primary scrollbar-track-auction-soft">
                  {images.map((image, idx) => (
                    <div 
                      key={idx} 
                      className="w-24 h-24 border-2 border-auction-primary rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Imagen ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 border-2 border-dashed border-auction-primary rounded-lg flex items-center justify-center cursor-pointer hover:bg-auction-soft/50 transition-colors duration-200 group"
                  >
                    <CloudUploadIcon className="h-12 w-12 text-auction-primary group-hover:scale-110 transition-transform duration-200" />
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) setImages(Array.from(e.target.files));
                  }}
                />
              </div>

              {/* Contenedor principal con efecto de profundidad */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* Columna izquierda con animación de entrada */}
                <div className="flex-1 space-y-6 animate-fade-in">
                  {/* Título con efecto hover */}
                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="title" className="text-lg font-semibold text-auction-dark">Título</Label>
                      <Edit3 className="text-auction-primary group-hover:rotate-12 transition-transform" />
                    </div>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Título de la subasta"
                      required
                      className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-auction-primary focus:ring-auction-primary/20 transition-all duration-200"
                    />
                  </div>

                  {/* Descripción con altura dinámica */}
                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="description" className="text-lg font-semibold text-auction-dark">Descripción</Label>
                      <Edit3 className="text-auction-primary group-hover:rotate-12 transition-transform" />
                    </div>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe tu producto..."
                      className="min-h-[120px] border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-auction-primary focus:ring-auction-primary/20 transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="category">Categoría</Label>
                        <Box className="text-auction-primary" />
                      </div>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electrónica</SelectItem>
                          <SelectItem value="fashion">Moda</SelectItem>
                          <SelectItem value="home">Hogar</SelectItem>
                          <SelectItem value="sports">Deportes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="duration">Duración</Label>
                        <Award className="text-auction-primary" />
                      </div>
                      <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la duración" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 días</SelectItem>
                          <SelectItem value="5">5 días</SelectItem>
                          <SelectItem value="7">7 días</SelectItem>
                          <SelectItem value="10">10 días</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Estado del Artículo */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="itemCondition">Estado del Artículo</Label>
                      <Archive className="text-auction-primary" />
                    </div>
                    <Select value={itemCondition} onValueChange={setItemCondition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nuevo">Nuevo</SelectItem>
                        <SelectItem value="usado">Usado</SelectItem>
                        <SelectItem value="reacondicionado">Reacondicionado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Columna derecha: configuración de envío y venta */}
                <div className="flex-1 space-y-4">
                  {/* Envío: Costo y Quién Paga */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="shippingCost">Costo de Envío</Label>
                        <DollarSign className="text-auction-primary" />
                      </div>
                      <Input
                        id="shippingCost"
                        name="shippingCost"
                        type="number"
                        min="0"
                        step="0.01"
                        value={shippingCost}
                        onChange={(e) => setShippingCost(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="shippingPayer">¿Quién paga el envío?</Label>
                        <Truck className="text-auction-primary" />
                      </div>
                      <Select value={shippingPayer} onValueChange={setShippingPayer}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona quién paga" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seller">Vendedor</SelectItem>
                          <SelectItem value="buyer">Comprador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="transport">Transporte</Label>
                      <Truck className="text-auction-primary" />
                    </div>
                    <Select value={transport} onValueChange={setTransport}>
                      <SelectTrigger>
                        <SelectValue placeholder="Elige una agencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="correos">
                          <div className="flex items-center gap-2">
                            <img src={correosIcon} alt="Correos" className="h-20 w-20" />
                          </div>
                        </SelectItem>
                        <SelectItem value="seur">
                          <div className="flex items-center gap-2">
                            <img src={seurIcon} alt="SEUR" className="h-20 w-20" />
                          </div>
                        </SelectItem>
                        <SelectItem value="mrw">
                          <div className="flex items-center gap-2">
                            <img src={mrwIcon} alt="MRW" className="h-20 w-20" />
                          </div>
                        </SelectItem>
                        <SelectItem value="dhl">
                          <div className="flex items-center gap-2">
                            <img src={dhlIcon} alt="DHL" className="h-20 w-20" />
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowShippingModal(true)}
                      >
                        <ClipboardList className="mr-1 h-4 w-4" />
                        Configurar Envío
                      </Button>
                    </div>
                  </div>

                  {/* Sección Tipo de Venta con dos toggles pequeños */}
                  <div className="border p-4 rounded-md">
                    <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                      <ShoppingCart className="text-auction-primary" />
                      Tipo de Venta
                    </h2>
                    <div className="flex flex-col gap-2">
                      <CustomToggle
                        label="Venta por Subasta"
                        checked={enableAuction}
                        onChange={toggleAuction}
                        disabled={enableDirectSale}
                      />
                      <CustomToggle
                        label="Venta Directa"
                        checked={enableDirectSale}
                        onChange={toggleDirectSale}
                        disabled={enableAuction}
                      />
                    </div>
                    {/* Campos condicionales */}
                    {enableAuction && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="auctionPrice">Precio de Salida</Label>
                          <Input
                            id="auctionPrice"
                            name="auctionPrice"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Precio de salida"
                            value={auctionPrice}
                            onChange={(e) => setAuctionPrice(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="buyNowAuctionPrice">Precio 'Cómpralo ya'</Label>
                          <Input
                            id="buyNowAuctionPrice"
                            name="buyNowAuctionPrice"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Precio compra inmediata"
                            value={buyNowAuctionPrice}
                            onChange={(e) => setBuyNowAuctionPrice(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
                          />
                        </div>
                      </div>
                    )}
                    {enableDirectSale && (
                      <div className="mt-4">
                        <Label htmlFor="directSalePrice">Precio de Venta Directa</Label>
                        <Input
                          id="directSalePrice"
                          name="directSalePrice"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Precio venta directa"
                          value={directSalePrice}
                          onChange={(e) => setDirectSalePrice(e.target.value)}
                          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                <Button type="button" variant="outline" onClick={() => navigate("/auctions")}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-auction-primary to-auction-secondary hover:opacity-90 transition-opacity duration-200 text-white font-semibold px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="animate-spin">⌛</span>
                      Creando...
                    </div>
                  ) : (
                    "Crear Subasta"
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {/* Modal con animación de entrada */}
      {showShippingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 animate-fade-in">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-auction-dark">
                <Truck className="text-auction-primary" />
                Detalles de Envío
              </h2>
              <button onClick={() => setShowShippingModal(false)} className="text-gray-500 hover:text-gray-700">
                Cerrar
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Label htmlFor="originCity">Desde</Label>
                    <MapPin className="text-auction-primary h-4 w-4" />
                  </div>
                  <Input
                    id="originCity"
                    name="originCity"
                    placeholder="Ciudad de Origen"
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Label htmlFor="destinationCity">Hasta</Label>
                    <MapPin className="text-auction-primary h-4 w-4" />
                  </div>
                  <Input
                    id="destinationCity"
                    name="destinationCity"
                    placeholder="Ciudad de Destino"
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Label htmlFor="boxSize">Tamaño de Caja</Label>
                    <Box className="text-auction-primary h-4 w-4" />
                  </div>
                  <Input
                    id="boxSize"
                    name="boxSize"
                    placeholder="Ej: Pequeña, Mediana, Grande"
                    value={boxSize}
                    onChange={(e) => setBoxSize(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <DollarSign className="text-auction-primary h-4 w-4" />
                  </div>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Peso"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Label htmlFor="dimensions">Dimensiones (cm)</Label>
                  <Box className="text-auction-primary h-4 w-4" />
                </div>
                <Input
                  id="dimensions"
                  name="dimensions"
                  placeholder="Ej: 30x20x15"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Label htmlFor="additionalShippingCost">Gastos Adicionales</Label>
                    <DollarSign className="text-auction-primary h-4 w-4" />
                  </div>
                  <Input
                    id="additionalShippingCost"
                    name="additionalShippingCost"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Coste adicional"
                    value={additionalShippingCost}
                    onChange={(e) => setAdditionalShippingCost(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Label htmlFor="shippingObservations">Observaciones</Label>
                    <Edit3 className="text-auction-primary h-4 w-4" />
                  </div>
                  <Input
                    id="shippingObservations"
                    name="shippingObservations"
                    placeholder="Notas adicionales"
                    value={shippingObservations}
                    onChange={(e) => setShippingObservations(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-0 focus:border-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="border-t px-6 py-3 flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setShowShippingModal(false)}>
                Cancelar
              </Button>
              <Button type="button" onClick={() => setShowShippingModal(false)}>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default CreateAuction;
