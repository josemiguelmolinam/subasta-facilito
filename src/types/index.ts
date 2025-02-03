export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Seller {
  name: string;
  rating: number;
  totalSales: number;
}

export interface SaleOptions {
  auctionPrice?: number;
  buyNowAuctionPrice?: number;
  directSalePrice?: number;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentBid: number;
  buyNowPrice?: number;
  imageUrl: string;
  endDate: Date;
  sellerId: string;
  categoryId: string;
  status: 'active' | 'ended' | 'cancelled' | 'featured';
  createdAt: Date;
  seller?: Seller;
  specifications?: {
    condition: string;
    brand: string;
    model: string;
    [key: string]: string;
  };
  totalBids: number;
  shippingCost?: number;
  saleOptions?: SaleOptions;
  itemCondition?: string;
  shippingPayer?: string;
  transport?: string;
  images?: File[];
  shippingDetails?: {
    originCity: string;
    destinationCity: string;
    boxSize: string;
    weight: number;
    dimensions: string;
    additionalShippingCost: number;
    shippingObservations: string;
  };
}