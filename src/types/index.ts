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
  status: 'active' | 'ended' | 'cancelled' | 'featured' | 'sold';
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
  buyerId?: string;
  finalPrice?: number;
  soldDate?: Date;
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

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  type: 'personal' | 'business';
  verificationStatus: {
    email: boolean;
    twoFactor: boolean;
    identity: boolean;
    facial?: boolean;
    business?: boolean;
  };
  avatar?: string;
  createdAt: Date;
  businessInfo?: {
    name: string;
    taxId: string;
    address: string;
    documents: string[];
  };
  securitySettings?: {
    twoFactorEnabled: boolean;
    notificationsEnabled: boolean;
    lastLogin?: Date;
    activeSessions?: {
      device: string;
      location: string;
      lastActive: Date;
    }[];
  };
}
