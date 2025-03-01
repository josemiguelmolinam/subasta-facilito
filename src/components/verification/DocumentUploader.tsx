
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, FileUp } from "lucide-react";
import { useState } from "react";

export type DocumentFile = {
  file: File | null;
  preview: string | null;
};

interface DocumentUploaderProps {
  title: string;
  file: DocumentFile;
  setFile: (file: DocumentFile) => void;
  disabled?: boolean;
}

const DocumentUploader = ({ title, file, setFile, disabled = false }: DocumentUploaderProps) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    
    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
      // We'll let the parent component handle toast notifications
      return;
    }

    const preview = URL.createObjectURL(selectedFile);
    setFile({ file: selectedFile, preview });
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <div className={cn(
        "border-2 border-dashed rounded-lg transition-all h-[180px] relative",
        file.preview 
          ? "border-primary/50 bg-muted/30" 
          : "border-gray-200 hover:border-primary/50 hover:bg-muted/50 group cursor-pointer"
      )}>
        {file.preview ? (
          <div className="relative h-full w-full">
            <img 
              src={file.preview} 
              alt="Vista previa del documento" 
              className="h-full w-full object-contain p-2"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
              onClick={() => {
                URL.revokeObjectURL(file.preview!);
                setFile({ file: null, preview: null });
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
              onChange={handleFileSelect}
              disabled={disabled}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default DocumentUploader;
