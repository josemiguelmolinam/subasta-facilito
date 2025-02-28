
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle2, AlertCircle, Loader2, RefreshCw, Shield } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface FacialVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FacialVerificationModal = ({ open, onOpenChange }: FacialVerificationModalProps) => {
  const [step, setStep] = useState<'instructions' | 'camera' | 'verifying' | 'success' | 'error'>('instructions');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const faceCheckInterval = useRef<number | null>(null);

  // Limpiar el stream cuando el componente se desmonta o cuando cambia el estado
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (faceCheckInterval.current) {
        clearInterval(faceCheckInterval.current);
      }
    };
  }, [stream]);

  // Efecto para cuando el modal se cierra
  useEffect(() => {
    if (!open) {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (faceCheckInterval.current) {
        clearInterval(faceCheckInterval.current);
      }
      setStep('instructions');
      setStream(null);
      setFaceDetected(false);
    }
  }, [open]);

  // Simular detección facial (en un entorno real se usaría un SDK para esto)
  const simulateFaceDetection = () => {
    if (canvasRef.current && videoRef.current && videoRef.current.readyState === 4) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;
      
      // Dibujar el video en el canvas para procesar
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      // Simulamos detección después de 3 segundos
      setTimeout(() => {
        setFaceDetected(true);
      }, 3000);
    }
  };

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
        
        // Esperamos a que el video esté listo
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                console.log("Video está reproduciéndose");
                setStep('camera');
                
                // Iniciar simulación de detección facial después de que el video esté reproduciéndose
                if (faceCheckInterval.current) clearInterval(faceCheckInterval.current);
                faceCheckInterval.current = window.setInterval(simulateFaceDetection, 1000);
              })
              .catch(err => {
                console.error("Error al reproducir video:", err);
                setStep('error');
              });
          }
        };
      }
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
      setStep('error');
      toast({
        title: "Error al acceder a la cámara",
        description: "Por favor, asegúrate de dar permiso a la cámara y que no esté siendo utilizada por otra aplicación",
        variant: "destructive",
      });
    }
  };

  const takePhoto = () => {
    setStep('verifying');
    
    // Detenemos el intervalo de detección facial
    if (faceCheckInterval.current) {
      clearInterval(faceCheckInterval.current);
    }
    
    // Capturar la imagen del canvas
    if (canvasRef.current) {
      // En una implementación real, aquí se enviaría la imagen al backend
      // const imageData = canvasRef.current.toDataURL('image/jpeg');
    }
    
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

  const handleRetry = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (faceCheckInterval.current) {
      clearInterval(faceCheckInterval.current);
    }
    setStream(null);
    setFaceDetected(false);
    setStep('instructions');
  };

  const renderContent = () => {
    switch (step) {
      case 'instructions':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Verificación biométrica facial</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Esta verificación refuerza la seguridad de tu cuenta y protege a todos los usuarios
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
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

            <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 text-blue-700">
              <Shield className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">Esta verificación es segura y cumple con todas las normativas de protección de datos.</p>
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
              
              {/* Canvas oculto para procesar la imagen */}
              <canvas 
                ref={canvasRef} 
                width="1280" 
                height="720" 
                className="hidden" 
              />
              
              {/* Contorno facial y guías de alineación */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Círculo exterior con degradado */}
                <div className={`w-72 h-72 rounded-full border-4 transition-colors duration-500 ${
                  faceDetected ? 'border-green-400/70 shadow-lg shadow-green-400/20' : 'border-white/30'
                }`} />
                
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
                  <div className={`w-full h-1 blur-sm animate-scan ${
                    faceDetected ? 'bg-green-400/50' : 'bg-primary/50'
                  }`} 
                       style={{
                         animation: 'scan 2s linear infinite',
                         boxShadow: `0 0 15px ${faceDetected ? 'rgba(74, 222, 128, 0.5)' : 'rgba(139, 92, 246, 0.5)'}`,
                       }}
                  />
                </div>

                {/* Indicador de rostro detectado */}
                {faceDetected && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 animate-pulse">
                    <CheckCircle2 className="w-4 h-4" />
                    Rostro detectado
                  </div>
                )}
              </div>

              {/* Instrucciones superpuestas */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-center text-sm">
                  {faceDetected 
                    ? "Rostro detectado correctamente. Puedes capturar la imagen."
                    : "Centra tu rostro dentro del círculo y mantén una expresión neutral"}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={handleRetry}
                className="min-w-[120px]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </Button>
              <Button 
                onClick={takePhoto}
                disabled={!faceDetected}
                className={`min-w-[120px] transition-all ${
                  faceDetected ? 'bg-green-500 hover:bg-green-600' : ''
                }`}
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
                  Por favor, espera mientras procesamos y analizamos tu imagen...
                </p>
                
                <div className="mt-6 w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{width: '70%'}}></div>
                </div>
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
                <h3 className="text-lg font-semibold">¡Verificación Exitosa!</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Tu imagen ha sido capturada correctamente.<br />
                  La verificación se completará en nuestros servidores y te notificaremos por email cuando esté lista.
                </p>
              </div>
              <Button onClick={() => onOpenChange(false)} className="mt-4 bg-green-500 hover:bg-green-600">
                Entendido
              </Button>
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="py-12">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Ha ocurrido un error</h3>
                <p className="text-sm text-gray-500 mt-2">
                  No pudimos acceder a tu cámara. Por favor, verifica los permisos de tu navegador y asegúrate de que la cámara no esté siendo utilizada por otra aplicación.
                </p>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-left">
                  <p className="font-medium mb-2">Para solucionar este problema:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Verifica que tu cámara esté conectada y funcionando</li>
                    <li>Asegúrate de que has dado permisos de cámara a este sitio web</li>
                    <li>Cierra otras aplicaciones que puedan estar usando la cámara</li>
                    <li>Actualiza o cambia de navegador si el problema persiste</li>
                  </ol>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="mt-4">
                  Cancelar
                </Button>
                <Button onClick={handleRetry} className="mt-4">
                  Intentar nuevamente
                </Button>
              </div>
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
