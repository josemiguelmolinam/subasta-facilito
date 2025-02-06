import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";
import Autoplay from 'embla-carousel-autoplay';

export const LatestAuctions = () => {
  const auctions = [
    {
      title: "iPhone 15 Pro Max",
      currentBid: 899,
      buyNowPrice: 1299,
      timeLeft: "2h 15m",
      imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80",
      condition: "new" as const,
      isTrending: true,
      totalBids: 15,
      shipping: {
        isFree: true
      }
    },
    {
      title: "MacBook Pro M2",
      currentBid: 1499,
      buyNowPrice: 2199,
      timeLeft: "1h 30m",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80",
      condition: "like-new" as const,
      isExclusive: true,
      totalBids: 8,
      shipping: {
        hasMultipleOptions: true
      }
    },
    {
      title: "PlayStation 5",
      currentBid: 399,
      buyNowPrice: 599,
      timeLeft: "3h 45m",
      imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80",
      condition: "new" as const,
      isFeatured: true,
      totalBids: 20,
      shipping: {
        hasPickup: true
      }
    },
    {
      title: "iPad Pro 2023",
      currentBid: 699,
      buyNowPrice: 999,
      timeLeft: "4h 20m",
      imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80",
      isEnding: true,
      totalBids: 12,
      shipping: {
        cost: 15
      }
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-auction-soft">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-auction-dark mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-auction-primary to-auction-secondary">
            Últimas Subastas
          </span>
        </h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              })
            ]}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {auctions.map((auction, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-4 md:basis-1/2 lg:basis-1/3 transition-all duration-500 ease-in-out hover:scale-[1.02]"
                >
                  <div className="p-1">
                    <ProductCard {...auction} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};