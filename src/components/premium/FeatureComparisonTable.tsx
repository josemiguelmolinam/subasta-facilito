
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

interface Feature {
  name: string;
  standard: boolean;
  plus: boolean;
  pro: boolean;
  business: boolean;
}

export const FeatureComparisonTable = () => {
  const features: Feature[] = [
    { name: "Acceso a todas las subastas públicas", standard: true, plus: true, pro: true, business: true },
    { name: "Pujas ilimitadas en subastas abiertas", standard: false, plus: true, pro: true, business: true },
    { name: "Seguimiento de subastas favoritas", standard: true, plus: true, pro: true, business: true },
    { name: "Notificaciones en tiempo real", standard: false, plus: true, pro: true, business: true },
    { name: "Subastas exclusivas para miembros", standard: false, plus: true, pro: true, business: true },
    { name: "Métricas y estadísticas avanzadas", standard: false, plus: false, pro: true, business: true },
    { name: "Acceso anticipado a subastas premium", standard: false, plus: false, pro: true, business: true },
    { name: "Subasta sin comisiones", standard: false, plus: false, pro: true, business: true },
    { name: "Soporte prioritario 24/7", standard: false, plus: false, pro: true, business: true },
    { name: "Posicionamiento destacado", standard: false, plus: false, pro: false, business: true },
    { name: "API de integración", standard: false, plus: false, pro: false, business: true },
    { name: "Gestor de cuenta personal", standard: false, plus: false, pro: false, business: true }
  ];

  return (
    <div className="w-full overflow-auto">
      <Table className="border shadow-md rounded-lg overflow-hidden">
        <TableHeader className="bg-gradient-to-r from-auction-soft/70 to-white">
          <TableRow>
            <TableHead className="w-[300px] py-4 text-lg font-bold">Característica</TableHead>
            <TableHead className="text-center py-4 text-lg font-bold">Estándar</TableHead>
            <TableHead className="text-center py-4 text-lg font-bold">Plus</TableHead>
            <TableHead className="text-center py-4 text-lg font-bold">Pro</TableHead>
            <TableHead className="text-center py-4 text-lg font-bold">Empresas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <TableCell className="font-medium py-4">{feature.name}</TableCell>
              <TableCell className="text-center py-4">
                {feature.standard ? (
                  <Check className="h-6 w-6 text-green-500 mx-auto" />
                ) : (
                  <X className="h-6 w-6 text-gray-300 mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center py-4">
                {feature.plus ? (
                  <Check className="h-6 w-6 text-green-500 mx-auto" />
                ) : (
                  <X className="h-6 w-6 text-gray-300 mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center py-4">
                {feature.pro ? (
                  <Check className="h-6 w-6 text-green-500 mx-auto" />
                ) : (
                  <X className="h-6 w-6 text-gray-300 mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center py-4">
                {feature.business ? (
                  <Check className="h-6 w-6 text-green-500 mx-auto" />
                ) : (
                  <X className="h-6 w-6 text-gray-300 mx-auto" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
