import { MainLayout } from "@/components/layout/MainLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Cómo funciona el sistema de pujas?",
      answer: "Nuestro sistema de pujas es simple y transparente. Cada puja debe superar la anterior por un monto mínimo establecido. El sistema automáticamente actualiza el precio actual y notifica a los participantes."
    },
    {
      question: "¿Cómo me registro en la plataforma?",
      answer: "Para registrarte, haz clic en el botón 'Registrarse' en la esquina superior derecha. Completa el formulario con tus datos personales y verifica tu correo electrónico."
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos múltiples métodos de pago incluyendo tarjetas de crédito/débito, PayPal y transferencias bancarias. Todos los pagos están protegidos por nuestro sistema de seguridad."
    },
    {
      question: "¿Qué pasa si gano una subasta?",
      answer: "Cuando ganas una subasta, recibirás una notificación por email. Tendrás 24 horas para completar el pago. Una vez confirmado, te pondremos en contacto con el vendedor."
    },
    {
      question: "¿Cómo puedo vender en la plataforma?",
      answer: "Para vender, necesitas una cuenta verificada. Una vez verificado, puedes crear una subasta desde tu panel de usuario, añadiendo fotos y descripción del producto."
    },
    {
      question: "¿Qué comisión cobra la plataforma?",
      answer: "Nuestra comisión es del 5% sobre el precio final de venta. No hay costos por crear una subasta o participar como comprador."
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-auction-dark mb-8">
            Preguntas Frecuentes
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg px-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-auction-dark mb-4">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="text-muted-foreground mb-6">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte
            </p>
            <button className="bg-auction-primary text-white px-6 py-2 rounded-lg hover:bg-auction-secondary transition-colors">
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQ;