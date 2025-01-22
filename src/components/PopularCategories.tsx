import { Card, CardContent } from "./ui/card";

const categories = [
  {
    name: "Vehículos",
    description: "Autos, motos y más",
    color: "bg-auction-primary",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  {
    name: "Relojes",
    description: "Relojes de lujo",
    color: "bg-auction-secondary",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  },
  {
    name: "Joyería",
    description: "Joyas y piedras preciosas",
    color: "bg-auction-tertiary",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
  },
  {
    name: "Tecnología",
    description: "Gadgets y electrónicos",
    color: "bg-auction-primary",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    name: "Inmuebles",
    description: "Casas y terrenos",
    color: "bg-auction-secondary",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  },
  {
    name: "Arte",
    description: "Obras de arte y coleccionables",
    color: "bg-auction-tertiary",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  },
  {
    name: "Deportes",
    description: "Equipamiento deportivo",
    color: "bg-auction-primary",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
  },
  {
    name: "Moda",
    description: "Ropa y accesorios",
    color: "bg-auction-secondary",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
  },
  {
    name: "Antigüedades",
    description: "Objetos históricos",
    color: "bg-auction-tertiary",
    image: "https://images.unsplash.com/photo-1459908676235-d5f02a50184b",
  },
  {
    name: "Instrumentos",
    description: "Instrumentos musicales",
    color: "bg-auction-primary",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629",
  },
  {
    name: "Coleccionables",
    description: "Items de colección",
    color: "bg-auction-secondary",
    image: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24",
  },
  {
    name: "Libros",
    description: "Libros raros y ediciones especiales",
    color: "bg-auction-tertiary",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
];

export const PopularCategories = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-auction-dark">
          Categorías Populares
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer animate-fade-in overflow-hidden relative h-[160px]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${category.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <CardContent className="p-3 relative z-10 h-full flex flex-col justify-end">
                <h3 className="text-base font-semibold mb-1 text-white">
                  {category.name}
                </h3>
                <p className="text-gray-200 text-xs">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};