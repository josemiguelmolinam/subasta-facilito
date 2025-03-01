import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUp, CheckCircle2, AlertCircle, Loader2, CreditCard, FileText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface IdentityVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  documentType: z.enum(["dni", "passport"], {
    required_error: "Por favor selecciona un tipo de documento",
  }),
});

type DocumentFile = {
  file: File | null;
  preview: string | null;
};

const IdentityVerificationModal = ({ open, onOpenChange }: IdentityVerificationModalProps) => {
  const [frontFile, setFrontFile] = useState<DocumentFile>({ file: null, preview: null });
  const [backFile, setBackFile] = useState<DocumentFile>({ file: null, preview: null });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentType: "dni",
    },
  });

  const documentType = form.watch("documentType");

  const handleFileSelect = (side: 'front' | 'back') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "Archivo demasiado grande",
        description: "El archivo no debe superar los 5MB",
        variant: "destructive",
      });
      return;
    }

    const preview = URL.createObjectURL(file);
    
    if (side === 'front') {
      setFrontFile({ file, preview });
    } else {
      setBackFile({ file, preview });
    }
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Verificación de Identidad</DialogTitle>
          <DialogDescription className="text-base">
            Para garantizar la seguridad de nuestra comunidad, necesitamos verificar tu identidad
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="documentType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base font-medium">Selecciona tu documento de identidad</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className={cn(
                            "flex items-center space-x-2 rounded-lg border-2 p-4 cursor-pointer transition-all",
                            field.value === "dni" 
                              ? "border-primary bg-primary/5" 
                              : "border-gray-200 hover:border-primary/50 hover:bg-muted/20"
                          )}>
                            <RadioGroupItem value="dni" id="dni" className="sr-only" />
                            <div className="flex flex-col items-center w-full">
                              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                <CreditCard className="w-8 h-8 text-primary" />
                              </div>
                              <FormLabel htmlFor="dni" className="font-semibold cursor-pointer text-center">
                                DNI
                              </FormLabel>
                              <p className="text-sm text-gray-500 text-center mt-1">
                                Documento Nacional de Identidad (ambas caras)
                              </p>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>

                      <FormItem className="flex-1">
                        <FormControl>
                          <div className={cn(
                            "flex items-center space-x-2 rounded-lg border-2 p-4 cursor-pointer transition-all",
                            field.value === "passport" 
                              ? "border-primary bg-primary/5" 
                              : "border-gray-200 hover:border-primary/50 hover:bg-muted/20"
                          )}>
                            <RadioGroupItem value="passport" id="passport" className="sr-only" />
                            <div className="flex flex-col items-center w-full">
                              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                <FileText className="w-8 h-8 text-primary" />
                              </div>
                              <FormLabel htmlFor="passport" className="font-semibold cursor-pointer text-center">
                                Pasaporte / NIE
                              </FormLabel>
                              <p className="text-sm text-gray-500 text-center mt-1">
                                Pasaporte o Número de Identidad de Extranjero
                              </p>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sube imágenes de tu {documentType === "dni" ? "DNI" : "Pasaporte/NIE"}</h3>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  {documentType === "dni" ? "Parte frontal del DNI" : "Página principal con foto"}
                </p>
                <div className={cn(
                  "border-2 border-dashed rounded-lg transition-all h-[180px] relative",
                  frontFile.preview 
                    ? "border-primary/50 bg-muted/30" 
                    : "border-gray-200 hover:border-primary/50 hover:bg-muted/50 group cursor-pointer"
                )}>
                  {frontFile.preview ? (
                    <div className="relative h-full w-full">
                      <img 
                        src={frontFile.preview} 
                        alt="Vista previa del documento" 
                        className="h-full w-full object-contain p-2"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
                        onClick={() => {
                          URL.revokeObjectURL(frontFile.preview!);
                          setFrontFile({ file: null, preview: null });
                        }}
                      >
                        <AlertCircle className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-full cursor-pointer p-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <FileUp className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-center mb-1">Haz clic para subir o arrastra tu archivo aquí</p>
                      <p className="text-xs text-gray-500 text-center">PNG, JPG o PDF hasta 5MB</p>
                      <input
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileSelect('front')}
                        disabled={uploadStatus === 'uploading'}
                      />
                    </label>
                  )}
                </div>
              </div>

              {documentType === "dni" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Parte trasera del DNI</p>
                  <div className={cn(
                    "border-2 border-dashed rounded-lg transition-all h-[180px] relative",
                    backFile.preview 
                      ? "border-primary/50 bg-muted/30" 
                      : "border-gray-200 hover:border-primary/50 hover:bg-muted/50 group cursor-pointer"
                  )}>
                    {backFile.preview ? (
                      <div className="relative h-full w-full">
                        <img 
                          src={backFile.preview} 
                          alt="Vista previa del reverso del documento" 
                          className="h-full w-full object-contain p-2"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
                          onClick={() => {
                            URL.revokeObjectURL(backFile.preview!);
                            setBackFile({ file: null, preview: null });
                          }}
                        >
                          <AlertCircle className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-full cursor-pointer p-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                          <FileUp className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-center mb-1">Haz clic para subir o arrastra tu archivo aquí</p>
                        <p className="text-xs text-gray-500 text-center">PNG, JPG o PDF hasta 5MB</p>
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileSelect('back')}
                          disabled={uploadStatus === 'uploading'}
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}

              {documentType === "passport" && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Documento adicional (opcional)</p>
                  <div className={cn(
                    "border-2 border-dashed rounded-lg transition-all h-[180px] relative",
                    backFile.preview 
                      ? "border-primary/50 bg-muted/30" 
                      : "border-gray-200 hover:border-primary/50 hover:bg-muted/50 group cursor-pointer"
                  )}>
                    {backFile.preview ? (
                      <div className="relative h-full w-full">
                        <img 
                          src={backFile.preview} 
                          alt="Vista previa del documento adicional" 
                          className="h-full w-full object-contain p-2"
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
                          onClick={() => {
                            URL.revokeObjectURL(backFile.preview!);
                            setBackFile({ file: null, preview: null });
                          }}
                        >
                          <AlertCircle className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center h-full cursor-pointer p-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                          <FileUp className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-center mb-1">Haz clic para subir o arrastra tu archivo aquí</p>
                        <p className="text-xs text-gray-500 text-center">PNG, JPG o PDF hasta 5MB</p>
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileSelect('back')}
                          disabled={uploadStatus === 'uploading'}
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>

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
