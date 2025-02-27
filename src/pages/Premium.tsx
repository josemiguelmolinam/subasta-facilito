
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PricingCard } from "@/components/premium/PricingCard";
import { FeatureComparisonTable } from "@/components/premium/FeatureComparisonTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Crown, Diamond, ShieldCheck, CreditCard, Users, Clock, Zap, Sparkles, Star, Award, Gift, Check } from "lucide-react";

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
        {/* Hero Section - Mejorado */}
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-auction-primary to-auction-tertiary rounded-full p-4 shadow-lg animate-pulse">
                <Crown className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-auction-primary to-auction-tertiary bg-clip-text text-transparent mb-6 transition-all duration-500 animate-fade-in">
              Subastalo Premium
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-auction-primary to-auction-tertiary rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Desbloquea un mundo de posibilidades exclusivas con nuestros planes premium y lleva tu experiencia de subastas al siguiente nivel
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-auction-primary to-auction-tertiary hover:from-auction-tertiary hover:to-auction-primary text-white shadow-md transition-all duration-300 transform hover:scale-105"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver nuestros planes
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-auction-primary text-auction-primary hover:bg-auction-soft/30 transition-all duration-300 transform hover:scale-105"
              >
                Conoce los beneficios
              </Button>
            </div>
          </div>

          {/* Stats - Mejorado */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-auction-soft to-auction-primary/20 rounded-full p-4">
                  <Users className="h-8 w-8 text-auction-primary" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-auction-dark mb-2">+10,000</h3>
              <p className="text-gray-500">Usuarios premium activos</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-auction-soft to-auction-primary/20 rounded-full p-4">
                  <Sparkles className="h-8 w-8 text-auction-primary" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-auction-dark mb-2">98%</h3>
              <p className="text-gray-500">Tasa de satisfacción</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-auction-soft to-auction-primary/20 rounded-full p-4">
                  <Zap className="h-8 w-8 text-auction-primary" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-auction-dark mb-2">5x</h3>
              <p className="text-gray-500">Mayor éxito en pujas</p>
            </div>
          </div>
        </div>

        {/* Benefits Section - Mejorado */}
        <div className="container mx-auto px-4 py-24">
          <h2 className="text-4xl font-bold text-center mb-6">¿Por qué elegir Subastalo Premium?</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-auction-primary to-auction-tertiary rounded-full mx-auto mb-16"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-auction-primary/30 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-auction-soft to-auction-primary/20 rounded-xl p-5 mb-6 inline-block">
                <ShieldCheck className="h-10 w-10 text-auction-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Seguridad Premium</h3>
              <p className="text-gray-600 leading-relaxed">Verificación avanzada de usuarios y protección extra en todas tus transacciones con nivel bancario.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-auction-primary/30 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-auction-soft to-auction-primary/20 rounded-xl p-5 mb-6 inline-block">
                <Diamond className="h-10 w-10 text-auction-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Subastas Exclusivas</h3>
              <p className="text-gray-600 leading-relaxed">Acceso a subastas privadas con artículos únicos, ediciones limitadas y coleccionables especiales.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-auction-primary/30 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-auction-soft to-auction-primary/20 rounded-xl p-5 mb-6 inline-block">
                <Clock className="h-10 w-10 text-auction-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Acceso Anticipado</h3>
              <p className="text-gray-600 leading-relaxed">Sé el primero en descubrir y pujar en nuevas subastas hasta 24 horas antes que el resto de usuarios.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-auction-primary/30 hover:-translate-y-2">
              <div className="bg-gradient-to-br from-auction-soft to-auction-primary/20 rounded-xl p-5 mb-6 inline-block">
                <CreditCard className="h-10 w-10 text-auction-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Sin Comisiones</h3>
              <p className="text-gray-600 leading-relaxed">Olvídate de las comisiones al vender tus artículos y maximiza tus ganancias en cada subasta.</p>
            </div>
          </div>
        </div>

        {/* Características destacadas */}
        <div className="bg-gradient-to-b from-white to-auction-soft/30 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-6">Características destacadas</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-auction-primary to-auction-tertiary rounded-full mx-auto mb-16"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-auction-soft to-auction-primary/20 rounded-full p-3 h-fit">
                  <Star className="h-6 w-6 text-auction-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Historial detallado</h3>
                  <p className="text-gray-600">Accede a un historial completo de todas tus pujas y subastas con análisis detallados.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-auction-soft to-auction-primary/20 rounded-full p-3 h-fit">
                  <Award className="h-6 w-6 text-auction-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Puntos de fidelidad</h3>
                  <p className="text-gray-600">Acumula puntos canjeables por beneficios exclusivos en futuras subastas.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-auction-soft to-auction-primary/20 rounded-full p-3 h-fit">
                  <Gift className="h-6 w-6 text-auction-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Regalos sorpresa</h3>
                  <p className="text-gray-600">Recibe regalos sorpresa periódicamente según tu nivel de membresía premium.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-gradient-to-br from-auction-soft to-auction-primary/20 rounded-full p-3 h-fit">
                  <Check className="h-6 w-6 text-auction-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Verificación prioritaria</h3>
                  <p className="text-gray-600">Proceso de verificación acelerado para empezar a subastar de inmediato.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section - Mejorado y reordenado */}
        <div id="pricing" className="container mx-auto px-4 py-24">
          <h2 className="text-4xl font-bold text-center mb-6">Planes y Precios</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-auction-primary to-auction-tertiary rounded-full mx-auto mb-6"></div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Elige el plan que mejor se adapte a tus necesidades y comienza a disfrutar de todos los beneficios premium
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-16">
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

          {/* Pricing Cards - Reordenados: Estándar, Plus, Pro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="Estándar"
              price={getPrice(19.99)}
              description="Para entusiastas de subastas"
              features={[
                "Acceso a todas las subastas públicas",
                "Notificaciones en tiempo real",
                "Subastas exclusivas para miembros",
                "Estadísticas básicas",
                "Soporte prioritario",
                "Alertas personalizadas"
              ]}
              isPopular={true}
              ctaText="Seleccionar Estándar"
              onSelectPlan={() => handlePlanSelected("Estándar")}
            />
            <PricingCard
              title="Plus"
              price={getPrice(9.99)}
              description="Para usuarios ocasionales"
              features={[
                "Acceso a todas las subastas públicas",
                "Pujas ilimitadas en subastas abiertas",
                "Seguimiento de subastas favoritas",
                "Soporte por email",
                "Alertas básicas",
                "Perfil verificado"
              ]}
              ctaText="Comenzar con Plus"
              onSelectPlan={() => handlePlanSelected("Plus")}
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
                "Soporte prioritario 24/7",
                "Envíos gratuitos en compras"
              ]}
              ctaText="Obtener Pro"
              onSelectPlan={() => handlePlanSelected("Pro")}
            />
          </div>
          
          <div className="mt-20 max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-10">Comparativa de funcionalidades</h3>
            <FeatureComparisonTable />
          </div>
        </div>

        {/* Testimonials - Nueva sección */}
        <div className="bg-gradient-to-b from-auction-soft/20 to-white py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-6">Lo que dicen nuestros usuarios</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-auction-primary to-auction-tertiary rounded-full mx-auto mb-16"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative">
                <div className="absolute -top-6 left-8">
                  <div className="bg-gradient-to-r from-auction-primary to-auction-tertiary rounded-full p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-gray-600 italic mb-4">Desde que me suscribí al plan Estándar, he conseguido artículos exclusivos que no hubiera encontrado de otra manera. ¡Totalmente recomendado!</p>
                  <div className="flex items-center mt-6">
                    <div className="w-12 h-12 bg-auction-soft rounded-full"></div>
                    <div className="ml-4">
                      <h4 className="font-bold">Carlos M.</h4>
                      <p className="text-sm text-gray-500">Usuario Estándar</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative">
                <div className="absolute -top-6 left-8">
                  <div className="bg-gradient-to-r from-auction-primary to-auction-tertiary rounded-full p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-gray-600 italic mb-4">El plan Pro ha revolucionado la forma en que gestiono mis subastas. Ahorro en comisiones y tengo acceso a analíticas que me ayudan a maximizar mis ganancias.</p>
                  <div className="flex items-center mt-6">
                    <div className="w-12 h-12 bg-auction-soft rounded-full"></div>
                    <div className="ml-4">
                      <h4 className="font-bold">Laura S.</h4>
                      <p className="text-sm text-gray-500">Usuario Pro</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 relative">
                <div className="absolute -top-6 left-8">
                  <div className="bg-gradient-to-r from-auction-primary to-auction-tertiary rounded-full p-3 shadow-lg">
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-gray-600 italic mb-4">Empecé con el plan Plus y fue perfecto para probar. Las notificaciones y el seguimiento me han ayudado a conseguir artículos a precios increíbles.</p>
                  <div className="flex items-center mt-6">
                    <div className="w-12 h-12 bg-auction-soft rounded-full"></div>
                    <div className="ml-4">
                      <h4 className="font-bold">Miguel A.</h4>
                      <p className="text-sm text-gray-500">Usuario Plus</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - Mejorado */}
        <div className="container mx-auto px-4 py-24">
          <h2 className="text-4xl font-bold text-center mb-6">Preguntas Frecuentes</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-auction-primary to-auction-tertiary rounded-full mx-auto mb-16"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-auction-primary/30">
              <h3 className="text-lg font-bold mb-4">¿Puedo cambiar de plan en cualquier momento?</h3>
              <p className="text-gray-600">Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente y solo pagarás la diferencia prorrateada.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-auction-primary/30">
              <h3 className="text-lg font-bold mb-4">¿Cómo funciona el pago anual?</h3>
              <p className="text-gray-600">Con el pago anual obtienes un descuento del 20% sobre el precio mensual y se te factura una vez al año. Puedes cancelar en cualquier momento.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-auction-primary/30">
              <h3 className="text-lg font-bold mb-4">¿Hay un período de prueba?</h3>
              <p className="text-gray-600">Ofrecemos una prueba gratuita de 7 días para todos los planes Premium. Sin compromiso y con todas las funcionalidades desbloqueadas durante este período.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-auction-primary/30">
              <h3 className="text-lg font-bold mb-4">¿Puedo cancelar mi suscripción?</h3>
              <p className="text-gray-600">Puedes cancelar tu suscripción en cualquier momento desde tu perfil sin cargos adicionales. Seguirás disfrutando del servicio hasta el final del período facturado.</p>
            </div>
          </div>
        </div>

        {/* CTA Section - Mejorado */}
        <div className="bg-gradient-to-r from-auction-primary/10 to-auction-tertiary/10 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-auction-dark mb-6">Comienza tu experiencia Premium hoy mismo</h2>
              <p className="text-lg text-gray-600 mb-10">
                Únete a miles de usuarios que ya disfrutan de todas las ventajas de Subastalo Premium y descubre por qué somos la plataforma líder en subastas
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-auction-primary to-auction-tertiary hover:from-auction-tertiary hover:to-auction-primary text-white px-10 py-6 rounded-xl text-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Comienza ahora
              </Button>
              
              <p className="mt-6 text-sm text-gray-500">
                Sin compromiso • Cancela cuando quieras • Prueba 7 días gratis
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Premium;
