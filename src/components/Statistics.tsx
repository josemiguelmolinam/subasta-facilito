import { Users, ShoppingBag, Award, Percent } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Statistics = () => {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Usuarios Activos",
      description: "en nuestra plataforma"
    },
    {
      icon: ShoppingBag,
      value: "100K+",
      label: "Subastas Completadas",
      description: "exitosamente"
    },
    {
      icon: Award,
      value: "98%",
      label: "Satisfacción",
      description: "de nuestros usuarios"
    },
    {
      icon: Percent,
      value: "40%",
      label: "Ahorro Medio",
      description: "en las compras"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-auction-soft">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-auction-dark text-center mb-12">
          Números Que Hablan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="w-12 h-12 text-auction-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-auction-dark">
                  {stat.value}
                </h3>
                <p className="font-medium text-auction-primary">
                  {stat.label}
                </p>
                <p className="text-sm text-auction-secondary">
                  {stat.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};