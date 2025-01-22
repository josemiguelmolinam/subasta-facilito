import { MainLayout } from "@/components/layout/MainLayout";

const Privacy = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-bold text-center text-auction-dark mb-8">
            Política de Privacidad
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-auction-dark">
                1. Información que Recopilamos
              </h2>
              <p className="text-muted-foreground">
                Recopilamos información personal que usted nos proporciona directamente, incluyendo:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Nombre y datos de contacto</li>
                <li>Información de la cuenta y perfil</li>
                <li>Historial de transacciones</li>
                <li>Comunicaciones con nosotros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-auction-dark">
                2. Uso de la Información
              </h2>
              <p className="text-muted-foreground">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Procesar sus transacciones</li>
                <li>Mantener y mejorar nuestros servicios</li>
                <li>Comunicarnos con usted</li>
                <li>Prevenir fraudes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-auction-dark">
                3. Compartir Información
              </h2>
              <p className="text-muted-foreground">
                No vendemos su información personal. Compartimos información solo cuando:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Usted nos da su consentimiento</li>
                <li>Es necesario para procesar transacciones</li>
                <li>Lo requiere la ley</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-auction-dark">
                4. Seguridad
              </h2>
              <p className="text-muted-foreground">
                Implementamos medidas de seguridad diseñadas para proteger su información personal,
                incluyendo encriptación SSL y protocolos de seguridad avanzados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-auction-dark">
                5. Sus Derechos
              </h2>
              <p className="text-muted-foreground">
                Usted tiene derecho a:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Acceder a su información personal</li>
                <li>Corregir datos inexactos</li>
                <li>Solicitar la eliminación de sus datos</li>
                <li>Oponerse al procesamiento de sus datos</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 p-6 bg-auction-soft rounded-lg">
            <h2 className="text-xl font-semibold text-auction-dark mb-4">
              Contacto
            </h2>
            <p className="text-muted-foreground">
              Si tiene preguntas sobre nuestra política de privacidad, contáctenos en:
              <br />
              <a href="mailto:privacy@subastalo.com" className="text-auction-primary hover:underline">
                privacy@subastalo.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;