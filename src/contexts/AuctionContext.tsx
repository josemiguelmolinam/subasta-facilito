import React, { createContext, useContext, useState } from "react";
import { Auction } from "@/types";

interface AuctionContextType {
  auctions: Auction[];
  loading: boolean;
  error: string | null;
  fetchAuctions: () => Promise<void>;
  createAuction: (auction: Omit<Auction, "id" | "createdAt">) => Promise<void>;
  updateAuction: (id: string, auction: Partial<Auction>) => Promise<void>;
  deleteAuction: (id: string) => Promise<void>;
}

const AuctionContext = createContext<AuctionContextType | undefined>(undefined);

export const AuctionProvider = ({ children }: { children: React.ReactNode }) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAuctions = async () => {
    setLoading(true);
    try {
      // Aquí iría la lógica para obtener las subastas
      console.log("Fetching auctions...");
    } catch (error) {
      console.error("Error fetching auctions:", error);
      setError("Error al cargar las subastas");
    } finally {
      setLoading(false);
    }
  };

  const createAuction = async (auction: Omit<Auction, "id" | "createdAt">) => {
    setLoading(true);
    try {
      // Aquí iría la lógica para crear una subasta
      console.log("Creating auction...", auction);
    } catch (error) {
      console.error("Error creating auction:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateAuction = async (id: string, auction: Partial<Auction>) => {
    setLoading(true);
    try {
      // Aquí iría la lógica para actualizar una subasta
      console.log("Updating auction...", { id, auction });
    } catch (error) {
      console.error("Error updating auction:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAuction = async (id: string) => {
    setLoading(true);
    try {
      // Aquí iría la lógica para eliminar una subasta
      console.log("Deleting auction...", id);
    } catch (error) {
      console.error("Error deleting auction:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuctionContext.Provider
      value={{
        auctions,
        loading,
        error,
        fetchAuctions,
        createAuction,
        updateAuction,
        deleteAuction,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => {
  const context = useContext(AuctionContext);
  if (context === undefined) {
    throw new Error("useAuction must be used within an AuctionProvider");
  }
  return context;
};