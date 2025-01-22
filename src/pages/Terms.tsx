import { MainLayout } from "@/components/layout/MainLayout";

const Terms = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-bold text-center text-auction-dark mb-8">
            Términos y Condiciones
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-auction-dark">
                1. Aceptación de los Términos
              </h2>
              <p className="text-muted-foreground">
                Al acceder y utilizar esta plataforma, usted acepta estar sujeto a estos términos y
                condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no podrá
                acceder al servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-auction-dark">
                2. Registro y Cuenta
              </h2>
              <p className="text-muted-foreground">
                Para utilizar nuestros servicios, debe:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Ser mayor de 18 años</li>
                <li>Registrarse con información precisa y completa</li>
                <li>Mantener la seguridad de su cuenta</li>
                <li>No compartir sus credenciales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-auction-dark">
                3. Reglas de las Subastas
              </h2>
              <p className="text-muted-foreground">
                Al participar en las subastas, usted acepta:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Realizar pujas vinculantes</li>
                <li>Pagar por los artículos ganados</li>
                <li>No manipular los precios</li>
                <li>Respetar los tiempos de cierre</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-auction-dark">
                4. Pagos y Tarifas
              </h2>
              <p className="text-muted-foreground">
                Todas las transacciones están sujetas a:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Comisión del 5% sobre ventas</li>
                <li>Pagos seguros a través de nuestra plataforma</li>
                <li>Política de reembolso de 24 horas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-auction-dark">
                5. Propiedad Intelectual
              </h2>
              <p className="text-muted-foreground">
                Todo el contenido presente en la plataforma está protegido por derechos de autor y
                otras leyes de propiedad intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-auction-dark">
                6. Limitación de Responsabilidad
              </h2>
              <p className="text-muted-foreground">
                No nos hacemos responsables de:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Descripción inexacta de productos</li>
                <li>Problemas entre compradores y vendedores</li>
                <li>Pérdidas indirectas</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 p-6 bg-auction-soft rounded-lg">
            <h2 className="text-xl font-semibold text-auction-dark mb-4">
              Contacto Legal
            </h2>
            <p className="text-muted-foreground">
              Para consultas legales, contáctenos en:
              <br />
              <a href="mailto:legal@subastalo.com" className="text-auction-primary hover:underline">
                legal@subastalo.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Terms;