
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, FileUp, CreditCard, FileText } from "lucide-react";
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
  documentType?: "dni" | "passport";
  side?: "front" | "back";
}

const DocumentUploader = ({ 
  title, 
  file, 
  setFile, 
  disabled = false,
  documentType = "dni",
  side = "front"
}: DocumentUploaderProps) => {
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

  // Determine which document placeholder to show
  const renderPlaceholder = () => {
    if (documentType === "dni") {
      return (
        <div className={`w-full h-full flex items-center justify-center 
                        ${side === "front" ? "bg-blue-50" : "bg-blue-50"} 
                        rounded-lg relative overflow-hidden border-2 border-dashed border-gray-300`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            {side === "front" ? (
              <div className="w-full h-full flex flex-col">
                <div className="h-1/4 border-b border-gray-400 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
                  <div className="h-20 bg-gray-300 rounded w-full mt-6"></div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col p-4">
                <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/6 mb-10"></div>
                <div className="h-16 bg-gray-300 rounded w-full"></div>
              </div>
            )}
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
            <CreditCard className="w-10 h-10 text-primary mb-3" />
            <p className="text-sm font-medium mb-1">{side === "front" ? "Parte frontal del DNI" : "Parte trasera del DNI"}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full flex items-center justify-center bg-indigo-50 rounded-lg relative overflow-hidden border-2 border-dashed border-gray-300">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-full h-full flex flex-col p-4">
              <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
              <div className="h-24 bg-gray-300 rounded w-full mb-6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/6 mb-4"></div>
              <div className="h-16 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
            <FileText className="w-10 h-10 text-primary mb-3" />
            <p className="text-sm font-medium mb-1">Página principal del Pasaporte</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <div className={cn(
        "transition-all h-[180px] relative rounded-lg overflow-hidden",
        file.preview 
          ? "border-primary/50 bg-muted/30" 
          : "hover:border-primary/50 hover:bg-muted/50 group cursor-pointer"
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
          <label className="flex flex-col items-center justify-center h-full cursor-pointer">
            {renderPlaceholder()}
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
