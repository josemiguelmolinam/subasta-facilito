import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare, Shield } from "lucide-react";

interface NotificationSetting {
  id: string;
  type: 'bids' | 'messages' | 'security' | 'marketing';
  email: boolean;
  push: boolean;
}

interface NotificationSettingsProps {
  settings: NotificationSetting[];
  onToggle: (id: string, channel: 'email' | 'push') => void;
}

export const NotificationSettings = ({
  settings,
  onToggle
}: NotificationSettingsProps) => {
  const getIcon = (type: NotificationSetting['type']) => {
    switch (type) {
      case 'bids':
        return Bell;
      case 'messages':
        return MessageSquare;
      case 'security':
        return Shield;
      case 'marketing':
        return Mail;
    }
  };

  const getLabel = (type: NotificationSetting['type']) => {
    switch (type) {
      case 'bids':
        return 'Actualizaciones de pujas';
      case 'messages':
        return 'Mensajes nuevos';
      case 'security':
        return 'Alertas de seguridad';
      case 'marketing':
        return 'Novedades y ofertas';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de Notificaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {settings.map((setting) => {
            const Icon = getIcon(setting.type);
            return (
              <div key={setting.id} className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-auction-secondary" />
                  <span className="font-medium">
                    {getLabel(setting.type)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 ml-8">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor={`${setting.id}-email`}>Email</Label>
                    <Switch
                      id={`${setting.id}-email`}
                      checked={setting.email}
                      onCheckedChange={() => onToggle(setting.id, 'email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor={`${setting.id}-push`}>Notificaciones push</Label>
                    <Switch
                      id={`${setting.id}-push`}
                      checked={setting.push}
                      onCheckedChange={() => onToggle(setting.id, 'push')}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};