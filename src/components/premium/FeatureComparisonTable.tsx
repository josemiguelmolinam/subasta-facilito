
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Característica</TableHead>
            <TableHead className="text-center">Plus</TableHead>
            <TableHead className="text-center">Estándar</TableHead>
            <TableHead className="text-center">Pro</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell className="text-center">
                {feature.plus ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-gray-300 mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {feature.standard ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-gray-300 mx-auto" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {feature.pro ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-gray-300 mx-auto" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
