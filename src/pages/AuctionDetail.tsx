import React, { useState } from "react";
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
  Clock,
  Info,
  Eye,
  Heart,
  Calendar,
  Shield,
  Share2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Map from "@/components/Map";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/components/ui/use-toast";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ImageCarousel = ({ images, title }: { images: string[], title: string }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const displayedThumbnails = images.slice(0, 6);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    console.log('Thumbnail clicked:', index);
  };

  return (
    <div className="space-y-4">
      <Carousel 
        className="w-full relative group"
        opts={{
          startIndex: selectedIndex,
          align: "start",
        }}
        key={selectedIndex}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity" />
        <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </Carousel>
      
      <div className="flex gap-2 justify-center">
        {displayedThumbnails.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === index ? 'border-auction-primary ring-2 ring-auction-primary ring-offset-2' : 'border-transparent hover:border-auction-secondary'
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const ShareButton = ({ url, title }: { url: string, title: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Share2 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2">
        <div className="flex gap-2">
          <FacebookShareButton url={url} title={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const WishlistButton = ({ auction }: { auction: any }) => {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(auction.id);

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeItem(auction.id);
    } else {
      addItem(auction);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={handleWishlistClick}
    >
      <Heart
        className={`h-5 w-5 ${
          isWishlisted ? "fill-red-500 text-red-500" : ""
        }`}
      />
    </Button>
  );
};

const AuctionDetail = () => {
  const isMobile = useIsMobile();
  const [showProtectionInfo, setShowProtectionInfo] = useState(false);

  // Mock data - En un caso real esto vendría de una API
  const auction = {
    id: "1",
    title: "iPhone 15 Pro Max - 256GB",
    condition: "Nuevo",
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
      verified: true,
      memberSince: "23 de Enero de 2023, 15:13"
    },
    specifications: {
      marca: "Apple",
      modelo: "iPhone 15 Pro Max",
      almacenamiento: "256GB",
      color: "Titanium",
      estado: "Nuevo",
      pantalla: "6.7 pulgadas OLED",
      procesador: "A17 Pro",
      camara: "48MP + 12MP + 12MP",
      bateria: "4422 mAh"
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
    ]
  };

  const timeLeft = formatTimeLeft(auction.endDate);

  const ProtectionInfo = () => (
    <Dialog open={showProtectionInfo} onOpenChange={setShowProtectionInfo}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Protección Subastalo</DialogTitle>
          <DialogDescription className="space-y-4 mt-4">
            <p>Ofrecemos protección completa en:</p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Transacciones seguras y verificadas</li>
              <li>Garantía de devolución</li>
              <li>Protección contra fraude</li>
              <li>Seguimiento de envíos en tiempo real</li>
              <li>Verificación de vendedores</li>
              <li>Soporte 24/7</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  const MobileLayout = () => (
    <div className="space-y-6">
      <div className="relative">
        <ImageCarousel images={auction.images} title={auction.title} />
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <WishlistButton auction={auction} />
          <ShareButton url={window.location.href} title={auction.title} />
        </div>
      </div>

      {/* ID y Estado */}
      <div className="flex justify-between items-center">
        <Badge variant="secondary">{auction.condition}</Badge>
        <span className="text-sm text-gray-500">ID: {auction.id}</span>
      </div>

      {/* Título y Descripción */}
      <div>
        <h1 className="text-2xl font-bold text-auction-dark mb-2">{auction.title}</h1>
        <p className="text-gray-600">{auction.description}</p>
      </div>

      {/* Contenedor de Pujas */}
      <div className="bg-auction-soft rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-sm text-gray-600">Puja actual</span>
            <div className="text-2xl font-bold text-auction-primary">
              {formatCurrency(auction.currentBid)}
            </div>
            <div className="flex items-center space-x-2 text-sm text-auction-secondary">
              <Hammer className="w-4 h-4" />
              <span>{auction.totalBids} pujas</span>
            </div>
          </div>
          <div className="text-right space-y-1">
            <span className="text-sm text-gray-600">Tiempo restante</span>
            <div className="text-xl font-semibold text-auction-tertiary flex items-center justify-end space-x-2">
              <Clock className="w-5 h-5" />
              <span>{timeLeft}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            size="lg"
            className="w-full bg-auction-primary hover:bg-auction-secondary text-white transition-all group"
          >
            <Hammer className="w-6 h-6 mr-2 transition-transform group-hover:rotate-12" />
            Pujar
          </Button>
          
          <Button
            size="lg"
            className="w-full bg-white text-auction-primary border-2 border-auction-primary hover:bg-red-50 hover:border-red-300 transition-all duration-300 group"
          >
            <ShoppingCart className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
            ¡Cómpralo ya!
          </Button>
        </div>
      </div>

      {/* Tabs de Detalles y Valoraciones */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="reviews">Valoraciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-4">Especificaciones</h3>
            <dl className="space-y-2">
              {Object.entries(auction.specifications).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100 last:border-0">
                  <dt className="text-gray-500 capitalize">{key}</dt>
                  <dd className="font-medium text-auction-dark">{value}</dd>
                </div>
              ))}
            </dl>
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

      {/* Información del Vendedor */}
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
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

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-900">Vendedor verificado</span>
          </div>
          <p className="text-sm text-gray-500">
            Miembro desde {auction.seller.memberSince}
          </p>
        </div>

        <Button 
          variant="outline" 
          className="w-full bg-auction-primary hover:bg-auction-secondary text-white transition-all duration-300"
          onClick={() => console.log("Open chat")}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Abrir chat
        </Button>
      </div>

      {/* Mapa de ubicación */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="w-5 h-5 text-auction-primary" />
          <span className="font-medium">Ubicación del vendedor</span>
        </div>
        <Map location={auction.location.coordinates} address={auction.location.address} />
      </div>

      {/* Opciones de Envío */}
      <Accordion type="single" collapsible className="bg-white rounded-xl shadow-sm">
        <AccordionItem value="shipping">
          <AccordionTrigger className="px-6 py-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-auction-primary" />
              <span>Opciones de envío</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="space-y-4">
              {auction.shippingOptions.map((option, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{option.carrier}</p>
                    <p className="text-sm text-gray-600">{option.time}</p>
                  </div>
                  <span className="font-medium text-auction-primary">
                    {formatCurrency(option.price)}
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Protección Subastalo */}
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-auction-primary" />
            <h3 className="font-semibold">Protección Subastalo</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowProtectionInfo(true)}
            className="text-auction-primary hover:text-auction-secondary"
          >
            <Info className="w-4 h-4 mr-1" />
            Más info
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <Calendar className="w-4 h-4" />
            <span>Editado: 2 días atrás</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>324</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>45</span>
            </div>
          </div>
        </div>
      </div>

      <ProtectionInfo />
    </div>
  );

  const DesktopLayout = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Columna izquierda - Imágenes y detalles del vendedor */}
      <div className="space-y-6">
        <div className="relative">
          <ImageCarousel images={auction.images} title={auction.title} />
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <WishlistButton auction={auction} />
            <ShareButton url={window.location.href} title={auction.title} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
          <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
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
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Vendedor verificado</span>
              </div>
              <p className="text-sm text-gray-500">
                Miembro desde {auction.seller.memberSince}
              </p>
            </div>
          )}

          <Button 
            variant="outline" 
            className="w-full bg-auction-primary hover:bg-auction-secondary text-white transition-all duration-300"
            onClick={() => console.log("Open chat")}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Abrir chat
          </Button>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-auction-primary" />
              <span>{auction.location.address}</span>
            </div>
            <Map location={auction.location.coordinates} address={auction.location.address} />
          </div>
        </div>

        {/* Opciones de envío como desplegable */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <Accordion type="single" collapsible>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-lg font-medium">
                Opciones de envío
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {auction.shippingOptions.map((option, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-auction-secondary" />
                        <div>
                          <p className="font-medium">{option.carrier}</p>
                          <p className="text-sm text-gray-600">{option.time}</p>
                        </div>
                      </div>
                      <span className="font-medium text-auction-primary">
                        {formatCurrency(option.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Columna derecha - Información del producto */}
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-start mb-4">
            <Badge variant="secondary" className="mb-2">{auction.condition}</Badge>
            <span className="text-sm text-gray-500">ID: {auction.id}</span>
          </div>
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
              <div className="flex items-center space-x-2 text-sm text-auction-secondary">
                <Hammer className="w-4 h-4" />
                <span>{auction.totalBids} pujas</span>
              </div>
            </div>
            <div className="text-right space-y-1">
              <span className="text-sm text-gray-600">Tiempo restante</span>
              <div className="text-xl font-semibold text-auction-tertiary flex items-center justify-end space-x-2">
                <Clock className="w-5 h-5" />
                <span>{timeLeft}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              size="lg"
              className="w-full bg-auction-primary hover:bg-auction-secondary text-white transition-all group"
            >
              <Hammer className="w-6 h-6 mr-2 transition-transform group-hover:rotate-12" />
              Pujar
            </Button>
            
            <Button
              size="lg"
              className="w-full bg-white text-auction-primary border-2 border-auction-primary hover:bg-red-100 hover:border-red-300 transition-all duration-300 font-display text-lg group"
            >
              <ShoppingCart className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
              ¡Cómpralo ya!
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="reviews">Valoraciones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-4">Especificaciones</h3>
              <dl className="space-y-2">
                {Object.entries(auction.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100 last:border-0">
                    <dt className="text-gray-500 capitalize">{key}</dt>
                    <dd className="font-medium text-auction-dark">{value}</dd>
                  </div>
                ))}
              </dl>
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
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </MainLayout>
  );
};

export default AuctionDetail;

