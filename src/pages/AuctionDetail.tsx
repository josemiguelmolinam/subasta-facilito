import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/currency";
import { formatTimeLeft } from "@/lib/utils/date";
import { 
  UserRound, 
  Star, 
  ChartBar, 
  ShieldCheck, 
  MessageSquare,
  MapPin,
  Hammer,
  ShoppingCart,
  Truck,
  MessageCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Map from "@/components/Map";

const AuctionDetail = () => {
  const { id } = useParams();
  
  // Mock data - En un caso real esto vendría de una API
  const auction = {
    id: "1",
    title: "iPhone 15 Pro Max - 256GB",
    description: "Nuevo iPhone 15 Pro Max con 256GB de almacenamiento. Color Titanium.",
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c6?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c7?auto=format&fit=crop&q=80",
    ],
    currentBid: 950,
    buyNowPrice: 1199,
    totalBids: 15,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    location: {
      address: "Calle Principal 123, Madrid",
      coordinates: { lat: 40.4168, lng: -3.7038 }
    },
    seller: {
      id: "1",
      name: "TechStore Official",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      rating: 4.8,
      totalSales: 1250,
      verified: true
    },
    reviews: [
      {
        id: "1",
        user: {
          name: "Juan Pérez",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan"
        },
        rating: 5,
        comment: "Excelente vendedor, muy profesional y rápido envío."
      },
      {
        id: "2",
        user: {
          name: "María García",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
        },
        rating: 4,
        comment: "Todo perfecto, recomendado."
      }
    ],
    shippingOptions: [
      { carrier: "Correos", price: 4.99, time: "3-5 días" },
      { carrier: "DHL", price: 9.99, time: "24-48 horas" }
    ],
    specifications: {
      condition: "Nuevo",
      brand: "Apple",
      model: "iPhone 15 Pro Max",
      storage: "256GB",
      color: "Titanium"
    }
  };

  const timeLeft = formatTimeLeft(auction.endDate);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna izquierda - Imágenes y detalles del vendedor */}
          <div className="space-y-6">
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {auction.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src={image}
                        alt={`${auction.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={auction.seller.avatar} />
                  <AvatarFallback>{auction.seller.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{auction.seller.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{auction.seller.rating}</span>
                    <ChartBar className="w-4 h-4 ml-2" />
                    <span>{auction.seller.totalSales}+ ventas</span>
                  </div>
                </div>
              </div>

              {auction.seller.verified && (
                <div className="flex items-center space-x-2 text-green-600">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-medium">Vendedor verificado</span>
                </div>
              )}

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => console.log("Open chat")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Abrir chat
              </Button>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{auction.location.address}</span>
                </div>
                <Map location={auction.location.coordinates} address={auction.location.address} />
              </div>
            </div>
          </div>

          {/* Columna derecha - Información del producto */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-auction-dark mb-4">{auction.title}</h1>
              <p className="text-gray-600">{auction.description}</p>
            </div>

            <div className="bg-auction-soft rounded-xl p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-sm text-gray-600">Puja actual</span>
                  <div className="text-3xl font-bold text-auction-primary">
                    {formatCurrency(auction.currentBid)}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Hammer className="w-4 h-4" />
                    <span>{auction.totalBids} pujas</span>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-sm text-gray-600">Tiempo restante</span>
                  <div className="text-xl font-semibold text-auction-secondary">
                    {timeLeft}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  size="lg"
                  className="w-full group"
                >
                  <Hammer className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                  Hacer puja
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Comprar {formatCurrency(auction.buyNowPrice)}
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Opciones de envío</h4>
                {auction.shippingOptions.map((option, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-auction-secondary" />
                      <div>
                        <p className="font-medium">{option.carrier}</p>
                        <p className="text-sm text-gray-600">{option.time}</p>
                      </div>
                    </div>
                    <span className="font-medium">
                      {formatCurrency(option.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="reviews">Valoraciones</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-4">
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
              
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-4">
                  {auction.reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.user.avatar} />
                          <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.user.name}</p>
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
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