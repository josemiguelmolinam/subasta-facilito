import { Search, Gavel, Trophy, ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Encuentra",
      description: "Explora miles de artículos únicos en nuestras categorías"
    },
    {
      icon: Gavel,
      title: "Puja",
      description: "Participa en subastas emocionantes con otros compradores"
    },
    {
      icon: Trophy,
      title: "Gana",
      description: "Consigue los mejores precios en artículos exclusivos"
    }
  ];

  return (
    <section className="py-16 bg-auction-soft">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-auction-dark text-center mb-12">
          ¿Cómo Funciona?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                  <step.icon className="w-8 h-8 text-auction-primary" />
                </div>
                <h3 className="text-xl font-semibold text-auction-dark">
                  {step.title}
                </h3>
                <p className="text-auction-secondary">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-8 right-0 transform translate-x-1/2 w-6 h-6 text-auction-primary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};