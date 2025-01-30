import { Check, AlertCircle, Clock, Shield, FileText, Camera } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const VerificationProgress = () => {
  const { user } = useAuth();
  
  const steps = [
    {
      id: "email",
      title: "Email verificado",
      description: "Tu email ha sido confirmado",
      icon: Shield,
      completed: user?.verificationStatus.email,
    },
    {
      id: "identity",
      title: "Identidad verificada",
      description: "DNI o pasaporte verificado",
      icon: FileText,
      completed: user?.verificationStatus.identity,
    },
    {
      id: "facial",
      title: "Reconocimiento facial",
      description: "Verificación biométrica completada",
      icon: Camera,
      completed: user?.verificationStatus.facial,
    },
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Nivel de verificación</h3>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground">
          {completedSteps} de {steps.length} verificaciones completadas
        </p>
      </div>

      <div className="grid gap-4">
        {steps.map((step) => (
          <Card key={step.id} className="p-4">
            <div className="flex items-start space-x-4">
              <div className={`rounded-full p-2 ${
                step.completed 
                  ? "bg-green-100 text-green-600" 
                  : "bg-gray-100 text-gray-400"
              }`}>
                {step.completed ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{step.title}</p>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {!step.completed && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => console.log(`Iniciar verificación: ${step.id}`)}
                >
                  Verificar
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VerificationProgress;