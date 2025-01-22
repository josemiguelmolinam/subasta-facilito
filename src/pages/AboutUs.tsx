import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Shield, Users, Zap } from "lucide-react";

const AboutUs = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-auction-dark mb-8">
            Sobre Nosotros
          </h1>
          
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-muted-foreground text-center mb-12">
              Subastalo es la plataforma líder en subastas online, conectando compradores y vendedores
              en un entorno seguro y transparente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-auction-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Seguridad Garantizada</h3>
                <p className="text-muted-foreground">
                  Todas las transacciones están protegidas por nuestro sistema de seguridad avanzado.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-auction-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Comunidad Activa</h3>
                <p className="text-muted-foreground">
                  Miles de usuarios confían en nuestra plataforma para sus transacciones diarias.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-auction-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Subastas en Tiempo Real</h3>
                <p className="text-muted-foreground">
                  Sistema de pujas en tiempo real para una experiencia emocionante y transparente.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-auction-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
                <p className="text-muted-foreground">
                  Verificamos todos los productos para asegurar la mejor calidad.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-auction-soft rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-auction-dark mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Únete a nuestra comunidad y descubre las mejores oportunidades.
            </p>
            <button className="bg-auction-primary text-white px-8 py-3 rounded-lg hover:bg-auction-secondary transition-colors">
              Registrarse Ahora
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;