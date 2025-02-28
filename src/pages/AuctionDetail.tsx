
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
  Share2,
  MessageCircle
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
import { useNavigate, useParams } from "react-router-dom";
import { AuctionChat } from "@/components/chat/AuctionChat";

const ImageCarousel = ({ images }: { images: string[] }) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1 h-[300px] sm:h-[400px] md:h-[500px]">
              <img 
                src={image} 
                alt={`Product image ${index + 1}`} 
                className="w-full h-full object-contain rounded-md"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

const ShareButton = ({ url, title }: { url: string; title: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Compartir
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-2">
        <div className="flex gap-2 justify-center p-2">
          <FacebookShareButton url={url} quote={title}>
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

const WishlistButton = ({ auctionId }: { auctionId: string }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  
  const inWishlist = isInWishlist(auctionId);
  
  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(auctionId);
      toast({
        title: "Eliminado de favoritos",
        description: "El artículo ha sido eliminado de tu lista de favoritos",
      });
    } else {
      addToWishlist({
        id: auctionId,
        title: "iPhone 15 Pro Max - 256GB",
        price: 1199,
        image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80",
      });
      toast({
        title: "Añadido a favoritos",
        description: "El artículo ha sido añadido a tu lista de favoritos",
      });
    }
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleToggleWishlist}
      className={`gap-2 ${inWishlist ? 'text-red-500 hover:text-red-600' : ''}`}
    >
      <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
      {inWishlist ? 'En favoritos' : 'Añadir a favoritos'}
    </Button>
  );
};

