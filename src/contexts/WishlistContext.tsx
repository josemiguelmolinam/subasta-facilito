import React, { createContext, useContext, useState } from "react";
import { Auction } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface WishlistContextType {
  items: Auction[];
  addItem: (auction: Auction) => void;
  removeItem: (auctionId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (auctionId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Auction[]>([]);

  const addItem = (auction: Auction) => {
    setItems((prevItems) => {
      if (prevItems.some((item) => item.id === auction.id)) {
        toast({
          title: "Item ya en favoritos",
          description: "Este item ya está en tu lista de favoritos",
        });
        return prevItems;
      }

      toast({
        title: "Item añadido a favoritos",
        description: "Item añadido a favoritos exitosamente",
      });
      return [...prevItems, auction];
    });
  };

  const removeItem = (auctionId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== auctionId));
    toast({
      title: "Item eliminado",
      description: "Item eliminado de favoritos exitosamente",
    });
  };

  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Lista de favoritos vaciada",
      description: "Se han eliminado todos los items de favoritos",
    });
  };

  const isInWishlist = (auctionId: string) => {
    return items.some((item) => item.id === auctionId);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};