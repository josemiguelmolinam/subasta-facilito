
import { Sale } from "@/types/sales";

// Mock data for demonstration
export const mockSales: Sale[] = [
  {
    id: "sale1",
    title: "iPhone 15 Pro Max - 256GB",
    image: "https://images.unsplash.com/photo-1633053699034-459674171bec?q=80&w=500",
    price: 1199.99,
    saleDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    status: 'pending',
    buyer: {
      id: "buyer1",
      name: "Carlos Méndez",
      email: "carlos@example.com"
    },
    paymentReleased: false
  },
  {
    id: "sale2",
    title: "MacBook Pro M3 - 14 pulgadas",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500",
    price: 1799.99,
    saleDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    status: 'shipped',
    buyer: {
      id: "buyer2",
      name: "Laura Fernández",
      email: "laura@example.com"
    },
    shipping: {
      trackingNumber: "SP123456789ES",
      carrier: "SEUR",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
    },
    paymentReleased: false
  },
  {
    id: "sale3",
    title: "Samsung Galaxy S23 Ultra",
    image: "https://images.unsplash.com/photo-1614634224242-3bfcbf1f3f41?q=80&w=500",
    price: 899.99,
    saleDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    status: 'delivered',
    buyer: {
      id: "buyer3",
      name: "Miguel Ángel",
      email: "miguelangel@example.com"
    },
    shipping: {
      trackingNumber: "MR987654321ES",
      carrier: "MRW",
      estimatedDelivery: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    paymentReleased: false
  },
  {
    id: "sale4",
    title: "iPad Air 5",
    image: "https://images.unsplash.com/photo-1635016372614-52ee1837e8d6?q=80&w=500",
    price: 599.99,
    saleDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    status: 'completed',
    buyer: {
      id: "buyer4",
      name: "Sandra López",
      email: "sandra@example.com"
    },
    shipping: {
      trackingNumber: "CR123456789ES",
      carrier: "Correos",
      estimatedDelivery: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) // 20 days ago
    },
    paymentReleased: true
  }
];
