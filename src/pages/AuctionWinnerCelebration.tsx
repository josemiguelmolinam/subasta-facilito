import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Trophy, PartyPopper, ShoppingBag, Share2, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "@/hooks/use-window-size";
import { useToast } from "@/components/ui/use-toast";

export const AuctionWinnerCelebration = () => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [isConfettiActive, setIsConfettiActive] = useState(true);
  const { id } = useParams();
  const { toast } = useToast();

  // Mock data - In a real app, this would come from your API
  const winnerData = {
    name: "Juan Pérez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    itemName: "iPhone 15 Pro Max",
    itemImage: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5",
    finalPrice: 1250
  };

  useEffect(() => {
    // Stop confetti after 12 seconds (extended from 8)
    const timer = setTimeout(() => {
      setIsConfettiActive(false);
    }, 12000);

    // Show celebration toast
    toast({
      title: "¡Victoria!",
      description: "¡Has ganado la subasta! 🎉",
      duration: 5000,
    });

    return () => clearTimeout(timer);
  }, [toast]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <MainLayout>
      {isConfettiActive && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          recycle={true}
          colors={["#FFD700", "#FF6B6B", "#4CAF50", "#2196F3", "#9C27B0", "#FF1493"]}
          gravity={0.3}
        />
      )}

      <div className="container mx-auto px-4 py-8 mt-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1
            }}
            className="flex justify-center"
          >
            <div className="relative">
              <Trophy className="w-32 h-32 text-yellow-500 animate-pulse" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -top-4 -right-4"
              >
                <Star className="w-10 h-10 text-yellow-400" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
                className="absolute -bottom-4 -left-4"
              >
                <Sparkles className="w-10 h-10 text-purple-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-transparent bg-clip-text animate-gradient-bold">
              ¡Felicidades! ¡Has ganado la subasta!
            </h1>
            <p className="text-2xl text-gray-600 animate-pulse">
              Te has llevado un artículo increíble
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-white via-purple-50 to-blue-50 rounded-xl shadow-2xl p-8 space-y-6 transform hover:scale-105 transition-transform duration-300"
          >
            <motion.div
              className="flex items-center justify-center space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <motion.img
                  src={winnerData.avatar}
                  alt={winnerData.name}
                  className="w-24 h-24 rounded-full border-4 border-auction-primary shadow-lg"
                  animate={{
                    borderColor: ["#9b87f5", "#7E69AB", "#6E59A5", "#9b87f5"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full p-3 shadow-lg"
                >
                  <PartyPopper className="w-6 h-6 text-white" />
                </motion.div>
              </div>
              <div className="text-left">
                <motion.h2
                  className="text-3xl font-bold bg-gradient-to-r from-auction-primary to-auction-secondary text-transparent bg-clip-text"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {winnerData.name}
                </motion.h2>
                <p className="text-gray-500 text-xl">¡Ganador afortunado!</p>
              </div>
            </motion.div>

            <motion.div
              className="relative group rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <div className="aspect-square max-w-sm mx-auto overflow-hidden">
                <motion.img
                  src={winnerData.itemImage}
                  alt={winnerData.itemName}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <h3 className="text-white text-2xl font-bold px-4 py-2 bg-black/30 rounded-full backdrop-blur-sm">
                  {winnerData.itemName}
                </h3>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6 mt-8"
              variants={itemVariants}
            >
              <Button
                onClick={() => navigate(`/payment/${id}`)}
                className="bg-gradient-to-r from-auction-primary to-auction-secondary hover:from-auction-secondary hover:to-auction-primary text-white text-lg py-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ShoppingBag className="w-6 h-6 mr-2" />
                Proceder al pago
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  toast({
                    title: "¡Compartido!",
                    description: "Tu victoria ha sido compartida con tus amigos",
                  });
                  navigate("/auctions/explore");
                }}
                className="border-2 border-auction-primary hover:bg-auction-soft text-lg py-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Share2 className="w-6 h-6 mr-2" />
                Compartir victoria
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default AuctionWinnerCelebration;