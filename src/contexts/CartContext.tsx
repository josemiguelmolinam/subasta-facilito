import React, { createContext, useContext, useState } from "react";
import { Auction } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface CartItem {
  auction: Auction;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (auction: Auction) => void;
  removeItem: (auctionId: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (auction: Auction) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.auction.id === auction.id
      );

      if (existingItem) {
        toast({
          title: "Item ya en el carrito",
          description: "Este item ya está en tu carrito",
        });
        return prevItems;
      }

      toast({
        title: "Item añadido",
        description: "Item añadido al carrito exitosamente",
      });
      return [...prevItems, { auction, quantity: 1 }];
    });
  };

  const removeItem = (auctionId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.auction.id !== auctionId)
    );
    toast({
      title: "Item eliminado",
      description: "Item eliminado del carrito exitosamente",
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Carrito vaciado",
      description: "Se han eliminado todos los items del carrito",
    });
  };

  const total = items.reduce(
    (sum, item) => sum + item.auction.currentBid * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};