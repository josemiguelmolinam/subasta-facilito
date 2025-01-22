import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/currency";
import { formatTimeLeft, formatDate } from "@/lib/utils/date";
import { Auction } from "@/types";
import { Heart, Timer, Gavel, Shield, Package, Star, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useWishlist } from "@/contexts/WishlistContext";

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  
  // Mock data - En un caso real esto vendría de una API
  const auction: Auction = {
    id: "1",
    title: "iPhone 15 Pro Max - 256GB",
    description: "Nuevo iPhone 15 Pro Max con 256GB de almacenamiento. Color Titanium. Incluye todos los accesorios originales y garantía oficial de Apple.",
    startingPrice: 899,
    currentBid: 950,
    buyNowPrice: 1199,
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80",
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 días
    sellerId: "1",
    categoryId: "electronics",
    status: "active",
    createdAt: new Date(),
    seller: {
      name: "TechStore Official",
      rating: 4.8,
      totalSales: 1250
    },
    specifications: {
      condition: "Nuevo",
      brand: "Apple",
      model: "iPhone 15 Pro Max",
      storage: "256GB",
      color: "Titanium"
    },
    totalBids: 15
  };

  const handleAddToWishlist = () => {
    addToWishlist(auction);
    toast({
      title: "¡Añadido a favoritos!",
      description: "El producto se ha añadido a tu lista de deseos.",
    });
  };

  const handleBuyNow = () => {
    navigate(`/confirm-purchase/${auction.id}`); // Redirige al Checkout
  };

  const timeLeft = formatTimeLeft(auction.endDate);
  const isEnding = new Date(auction.endDate).getTime() - new Date().getTime() < 1000 * 60 * 10; // 10 minutos

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna izquierda - Imagen y detalles del vendedor */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-lg">
                <img
                  src={auction.imageUrl}
                  alt={auction.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <button
                onClick={handleAddToWishlist}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all duration-300 hover:scale-110"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isInWishlist(auction.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }`}
                />
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium">{auction.seller?.rating} / 5.0</span>
                </div>
                <Badge variant="secondary">
                  {auction.seller?.totalSales}+ ventas
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Vendedor verificado</span>
              </div>
              <Separator />
              <div className="text-sm text-gray-600">
                <p>Vendedor: {auction.seller?.name}</p>
                <p>Miembro desde {formatDate(auction.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Columna derecha - Información del producto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-auction-primary">
                  {auction.specifications?.condition}
                </Badge>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Info className="w-4 h-4" />
                  <span>ID: {auction.id}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-auction-dark mb-2">{auction.title}</h1>
              <p className="text-gray-600">{auction.description}</p>
            </div>

            <div className="bg-auction-soft rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-sm text-gray-600">Puja actual</span>
                  <div className="text-3xl font-bold text-auction-primary">
                    {formatCurrency(auction.currentBid)}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center justify-end space-x-2 text-sm text-gray-600">
                    <Gavel className="w-4 h-4" />
                    <span>{auction.totalBids} pujas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Timer className={`w-5 h-5 ${isEnding ? "text-red-500 animate-pulse" : "text-auction-secondary"}`} />
                    <span className={`font-medium ${isEnding ? "text-red-500" : "text-auction-secondary"}`}>
                      {timeLeft}
                    </span>
                  </div>
                </div>
              </div>

              {auction.buyNowPrice && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 font-medium">¡Cómpralo ya!</span>
                    <span className="text-2xl font-bold text-red-600">
                      {formatCurrency(auction.buyNowPrice)}
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  size="lg"
                  className="w-full bg-auction-primary hover:bg-auction-secondary transition-colors"
                >
                  Hacer puja
                </Button>
                {auction.buyNowPrice && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                    onClick={handleBuyNow}
                  >
                    Comprar ahora
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Pago seguro</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Package className="w-4 h-4" />
                  <span>Envío protegido</span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="specs">Especificaciones</TabsTrigger>
                <TabsTrigger value="shipping">Envío</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <div className="bg-white rounded-lg p-4 space-y-4">
                  <p className="text-gray-600">{auction.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p className="text-gray-500">Fecha de inicio</p>
                      <p className="font-medium">{formatDate(auction.createdAt)}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-500">Fecha de fin</p>
                      <p className="font-medium">{formatDate(auction.endDate)}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="specs" className="mt-4">
                <div className="bg-white rounded-lg p-4">
                  {auction.specifications && (
                    <dl className="space-y-2">
                      {Object.entries(auction.specifications).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100 last:border-0">
                          <dt className="text-gray-500 capitalize">{key}</dt>
                          <dd className="font-medium text-auction-dark">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4">
                <div className="bg-white rounded-lg p-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-auction-primary" />
                    <span className="font-medium">Envío estándar: 2-4 días laborables</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    El envío se realizará mediante una empresa de mensajería de confianza.
                    El producto será empaquetado cuidadosamente para garantizar su seguridad durante el transporte.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AuctionDetail;