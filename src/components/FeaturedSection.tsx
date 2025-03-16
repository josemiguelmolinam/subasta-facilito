import { ProductCard } from "./product/ProductCard";

export const FeaturedSection = () => {
  const featuredProducts = [
    {
      title: "iPhone 15 Pro Max - 256GB",
      currentBid: 899,
      buyNowPrice: 1199,
      timeLeft: "2h 15m",
      imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80",
    },
    {
      title: "MacBook Pro 16' M2 Max",
      currentBid: 2399,
      buyNowPrice: 2899,
      timeLeft: "4h 30m",
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80",
    },
    {
      title: "iPad Pro 12.9' 2023",
      currentBid: 799,
      buyNowPrice: 999,
      timeLeft: "1h 45m",
      imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80",
    },
    {
      title: "AirPods Pro 2nd Gen",
      currentBid: 199,
      timeLeft: "3h 20m",
      imageUrl: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-auction-soft text-auction-primary text-sm font-medium">
              Destacados
            </span>
            <h2 className="text-3xl font-bold text-auction-dark">Subastas Populares</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
