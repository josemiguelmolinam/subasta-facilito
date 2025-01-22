import { Button } from "@/components/ui/button";
import { ArrowRight, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path); 
  };

  return (
    <section className="pt-[150px] pb-12 bg-gradient-to-b from-auction-soft to-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-auction-primary text-sm font-medium animate-float">
            La plataforma líder de subastas en España
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-auction-dark">
            Descubre, Puja y Gana en{" "}
            <span className="text-auction-primary">Subastalo</span>
          </h1>

          <p className="text-lg text-auction-secondary max-w-2xl mx-auto">
            Miles de productos únicos esperando tu mejor oferta. Compra y vende
            de forma segura en la mayor comunidad de subastas online de España.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Botón "Explorar Subastas" */}
            <Button
              className="group flex items-center gap-2 px-6 py-3 font-bold text-lg bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary text-white rounded-lg shadow-lg transition-all duration-300 hover:from-auction-tertiary hover:via-auction-secondary hover:to-auction-primary hover:shadow-auction-primary/50"
              onClick={() => handleNavigate("/auctions/explore")}
            >
              Explorar Subastas
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
