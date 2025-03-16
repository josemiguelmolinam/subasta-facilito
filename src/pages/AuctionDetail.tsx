
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AuctionChat } from "@/components/chat/AuctionChat";
import { formatTimeLeft } from "@/lib/utils/date";

// Import refactored components
import { MobileAuctionView } from "@/components/auction-detail/MobileAuctionView";
import { DesktopAuctionView } from "@/components/auction-detail/DesktopAuctionView";
import { ProtectionInfo } from "@/components/auction-detail/ProtectionInfo";

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
    finalPrice: 1150, // Precio final de venta
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
    buyer: {
      id: "2",
      name: "Ana Martínez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      rating: 4.9,
    },
    status: "sold", // Nuevo estado: vendido
    soldDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // Vendido hace 1 día
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

  const isSold = auction.status === "sold";
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {isMobile ? (
          <MobileAuctionView 
            auction={auction}
            isSold={isSold}
            timeLeft={timeLeft}
            handlePlaceBid={handlePlaceBid}
            handleBuyNow={handleBuyNow}
            handleContactSeller={handleContactSeller}
          />
        ) : (
          <DesktopAuctionView 
            auction={auction}
            isSold={isSold}
            timeLeft={timeLeft}
            handlePlaceBid={handlePlaceBid}
            handleBuyNow={handleBuyNow}
            handleContactSeller={handleContactSeller}
            setShowProtectionInfo={setShowProtectionInfo}
            navigate={navigate}
          />
        )}
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
      
      <ProtectionInfo 
        open={showProtectionInfo} 
        onOpenChange={setShowProtectionInfo} 
      />
    </MainLayout>
  );
};

export default AuctionDetail;
