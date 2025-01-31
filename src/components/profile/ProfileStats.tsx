import { Card, CardContent } from "@/components/ui/card";
import { Activity, Package, Star, Shield } from "lucide-react";

interface ProfileStatsProps {
  activeAuctions: number;
  completedTransactions: number;
  rating: number;
  securityLevel: string;
}

export const ProfileStats = ({
  activeAuctions,
  completedTransactions,
  rating,
  securityLevel
}: ProfileStatsProps) => {
  const stats = [
    {
      icon: Activity,
      label: "Subastas Activas",
      value: `${activeAuctions} en curso`,
      color: "text-blue-500"
    },
    {
      icon: Package,
      label: "Transacciones",
      value: `${completedTransactions} completadas`,
      color: "text-green-500"
    },
    {
      icon: Star,
      label: "Valoración",
      value: `${rating}/5`,
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      label: "Seguridad",
      value: securityLevel,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`rounded-full p-3 bg-gray-100 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};