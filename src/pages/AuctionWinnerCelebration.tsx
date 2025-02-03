import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Trophy, Party, ShoppingBag, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useWindowSize } from "@/hooks/use-window-size";

export const AuctionWinnerCelebration = () => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [isConfettiActive, setIsConfettiActive] = useState(true);
  const { id } = useParams();

  // Mock data - In a real app, this would come from your API
  const winnerData = {
    name: "Juan Pérez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    itemName: "iPhone 15 Pro Max",
    itemImage: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5",
    finalPrice: 1250
  };

  useEffect(() => {
    // Stop confetti after 8 seconds
    const timer = setTimeout(() => {
      setIsConfettiActive(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout>
      {isConfettiActive && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={true}
          colors={["#FFD700", "#FF6B6B", "#4CAF50", "#2196F3", "#9C27B0"]}
        />
      )}

      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex justify-center"
          >
            <Trophy className="w-24 h-24 text-yellow-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-auction-primary">
              ¡Felicidades! ¡Has ganado la subasta!
            </h1>
            <p className="text-xl text-gray-600">
              Te has llevado un artículo increíble
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-2xl p-8 space-y-6"
          >
            <div className="flex items-center justify-center space-x-4">
              <div className="relative">
                <img
                  src={winnerData.avatar}
                  alt={winnerData.name}
                  className="w-20 h-20 rounded-full border-4 border-auction-primary"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                  <Party className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold">{winnerData.name}</h2>
                <p className="text-gray-500">¡Ganador afortunado!</p>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-square max-w-sm mx-auto overflow-hidden rounded-lg">
                <img
                  src={winnerData.itemImage}
                  alt={winnerData.itemName}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                <h3 className="text-white text-xl font-bold">{winnerData.itemName}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button
                onClick={() => navigate(`/payment/${id}`)}
                className="bg-auction-primary hover:bg-auction-secondary text-white"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Proceder al pago
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/auctions/explore")}
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartir victoria
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AuctionWinnerCelebration;