
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PricingCard } from "@/components/premium/PricingCard";
import { FeatureComparisonTable } from "@/components/premium/FeatureComparisonTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Crown, Diamond, ShieldCheck, CreditCard, Users, Clock, Zap, Sparkles } from "lucide-react";

const Premium = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePlanSelected = (plan: string) => {
    toast({
      title: "Plan seleccionado",
      description: `Has seleccionado el plan ${plan}. Te redirigiremos a la página de pago.`,
    });
    navigate("/payment");
  };

  const getPrice = (basePrice: number) => {
    return billingCycle === "yearly" ? basePrice * 10 : basePrice;
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-auction-soft/50 via-white to-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-auction-soft rounded-full p-3">
                <Crown className="h-8 w-8 text-auction-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-auction-primary to-auction-tertiary bg-clip-text text-transparent mb-6">
              Subastalo Premium
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Desbloquea todas las funcionalidades exclusivas de nuestra plataforma y maximiza tu experiencia de subastas
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-auction-primary hover:bg-auction-secondary text-white"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver planes
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-auction-primary text-auction-primary hover:bg-auction-soft/30"
              >
                Conoce más
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="bg-auction-soft/30 rounded-full p-3">
                  <Users className="h-6 w-6 text-auction-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-auction-dark mb-2">+10,000</h3>
              <p className="text-gray-500">Usuarios premium activos</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="bg-auction-soft/30 rounded-full p-3">
                  <Sparkles className="h-6 w-6 text-auction-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-auction-dark mb-2">98%</h3>
              <p className="text-gray-500">Tasa de satisfacción</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="bg-auction-soft/30 rounded-full p-3">
                  <Zap className="h-6 w-6 text-auction-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-auction-dark mb-2">5x</h3>
              <p className="text-gray-500">Mayor éxito en pujas</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-16">¿Por qué elegir Subastalo Premium?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
              <div className="bg-auction-soft/30 rounded-xl p-4 mb-4 inline-block">
                <ShieldCheck className="h-8 w-8 text-auction-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seguridad Premium</h3>
              <p className="text-gray-600">Verificación avanzada de usuarios y protección extra en todas tus transacciones.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
              <div className="bg-auction-soft/30 rounded-xl p-4 mb-4 inline-block">
                <Diamond className="h-8 w-8 text-auction-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Subastas Exclusivas</h3>
              <p className="text-gray-600">Acceso a subastas privadas con artículos únicos y coleccionables especiales.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
              <div className="bg-auction-soft/30 rounded-xl p-4 mb-4 inline-block">
                <Clock className="h-8 w-8 text-auction-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Acceso Anticipado</h3>
              <p className="text-gray-600">Sé el primero en descubrir y pujar en nuevas subastas antes que nadie.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
              <div className="bg-auction-soft/30 rounded-xl p-4 mb-4 inline-block">
                <CreditCard className="h-8 w-8 text-auction-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sin Comisiones</h3>
              <p className="text-gray-600">Olvídate de las comisiones al vender tus artículos en nuestra plataforma.</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Planes y Precios</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Elige el plan que mejor se adapte a tus necesidades y comienza a disfrutar de todos los beneficios premium
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <Tabs defaultValue="monthly" className="w-full max-w-md mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly" onClick={() => setBillingCycle("monthly")}>
                  Pago Mensual
                </TabsTrigger>
                <TabsTrigger value="yearly" onClick={() => setBillingCycle("yearly")}>
                  Pago Anual <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">-20%</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Plus"
              price={getPrice(9.99)}
              description="Para usuarios ocasionales"
              features={[
                "Acceso a todas las subastas públicas",
                "Pujas ilimitadas en subastas abiertas",
                "Seguimiento de subastas favoritas",
                "Soporte por email",
                "Alertas básicas"
              ]}
              ctaText="Comenzar con Plus"
              onSelectPlan={() => handlePlanSelected("Plus")}
            />
            <PricingCard
              title="Estándar"
              price={getPrice(19.99)}
              description="Para entusiastas de subastas"
              features={[
                "Todo lo de Plus",
                "Notificaciones en tiempo real",
                "Subastas exclusivas para miembros",
                "Estadísticas básicas",
                "Soporte prioritario"
              ]}
              isPopular={true}
              ctaText="Seleccionar Estándar"
              onSelectPlan={() => handlePlanSelected("Estándar")}
            />
            <PricingCard
              title="Pro"
              price={getPrice(39.99)}
              description="Para coleccionistas y vendedores"
              features={[
                "Todo lo de Estándar",
                "Métricas y estadísticas avanzadas",
                "Acceso anticipado a subastas premium",
                "Subasta sin comisiones",
                "Soporte prioritario 24/7"
              ]}
              ctaText="Obtener Pro"
              onSelectPlan={() => handlePlanSelected("Pro")}
            />
          </div>
          
          <div className="mt-16 max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Comparativa de funcionalidades</h3>
            <FeatureComparisonTable />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-16">Preguntas Frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-bold mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
              <p className="text-gray-600">Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-bold mb-2">¿Cómo funciona el pago anual?</h3>
              <p className="text-gray-600">Con el pago anual obtienes un descuento del 20% sobre el precio mensual y se te factura una vez al año.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-bold mb-2">¿Hay un período de prueba?</h3>
              <p className="text-gray-600">Ofrecemos una prueba gratuita de 7 días para todos los planes Premium. Sin compromiso.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-bold mb-2">¿Puedo cancelar mi suscripción?</h3>
              <p className="text-gray-600">Puedes cancelar tu suscripción en cualquier momento desde tu perfil sin cargos adicionales.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-auction-primary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-auction-dark mb-6">Comienza tu experiencia Premium hoy mismo</h2>
              <p className="text-lg text-gray-600 mb-8">
                Únete a miles de usuarios que ya disfrutan de todas las ventajas de Subastalo Premium
              </p>
              <Button 
                size="lg" 
                className="bg-auction-primary hover:bg-auction-secondary text-white px-8"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver planes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Premium;
