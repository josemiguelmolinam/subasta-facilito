import { MainLayout } from "@/components/layout/MainLayout";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ProductCard as ProductCardComponent } from "@/components/ProductCard";

// This would typically come from your API
const fetchProduct = async (id: string) => {
  // Simulated API call
  return {
    id,
    title: "Producto de Ejemplo",
    currentBid: 1500,
    buyNowPrice: 3000,
    timeLeft: "2 días",
    imageUrl: "https://picsum.photos/400/300",
  };
};

const ProductCard = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id!),
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-auction-primary" />
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-auction-dark">
              Producto no encontrado
            </h1>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-md mx-auto">
          <ProductCardComponent
            title={product.title}
            currentBid={product.currentBid}
            buyNowPrice={product.buyNowPrice}
            timeLeft={product.timeLeft}
            imageUrl={product.imageUrl}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductCard;