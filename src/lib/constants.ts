export const CATEGORIES = [
  {
    id: "electronics",
    name: "Electrónica",
    description: "Dispositivos y gadgets tecnológicos",
    imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80"
  },
  {
    id: "vehicles",
    name: "Vehículos",
    description: "Coches, motos y más",
    imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80"
  },
  {
    id: "art",
    name: "Arte",
    description: "Pinturas, esculturas y obras de arte",
    imageUrl: "https://images.unsplash.com/photo-1561839561-b13931a7c147?auto=format&fit=crop&q=80"
  },
  {
    id: "collectibles",
    name: "Coleccionables",
    description: "Objetos únicos y de colección",
    imageUrl: "https://images.unsplash.com/photo-1602934585418-f588bea4215c?auto=format&fit=crop&q=80"
  },
  {
    id: "jewelry",
    name: "Joyería",
    description: "Joyas y relojes de lujo",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80"
  }
];

export const AUCTION_STATUSES = {
  ACTIVE: "active",
  ENDED: "ended",
  CANCELLED: "cancelled"
} as const;

export const SORT_OPTIONS = [
  { value: "price_asc", label: "Precio: Menor a Mayor" },
  { value: "price_desc", label: "Precio: Mayor a Menor" },
  { value: "endDate_asc", label: "Finaliza Pronto" },
  { value: "createdAt_desc", label: "Más Recientes" }
];

export const PRICE_RANGES = [
  { min: 0, max: 100, label: "Hasta 100€" },
  { min: 100, max: 500, label: "100€ - 500€" },
  { min: 500, max: 1000, label: "500€ - 1.000€" },
  { min: 1000, max: 5000, label: "1.000€ - 5.000€" },
  { min: 5000, max: null, label: "Más de 5.000€" }
];