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
}

export interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'error';
  icon: React.ComponentType;
}
