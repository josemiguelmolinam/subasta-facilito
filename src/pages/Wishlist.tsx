import { MainLayout } from "@/components/layout/MainLayout";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const { items, clearWishlist } = useWishlist();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-auction-dark">Mi Lista de Deseos</h1>
          {items.length > 0 && (
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="hover:bg-auction-soft hover:text-auction-primary"
            >
              Limpiar Lista
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-16 w-16 text-auction-soft mb-4" />
            <h2 className="text-2xl font-semibold text-auction-dark mb-2">
              Tu lista de deseos está vacía
            </h2>
            <p className="text-muted-foreground mb-4">
              Añade items a tu lista para seguir las subastas que te interesan
            </p>
            <Button
              onClick={() => window.location.href = '/auctions'}
              className="bg-auction-primary hover:bg-auction-secondary text-white"
            >
              Explorar Subastas
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((auction) => (
              <ProductCard
                key={auction.id}
                title={auction.title}
                currentBid={auction.currentBid}
                buyNowPrice={auction.buyNowPrice}
                timeLeft="2 días"
                imageUrl={auction.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Wishlist;