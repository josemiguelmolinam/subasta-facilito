import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "María García",
      role: "Coleccionista",
      content: "La mejor plataforma para encontrar artículos únicos. He conseguido piezas increíbles a precios inmejorables.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Carlos Rodríguez",
      role: "Vendedor Profesional",
      content: "Como vendedor, valoro mucho la facilidad de uso y la gran base de compradores activos.",
      rating: 5,
      image: "/placeholder.svg"
    },
    {
      name: "Ana Martínez",
      role: "Compradora Frecuente",
      content: "El proceso de puja es emocionante y transparente. Siempre encuentro lo que busco.",
      rating: 5,
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-auction-dark text-center mb-12">
          Lo Que Dicen Nuestros Usuarios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-auction-dark">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-auction-secondary">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-auction-primary text-auction-primary"
                  />
                ))}
              </div>
              <p className="text-auction-secondary">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};