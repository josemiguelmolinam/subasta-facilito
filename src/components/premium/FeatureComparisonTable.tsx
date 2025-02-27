
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

interface Feature {
  name: string;
  plus: boolean;
  standard: boolean;
  pro: boolean;
}

export const FeatureComparisonTable = () => {
  const features: Feature[] = [
    { name: "Acceso a todas las subastas públicas", plus: true, standard: true, pro: true },
    { name: "Pujas ilimitadas en subastas abiertas", plus: true, standard: true, pro: true },
    { name: "Seguimiento de subastas favoritas", plus: true, standard: true, pro: true },
    { name: "Notificaciones en tiempo real", plus: false, standard: true, pro: true },
    { name: "Subastas exclusivas para miembros", plus: false, standard: true, pro: true },
    { name: "Métricas y estadísticas avanzadas", plus: false, standard: false, pro: true },
    { name: "Acceso anticipado a subastas premium", plus: false, standard: false, pro: true },
    { name: "Subasta sin comisiones", plus: false, standard: false, pro: true },
    { name: "Soporte prioritario 24/7", plus: false, standard: false, pro: true }
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
