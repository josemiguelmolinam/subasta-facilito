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
  MessageCircle, 
  Star, 
  ShieldCheck,
  Truck,
  MapPin,
  Calendar
} from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";
import { formatTimeLeft } from "@/lib/utils/date";
import Map from "@/components/Map";
import { WishlistButton } from "./WishlistButton";
import { ShareButton } from "./ShareButton";
import { ImageCarousel } from "./ImageCarousel";
import { SoldBanner } from "./SoldBanner";
import { BuyerInfo } from "./BuyerInfo";

interface MobileAuctionViewProps {
  auction: any;
  isSold: boolean;
  timeLeft: string;
  handlePlaceBid: () => void;
  handleBuyNow: () => void;
  handleContactSeller: () => void;
}

export const MobileAuctionView = ({ 
  auction, 
  isSold, 
  timeLeft, 
  handlePlaceBid, 
  handleBuyNow,
  handleContactSeller 
}: MobileAuctionViewProps) => (
  <div className="space-y-6">
    {isSold && auction.soldDate && (
      <SoldBanner soldDate={auction.soldDate} />
    )}
    
    <ImageCarousel images={auction.images} isSold={isSold} title={auction.title} />
    
    <div className="space-y-4">
      <div className="space-y-2">
        <Badge variant="outline" className="bg-blue-50">
          {auction.condition}
        </Badge>
        <h1 className="text-2xl font-bold">{auction.title}</h1>
        
        <div className="flex justify-between items-center">
          {isSold ? (
            <div>
              <p className="text-sm text-gray-500">Subasta finalizada</p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-sm text-gray-500">Puja actual</p>
                <p className="text-xl font-bold">{formatCurrency(auction.currentBid)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Compra inmediata</p>
                <p className="text-xl font-bold">{formatCurrency(auction.buyNowPrice)}</p>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Hammer className="w-4 h-4" />
          <span>{auction.totalBids} pujas</span>
          {!isSold && (
            <>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4" />
              <span>{timeLeft}</span>
            </>
          )}
        </div>
      </div>
      
      {!isSold && (
        <div className="flex flex-col gap-3 my-4">
          <Button onClick={handlePlaceBid}>Realizar puja</Button>
          <Button variant="outline" onClick={handleBuyNow}>
            Comprar ahora por {formatCurrency(auction.buyNowPrice)}
          </Button>
        </div>
      )}
      
      {isSold && auction.buyer && (
        <BuyerInfo buyer={auction.buyer} />
      )}
      
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
                  <span className="font-medium">{String(value)}</span>
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
