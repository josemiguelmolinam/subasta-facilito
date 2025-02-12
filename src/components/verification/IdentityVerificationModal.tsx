
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
    
    // Simular carga
    setTimeout(() => {
      setUploadStatus('success');
      toast({
        title: "Documento subido correctamente",
        description: "Tu documento será revisado en las próximas 24-48 horas",
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Verificación de Identidad</DialogTitle>
          <DialogDescription>
            Sube una foto clara de tu DNI o pasaporte para verificar tu identidad
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <div className={cn(
            "border-2 border-dashed rounded-lg p-6 transition-all",
            "hover:border-primary/50 hover:bg-muted/50",
            selectedFile ? "border-primary/50 bg-muted/50" : "border-gray-200"
          )}>
            <label className="flex flex-col items-center gap-2 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  {selectedFile ? selectedFile.name : "Haz clic para seleccionar"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG o PDF hasta 5MB
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
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Requisitos del documento:</h4>
            <ul className="space-y-2">
              {[
                "Documento vigente y sin daños",
                "Todas las esquinas visibles",
                "Información claramente legible",
                "Sin reflejos ni brillos excesivos"
              ].map((req, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Status and Action */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={uploadStatus === 'uploading'}
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
                  Subiendo...
                </>
              ) : uploadStatus === 'success' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Completado
                </>
              ) : (
                "Subir"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IdentityVerificationModal;
