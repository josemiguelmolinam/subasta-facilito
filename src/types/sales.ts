
import { User } from "@/types";

export interface Buyer {
  id: string;
  name: string;
  email: string;
}

export interface Sale {
  id: string;
  title: string;
  image: string;
  price: number;
  saleDate: Date;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'completed';
  buyer: Buyer;
  shipping?: {
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: Date;
  };
  paymentReleased: boolean;
}

export interface SalesActionProps {
  onUpdateTracking: (saleId: string, trackingNumber: string, carrier: string) => void;
  onMarkShipped: (saleId: string) => void;
  onMarkDelivered: (saleId: string) => void;
  onCancelSale: (saleId: string) => void;
}
