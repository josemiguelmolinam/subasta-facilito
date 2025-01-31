import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel, CreditCard, Bell, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Mis Subastas",
      icon: Gavel,
      onClick: () => navigate("/auctions"),
      color: "bg-auction-primary"
    },
    {
      title: "Pagos",
      icon: CreditCard,
      onClick: () => navigate("/payments"),
      color: "bg-auction-secondary"
    },
    {
      title: "Notificaciones",
      icon: Bell,
      onClick: () => navigate("/notifications"),
      color: "bg-auction-tertiary"
    },
    {
      title: "Configuración",
      icon: Settings,
      onClick: () => navigate("/settings"),
      color: "bg-auction-dark"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-gray-50"
              onClick={action.onClick}
            >
              <div className={`p-2 rounded-full ${action.color}`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};