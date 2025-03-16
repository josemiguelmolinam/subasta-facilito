import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Hammer,
  Clock,
  Eye,
  Shield,
  Info,
  MessageCircle,
  Star,
  ShieldCheck,
  Calendar,
  MapPin,
  Truck,
  CheckCircle
} from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import { formatTimeLeft } from "@/lib/utils/date";
import Map from "@/components/Map";
import { WishlistButton } from "./WishlistButton";
import { ShareButton } from "./ShareButton";
import { ImageCarousel } from "./ImageCarousel";
import { SoldBanner } from "./SoldBanner";
import { BuyerInfo } from "./BuyerInfo";

interface DesktopAuctionViewProps {
  auction: any;
  isSold: boolean;
  timeLeft: string;
  handlePlaceBid: () => void;
  handleBuyNow: () => void;
  handleContactSeller: () => void;
  setShowProtectionInfo: (show: boolean) => void;
  navigate: (path: string) => void;
}

export const DesktopAuctionView = ({
  auction,
  isSold,
  timeLeft,
  handlePlaceBid,
  handleBuyNow,
  handleContactSeller,
  setShowProtectionInfo,
  navigate
}: DesktopAuctionViewProps) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pt-8">
    <div className="col-span-3">
      {isSold && auction.soldDate && (
        <SoldBanner soldDate={auction.soldDate} />
      )}
      
      <ImageCarousel images={auction.images} isSold={isSold} title={auction.title} />
      
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
                    <span className="font-medium">{String(value)}</span>
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
        
        {isSold ? (
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-purple-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Subasta Finalizada
              </h3>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                Vendido
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Este artículo fue vendido el {auction.soldDate && auction.soldDate.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        ) : (
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
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Hammer className="w-4 h-4" />
            <span>{auction.totalBids} pujas</span>
          </div>
          {!isSold && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{timeLeft}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>56 vistas</span>
          </div>
        </div>
        
        {!isSold ? (
          <div className="flex flex-col gap-3 pt-2">
            <Button size="lg" onClick={handlePlaceBid}>Realizar puja</Button>
            <Button variant="outline" size="lg" onClick={handleBuyNow}>
              Comprar ahora por {formatCurrency(auction.buyNowPrice)}
            </Button>
          </div>
        ) : (
          auction.buyer && <BuyerInfo buyer={auction.buyer} />
        )}
        
        <div className="flex items-center justify-between pt-2">
          <WishlistButton 
            auctionId={auction.id} 
            auctionData={{
              id: auction.id,
              title: auction.title,
              currentBid: auction.currentBid,
              buyNowPrice: auction.buyNowPrice,
              imageUrl: auction.images[0],
              totalBids: auction.totalBids,
              description: auction.description,
              startingPrice: auction.startingPrice,
              endDate: auction.endDate,
              sellerId: auction.seller.id,
              categoryId: "smartphones",
              status: isSold ? "sold" : "active",
              createdAt: new Date(),
            }}
          />
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
