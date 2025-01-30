import { useState } from "react";
import { Shield, Smartphone, Key, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import QRCode from "react-qr-code";

const SecuritySettings = () => {
  const { user, setupTwoFactor, verifyTwoFactor } = useAuth();
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");

  const handleSetup2FA = async () => {
    try {
      const { qrCode, secret } = await setupTwoFactor();
      setQrCode(qrCode);
      setSecret(secret);
      setShowQR(true);
    } catch (error) {
      console.error("Error al configurar 2FA:", error);
    }
  };

  const securityOptions = [
    {
      id: "2fa",
      title: "Autenticación en dos pasos",
      description: "Añade una capa extra de seguridad a tu cuenta",
      icon: Shield,
      enabled: user?.verificationStatus.twoFactor,
      requiresSetup: true,
      onToggle: handleSetup2FA,
    },
    {
      id: "notifications",
      title: "Notificaciones de seguridad",
      description: "Recibe alertas sobre actividad sospechosa",
      icon: Smartphone,
      enabled: true,
      requiresSetup: false,
    },
    {
      id: "sessions",
      title: "Gestión de sesiones",
      description: "Controla los dispositivos conectados",
      icon: Key,
      enabled: true,
      requiresSetup: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Seguridad de la cuenta</h3>
        <p className="text-sm text-muted-foreground">
          Gestiona la seguridad de tu cuenta y activa características adicionales
        </p>
      </div>

      <div className="grid gap-4">
        {securityOptions.map((option) => (
          <Card key={option.id} className="p-4">
            <div className="flex items-start space-x-4">
              <div className="rounded-full p-2 bg-primary/10 text-primary">
                <option.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{option.title}</p>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
              {option.requiresSetup ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant={option.enabled ? "outline" : "default"} 
                      size="sm"
                    >
                      {option.enabled ? "Configurado" : "Activar"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Configurar autenticación en dos pasos</DialogTitle>
                      <DialogDescription>
                        Escanea el código QR con tu aplicación de autenticación
                      </DialogDescription>
                    </DialogHeader>
                    {qrCode && (
                      <div className="flex flex-col items-center space-y-4 p-4">
                        <QRCode value={qrCode} />
                        <p className="text-sm text-muted-foreground">
                          Código secreto: {secret}
                        </p>
                        <Button onClick={() => setShowQR(false)}>
                          He escaneado el código
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              ) : (
                <Switch 
                  checked={option.enabled}
                  onCheckedChange={() => console.log(`Toggle ${option.id}`)}
                />
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 border-yellow-200 bg-yellow-50">
        <div className="flex items-start space-x-4">
          <div className="rounded-full p-2 bg-yellow-100 text-yellow-600">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="font-medium">Actividad reciente</p>
            <p className="text-sm text-muted-foreground">
              Último inicio de sesión: {new Date().toLocaleString()}
            </p>
          </div>
          <Button variant="outline" size="sm">
            Ver todo
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SecuritySettings;