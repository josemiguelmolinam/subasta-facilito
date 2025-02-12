
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUp, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface IdentityVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const IdentityVerificationModal = ({ open, onOpenChange }: IdentityVerificationModalProps) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Archivo demasiado grande",
          description: "El archivo no debe superar los 5MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus('uploading');
    
    // Simular proceso de verificación
    setTimeout(() => {
      setUploadStatus('success');
      toast({
        title: "Verificación en proceso",
        description: "Tu documento se está revisando. Te notificaremos por email cuando esté verificado.",
      });
      setTimeout(() => {
        onOpenChange(false);
      }, 2000);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Verificación de Identidad</DialogTitle>
          <DialogDescription className="text-base">
            Para garantizar la seguridad de nuestra comunidad, necesitamos verificar tu identidad
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <div className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-all",
            "hover:border-primary/50 hover:bg-muted/50",
            "group cursor-pointer",
            selectedFile ? "border-primary/50 bg-muted/50" : "border-gray-200"
          )}>
            <label className="flex flex-col items-center gap-4 cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileUp className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">
                  {selectedFile ? selectedFile.name : "Arrastra tu documento o haz clic aquí"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Acepta DNI, NIE o Pasaporte (PNG, JPG o PDF hasta 5MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileSelect}
                disabled={uploadStatus === 'uploading'}
              />
            </label>
          </div>

          {/* Requirements */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700">Requisitos del documento:</h4>
            <ul className="space-y-3">
              {[
                "Documento oficial vigente y sin daños",
                "Todas las esquinas visibles en la foto",
                "Información claramente legible",
                "Sin reflejos ni brillos excesivos",
                "Foto tomada sobre fondo claro"
              ].map((req, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Status and Action */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={uploadStatus === 'uploading'}
              className="min-w-[100px]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploadStatus === 'uploading' || uploadStatus === 'success'}
              className="min-w-[100px]"
            >
              {uploadStatus === 'uploading' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verificando...
                </>
              ) : uploadStatus === 'success' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  ¡Enviado!
                </>
              ) : (
                "Verificar"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IdentityVerificationModal;
