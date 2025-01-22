export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  avatar?: string;
}

export interface Seller {
  name: string;
  rating: number;
  totalSales: number;
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
  status: 'active' | 'ended' | 'cancelled';
  createdAt: Date;
  seller?: Seller;
  specifications?: {
    condition: string;
    brand: string;
    model: string;
    [key: string]: string;
  };
  totalBids: number;
}