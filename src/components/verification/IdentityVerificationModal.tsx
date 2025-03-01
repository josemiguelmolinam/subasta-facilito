
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import DocumentTypeSelector, { documentFormSchema, DocumentFormValues } from "./DocumentTypeSelector";
import DocumentUploader, { DocumentFile } from "./DocumentUploader";
import DocumentRequirements from "./DocumentRequirements";

interface IdentityVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const IdentityVerificationModal = ({ open, onOpenChange }: IdentityVerificationModalProps) => {
  const [frontFile, setFrontFile] = useState<DocumentFile>({ file: null, preview: null });
  const [backFile, setBackFile] = useState<DocumentFile>({ file: null, preview: null });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      documentType: "dni",
    },
  });

  const documentType = form.watch("documentType");

  const handleFileValidation = (file: File): boolean => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "Archivo demasiado grande",
        description: "El archivo no debe superar los 5MB",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleUpload = async () => {
    if (!frontFile.file || (documentType === "dni" && !backFile.file)) {
      toast({
        title: "Faltan archivos",
        description: documentType === "dni" 
          ? "Por favor sube ambas caras de tu DNI" 
          : "Por favor sube la imagen de tu documento",
        variant: "destructive",
      });
      return;
    }

    setUploadStatus('uploading');
    
    setTimeout(() => {
      setUploadStatus('success');
      toast({
        title: "Verificación en proceso",
        description: "Tu documento se está revisando. Te notificaremos por email cuando esté verificado.",
      });
      setTimeout(() => {
        onOpenChange(false);
        setFrontFile({ file: null, preview: null });
        setBackFile({ file: null, preview: null });
        setUploadStatus('idle');
        form.reset();
      }, 2000);
    }, 2000);
  };

  const resetForm = () => {
    if (frontFile.preview) URL.revokeObjectURL(frontFile.preview);
    if (backFile.preview) URL.revokeObjectURL(backFile.preview);
    setFrontFile({ file: null, preview: null });
    setBackFile({ file: null, preview: null });
    form.reset();
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpen) => {
        if (!newOpen) resetForm();
        onOpenChange(newOpen);
      }}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Verificación de Identidad</DialogTitle>
          <DialogDescription className="text-base">
            Para garantizar la seguridad de nuestra comunidad, necesitamos verificar tu identidad
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6">
            <DocumentTypeSelector form={form} />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sube imágenes de tu {documentType === "dni" ? "DNI" : "Pasaporte/NIE"}</h3>
              
              <DocumentUploader
                title={documentType === "dni" ? "Parte frontal del DNI" : "Página principal con foto"}
                file={frontFile}
                setFile={setFrontFile}
                disabled={uploadStatus === 'uploading'}
              />

              {documentType === "dni" ? (
                <DocumentUploader
                  title="Parte trasera del DNI"
                  file={backFile}
                  setFile={setBackFile}
                  disabled={uploadStatus === 'uploading'}
                />
              ) : (
                <DocumentUploader
                  title="Documento adicional (opcional)"
                  file={backFile}
                  setFile={setBackFile}
                  disabled={uploadStatus === 'uploading'}
                />
              )}
            </div>

            <DocumentRequirements />

            <div className="flex justify-end gap-3 pt-4 border-t">
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
                disabled={
                  uploadStatus === 'uploading' || 
                  uploadStatus === 'success' || 
                  !frontFile.file || 
                  (documentType === "dni" && !backFile.file)
                }
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default IdentityVerificationModal;
