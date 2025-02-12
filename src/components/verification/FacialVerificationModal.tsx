
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle2, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface FacialVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FacialVerificationModal = ({ open, onOpenChange }: FacialVerificationModalProps) => {
  const [step, setStep] = useState<'instructions' | 'camera' | 'verifying' | 'success'>('instructions');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStep('camera');
    } catch (error) {
      toast({
        title: "Error al acceder a la cámara",
        description: "Por favor, asegúrate de dar permiso a la cámara",
        variant: "destructive",
      });
    }
  };

  const takePhoto = () => {
    setStep('verifying');
    // Simular proceso de verificación
    setTimeout(() => {
      setStep('success');
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      toast({
        title: "Verificación completada",
        description: "Tu identidad ha sido verificada correctamente",
      });
    }, 3000);
  };

  const renderContent = () => {
    switch (step) {
      case 'instructions':
        return (
          <div className="space-y-6">
            <div className="bg-primary/5 p-6 rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium">Preparación para la verificación facial</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Asegúrate de estar en un lugar bien iluminado
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Antes de empezar:</h4>
              <ul className="space-y-2">
                {[
                  "Asegúrate de tener una buena iluminación",
                  "Quítate gafas de sol u otros accesorios",
                  "Mira directamente a la cámara",
                  "Mantén una expresión neutral"
                ].map((req, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={startCamera}>
                Comenzar Verificación
              </Button>
            </div>
          </div>
        );

      case 'camera':
        return (
          <div className="space-y-6">
            <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-dashed border-white/50 m-8 rounded-lg" />
            </div>

            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={() => {
                if (stream) {
                  stream.getTracks().forEach(track => track.stop());
                }
                setStep('instructions');
              }}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </Button>
              <Button onClick={takePhoto}>
                <Camera className="w-4 h-4 mr-2" />
                Capturar
              </Button>
            </div>
          </div>
        );

      case 'verifying':
        return (
          <div className="py-8">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <div className="text-center">
                <h3 className="font-medium">Verificando tu identidad</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Por favor, espera mientras procesamos tu imagen
                </p>
              </div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="py-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="font-medium">¡Verificación Completada!</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Tu identidad ha sido verificada correctamente
                </p>
              </div>
              <Button onClick={() => onOpenChange(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Verificación Facial</DialogTitle>
          <DialogDescription>
            Realizaremos un escaneo facial para verificar tu identidad
          </DialogDescription>
        </DialogHeader>

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default FacialVerificationModal;
