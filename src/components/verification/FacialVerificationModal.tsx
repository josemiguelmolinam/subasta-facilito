
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
        title: "Verificación en proceso",
        description: "Estamos procesando tu verificación facial. Te notificaremos cuando esté lista.",
      });
      setTimeout(() => {
        onOpenChange(false);
      }, 2000);
    }, 3000);
  };

  const renderContent = () => {
    switch (step) {
      case 'instructions':
        return (
          <div className="space-y-6">
            <div className="bg-primary/5 p-6 rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Preparación para la verificación facial</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Asegúrate de estar en un lugar bien iluminado y mantén una expresión neutral
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700">Antes de empezar:</h4>
              <ul className="space-y-3">
                {[
                  "Asegúrate de tener una buena iluminación frontal",
                  "Quítate gafas de sol u otros accesorios que cubran tu rostro",
                  "Mira directamente a la cámara",
                  "Mantén una expresión neutral",
                  "Asegúrate de que tu rostro esté completamente visible"
                ].map((req, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={startCamera} className="min-w-[160px]">
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
              {/* Contorno facial y guías de alineación */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Círculo exterior con degradado */}
                <div className="w-72 h-72 rounded-full border-4 border-white/30 backdrop-blur-sm" />
                
                {/* Máscara facial con guías */}
                <div className="absolute w-64 h-64">
                  {/* Guías de alineación */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-0.5 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                  </div>
                  
                  {/* Esquinas de referencia */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/70" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white/70" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white/70" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/70" />
                </div>

                {/* Animación de escaneo */}
                <div className="absolute w-64 h-64 overflow-hidden">
                  <div className="w-full h-1 bg-primary/50 blur-sm animate-scan" 
                       style={{
                         animation: 'scan 2s linear infinite',
                         boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
                       }}
                  />
                </div>
              </div>

              {/* Instrucciones superpuestas */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-center text-sm">
                  Centra tu rostro dentro del círculo y mantén una expresión neutral
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                  }
                  setStep('instructions');
                }}
                className="min-w-[120px]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </Button>
              <Button 
                onClick={takePhoto}
                className="min-w-[120px]"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capturar
              </Button>
            </div>
          </div>
        );

      case 'verifying':
        return (
          <div className="py-12">
            <div className="flex flex-col items-center gap-6">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Verificando tu identidad</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Por favor, espera mientras procesamos tu imagen...
                </p>
              </div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="py-12">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">¡Imagen Capturada!</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Tu verificación facial está siendo procesada.<br />
                  Te notificaremos por email cuando esté lista.
                </p>
              </div>
              <Button onClick={() => onOpenChange(false)} className="mt-4">
                Entendido
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Verificación Facial</DialogTitle>
          <DialogDescription className="text-base">
            Para garantizar la seguridad de tu cuenta, necesitamos realizar una verificación facial
          </DialogDescription>
        </DialogHeader>

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default FacialVerificationModal;