const AuctionDetail = () => {
  const isMobile = useIsMobile();
  const [showProtectionInfo, setShowProtectionInfo] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

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

  const handleContactSeller = () => {
    setShowChat(true);
    toast({
      title: "Chat abierto",
      description: "Ahora puedes comunicarte con el vendedor",
    });
  };

  const handlePlaceBid = () => {
    navigate(`/auction/${auction.id}/bid`);
  };

  const handleBuyNow = () => {
    navigate(`/checkout/${auction.id}`);
  };

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
      <ImageCarousel images={auction.images} />
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Badge variant="outline" className="bg-blue-50">
            {auction.condition}
          </Badge>
          <h1 className="text-2xl font-bold">{auction.title}</h1>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Puja actual</p>
              <p className="text-xl font-bold">{formatCurrency(auction.currentBid)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Compra inmediata</p>
              <p className="text-xl font-bold">{formatCurrency(auction.buyNowPrice)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Hammer className="w-4 h-4" />
            <span>{auction.totalBids} pujas</span>
            <span className="mx-2">•</span>
            <Clock className="w-4 h-4" />
            <span>{timeLeft}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 my-4">
          <Button onClick={handlePlaceBid}>Realizar puja</Button>
          <Button variant="outline" onClick={handleBuyNow}>
            Comprar ahora por {formatCurrency(auction.buyNowPrice)}
          </Button>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={auction.seller.avatar} />
                <AvatarFallback>{auction.seller.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{auction.seller.name}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="ml-1">{auction.seller.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{auction.seller.totalSales} ventas</span>
                </div>
              </div>
            </div>
            {auction.seller.verified && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Verificado
              </Badge>
            )}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full gap-2"
            onClick={handleContactSeller}
          >
            <MessageCircle className="h-5 w-5" />
            Contactar con el vendedor
          </Button>

          <div className="flex justify-between mt-2">
            <WishlistButton auctionId={auction.id} />
            <ShareButton url={window.location.href} title={auction.title} />
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Detalles</TabsTrigger>
            <TabsTrigger value="shipping">Envío</TabsTrigger>
            <TabsTrigger value="seller">Vendedor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Descripción</h3>
              <p className="text-gray-700">{auction.description}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Especificaciones</h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(auction.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="text-gray-500 capitalize">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Ubicación</h3>
              <div className="flex items-center gap-2 text-gray-700 mb-3">
                <MapPin className="w-4 h-4" />
                <span>{auction.location.address}</span>
              </div>
              <div className="h-[200px] w-full rounded-md overflow-hidden">
                <Map 
                  location={auction.location.coordinates} 
                  address={auction.location.address}
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Opciones de envío</h3>
              <div className="space-y-2">
                {auction.shippingOptions.map((option, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <span>{option.carrier}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(option.price)}</p>
                      <p className="text-sm text-gray-500">{option.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seller" className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <Avatar className="w-16 h-16">
                <AvatarImage src={auction.seller.avatar} />
                <AvatarFallback>{auction.seller.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{auction.seller.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="ml-1">{auction.seller.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{auction.seller.totalSales} ventas</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Miembro desde {auction.seller.memberSince}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Valoraciones</h3>
              <div className="space-y-3">
                {auction.reviews.map((review) => (
                  <div key={review.id} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={review.user.avatar} />
                        <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.user.name}</p>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  const DesktopLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pt-8">
      <div className="col-span-3">
        <ImageCarousel images={auction.images} />
        
        <div className="mt-8 space-y-6">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="shipping">Envío</TabsTrigger>
              <TabsTrigger value="reviews">Valoraciones</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6 py-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Descripción</h3>
                <p className="text-gray-700">{auction.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Especificaciones</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(auction.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-md">
                      <span className="text-gray-500 capitalize">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-6 py-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Ubicación</h3>
                <div className="flex items-center gap-2 text-gray-700 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{auction.location.address}</span>
                </div>
                <div className="h-[300px] w-full rounded-md overflow-hidden">
                  <Map 
                    location={auction.location.coordinates} 
                    address={auction.location.address}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Opciones de envío</h3>
                <div className="grid grid-cols-2 gap-4">
                  {auction.shippingOptions.map((option, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5" />
                        <span className="font-medium">{option.carrier}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(option.price)}</p>
                        <p className="text-sm text-gray-500">{option.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6 py-4">
              <div className="space-y-4">
                {auction.reviews.map((review) => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.user.avatar} />
                        <AvatarFallback>{review.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.user.name}</p>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="col-span-2 space-y-6">
        <div className="bg-white p-6 border rounded-lg shadow-sm space-y-4">
          <div>
            <Badge variant="outline" className="bg-blue-50 mb-2">
              {auction.condition}
            </Badge>
            <h1 className="text-2xl font-bold">{auction.title}</h1>
          </div>
          
          <div className="grid grid-cols-2 gap-4 py-3 border-t border-b">
            <div>
              <p className="text-sm text-gray-500">Puja actual</p>
              <p className="text-2xl font-bold">{formatCurrency(auction.currentBid)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Compra inmediata</p>
              <p className="text-2xl font-bold">{formatCurrency(auction.buyNowPrice)}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Hammer className="w-4 h-4" />
              <span>{auction.totalBids} pujas</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{timeLeft}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>56 vistas</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 pt-2">
            <Button size="lg" onClick={handlePlaceBid}>Realizar puja</Button>
            <Button variant="outline" size="lg" onClick={handleBuyNow}>
              Comprar ahora por {formatCurrency(auction.buyNowPrice)}
            </Button>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <WishlistButton auctionId={auction.id} />
            <ShareButton url={window.location.href} title={auction.title} />
          </div>
        </div>
        
        <div className="bg-white p-6 border rounded-lg shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={auction.seller.avatar} />
                <AvatarFallback>{auction.seller.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{auction.seller.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="ml-1">{auction.seller.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{auction.seller.totalSales} ventas</span>
                </div>
              </div>
            </div>
            {auction.seller.verified && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Verificado
              </Badge>
            )}
          </div>
          
          {/* Botón de chat justo debajo de "Verificado" */}
          <Button 
            variant="outline" 
            className="w-full gap-2"
            onClick={handleContactSeller}
          >
            <MessageCircle className="h-5 w-5" />
            Contactar con el vendedor
          </Button>

          <div className="pt-2 border-t">
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
              <Calendar className="w-4 h-4" />
              <span>Miembro desde {auction.seller.memberSince}</span>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-500 hover:text-gray-700"
              onClick={() => navigate(`/seller/${auction.seller.id}`)}
            >
              Ver perfil del vendedor
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-primary cursor-pointer" onClick={() => setShowProtectionInfo(true)}>
            <Shield className="h-5 w-5" />
            <span className="font-medium">Compra protegida por Subastalo</span>
            <Info className="h-4 w-4" />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Tu compra está protegida de principio a fin. Garantía de devolución si el artículo no es como se describe.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>

      {/* Chat con el vendedor */}
      {showChat && (
        <AuctionChat 
          auctionId={auction.id}
          auctionTitle={auction.title}
          sellerId={auction.seller.id}
          sellerName={auction.seller.name}
          sellerAvatar={auction.seller.avatar}
        />
      )}
      
      <ProtectionInfo />
    </MainLayout>
  );
};

export default AuctionDetail;
