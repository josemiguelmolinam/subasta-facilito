import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Timer, Gavel, Star, Search, Tag, Truck, Clock } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, PRICE_RANGES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils/currency";
import { calculateTimeLeft, formatTimeLeft } from "@/lib/utils/countdown";
import { cn } from "@/lib/utils";
import { Auction } from "@/types";
import { Badge } from "@/components/ui/badge";

const mockAuctions: Auction[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    description: "Nuevo iPhone 15 Pro Max con 256GB",
    startingPrice: 899,
    currentBid: 950,
    buyNowPrice: 1299,
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5",
    endDate: new Date(Date.now() + 1000 * 60 * 5),
    sellerId: "1",
    categoryId: "electronics",
    status: "active",
    createdAt: new Date(),
    specifications: {
      condition: "Nuevo",
      brand: "Apple",
      model: "iPhone 15 Pro Max"
    },
    totalBids: 15
  },
  {
    id: "2",
    title: "MacBook Pro 16",
    description: "MacBook Pro 16 con M2 Max",
    startingPrice: 1999,
    currentBid: 2050,
    buyNowPrice: 2499,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4",
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
    sellerId: "1",
    categoryId: "electronics",
    status: "active",
    createdAt: new Date(),
    totalBids: 10
  },
  {
    id: "3",
    title: "iPad Pro 12.9",
    description: "iPad Pro 12.9 con M2",
    startingPrice: 899,
    currentBid: 925,
    buyNowPrice: 1099,
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    sellerId: "1",
    categoryId: "electronics",
    status: "active",
    createdAt: new Date(),
    totalBids: 5
  },
  {
    id: "4",
    title: "AirPods Pro 2",
    description: "AirPods Pro 2 con cancelación de ruido",
    startingPrice: 199,
    currentBid: 215,
    buyNowPrice: 249,
    imageUrl: "https://images.unsplash.com/photo-1588156979435-379b9d802b0a",
    endDate: new Date(Date.now() + 1000 * 60 * 30),
    sellerId: "1",
    categoryId: "electronics",
    status: "active",
    createdAt: new Date(),
    totalBids: 8
  },
  {
    id: "5",
    title: "Apple Watch Series 9",
    description: "Apple Watch Series 9 GPS + Cellular",
    startingPrice: 399,
    currentBid: 425,
    buyNowPrice: 499,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 12),
    sellerId: "1",
    categoryId: "electronics",
    status: "active",
    createdAt: new Date(),
    totalBids: 12
  },
];

for (let i = 6; i <= 30; i++) {
  const randomHours = Math.floor(Math.random() * 72);
  const randomPrice = Math.floor(Math.random() * 2000) + 500;
  const randomBids = Math.floor(Math.random() * 50);
  
  mockAuctions.push({
    id: i.toString(),
    title: `Producto de ejemplo ${i}`,
    description: `Descripción del producto de ejemplo ${i}`,
    startingPrice: randomPrice,
    currentBid: randomPrice + Math.floor(Math.random() * 100),
    buyNowPrice: randomPrice + 500,
    imageUrl: `https://picsum.photos/400/400?random=${i}`,
    endDate: new Date(Date.now() + 1000 * 60 * 60 * randomHours),
    sellerId: "1",
    categoryId: "electronics",
    status: "active",
    createdAt: new Date(),
    totalBids: randomBids
  });
}

const ExploreAuctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>(mockAuctions);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [condition, setCondition] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [minBids, setMinBids] = useState<number>(0);
  const [onlyBuyNow, setOnlyBuyNow] = useState(false);
  const [onlyWithPhotos, setOnlyWithPhotos] = useState(false);
  const [endingSoon, setEndingSoon] = useState(false);
  const { addItem, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleWishlist = (e: React.MouseEvent, auction: Auction) => {
    e.stopPropagation();
    addItem(auction);
  };

  const navigateToAuction = (auctionId: string) => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1 -ml-4">
            <div className="flex items-center gap-2 mb-6">
              <Tag className="w-5 h-5 text-auction-primary" />
              <h2 className="text-xl font-semibold text-auction-dark">
                Filtros
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Búsqueda</Label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Buscar subastas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-50/50 border-gray-200 rounded-lg"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Categoría</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full bg-gray-50/50 rounded-lg border-gray-200">
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">
                  Rango de precio
                </Label>
                <div className="pt-2">
                  <Slider
                    defaultValue={[0, 5000]}
                    max={5000}
                    step={100}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatCurrency(priceRange[0])}</span>
                    <span>{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Estado</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger className="w-full bg-gray-50/50 rounded-lg border-gray-200">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="new">Nuevo</SelectItem>
                    <SelectItem value="like-new">Como nuevo</SelectItem>
                    <SelectItem value="good">Buen estado</SelectItem>
                    <SelectItem value="used">Usado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Ordenar por</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full bg-gray-50/50 rounded-lg border-gray-200">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Más recientes</SelectItem>
                    <SelectItem value="ending-soon">Terminan pronto</SelectItem>
                    <SelectItem value="price-asc">Precio más bajo</SelectItem>
                    <SelectItem value="price-desc">Precio más alto</SelectItem>
                    <SelectItem value="bids">Más pujas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="buy-now"
                    checked={onlyBuyNow}
                    onCheckedChange={(checked) => setOnlyBuyNow(checked as boolean)}
                  />
                  <label
                    htmlFor="buy-now"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Solo Cómpralo Ya
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="with-photos"
                    checked={onlyWithPhotos}
                    onCheckedChange={(checked) => setOnlyWithPhotos(checked as boolean)}
                  />
                  <label
                    htmlFor="with-photos"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Con fotos
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ending-soon"
                    checked={endingSoon}
                    onCheckedChange={(checked) => setEndingSoon(checked as boolean)}
                  />
                  <label
                    htmlFor="ending-soon"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Terminan pronto
                  </label>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Mínimo de pujas</Label>
                <Input
                  type="number"
                  min="0"
                  value={minBids}
                  onChange={(e) => setMinBids(Number(e.target.value))}
                  className="w-full bg-gray-50/50 rounded-lg border-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {auctions.map((auction) => {
                const timeLeft = calculateTimeLeft(auction.endDate);
                const formattedTime = formatTimeLeft(timeLeft);
                const isEnding = timeLeft.minutes < 10 && timeLeft.hours === 0 && timeLeft.days === 0;
                const isNew = new Date().getTime() - new Date(auction.createdAt).getTime() < 1000 * 60 * 60 * 24;

                return (
                  <div
                    key={auction.id}
                    onClick={() => navigateToAuction(auction.id)}
                    className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                      <div className="relative aspect-square">
                        <img
                          src={auction.imageUrl}
                          alt={auction.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {isNew ? (
                          <Badge
                            className="absolute top-3 left-3 bg-[#D946EF] text-white border-0 px-3 py-1"
                          >
                            Nuevo
                          </Badge>
                        ) : auction.status === 'featured' && (
                          <Badge
                            className="absolute top-3 left-3 bg-auction-primary text-white border-0 px-3 py-1"
                          >
                            Destacado
                          </Badge>
                        )}
                      </div>

                      <div className="p-4 space-y-3 relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWishlist(e, auction);
                          }}
                          className="absolute -top-8 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-all duration-300 hover:scale-110"
                        >
                          <Heart
                            className={cn(
                              "w-5 h-5 transition-colors",
                              isInWishlist(auction.id)
                                ? "fill-[#D946EF] text-[#D946EF]"
                                : "text-gray-600"
                            )}
                          />
                        </button>

                        <h3 className="font-semibold text-lg text-auction-dark line-clamp-2 group-hover:text-auction-primary transition-colors">
                          {auction.title}
                        </h3>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock
                              className={cn(
                                "w-4 h-4",
                                isEnding ? "text-red-500 animate-pulse" : "text-gray-500"
                              )}
                            />
                            <span
                              className={cn(
                                "text-sm font-medium",
                                isEnding ? "text-red-500" : "text-gray-500"
                              )}
                            >
                              {formattedTime}
                            </span>
                          </div>
                          
                          <Badge
                            className="bg-auction-soft text-auction-primary border-auction-primary/20"
                          >
                            <Gavel className="w-3 h-3 mr-1" />
                            {auction.totalBids} pujas
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Puja actual</span>
                            <span className="text-lg font-bold text-auction-primary">
                              {formatCurrency(auction.currentBid)}
                            </span>
                          </div>

                          {auction.buyNowPrice && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-[#D946EF]">Cómpralo ya</span>
                              <span className="text-base font-semibold text-black">
                                {formatCurrency(auction.buyNowPrice)}
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Truck className="w-4 h-4" />
                              <span className="text-sm">Envío</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                              {auction.shippingCost === 0 ? "Gratis" : formatCurrency(auction.shippingCost || 4.99)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExploreAuctions;
