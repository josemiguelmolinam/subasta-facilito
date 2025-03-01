
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { CreditCard, FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

export const documentFormSchema = z.object({
  documentType: z.enum(["dni", "passport"], {
    required_error: "Por favor selecciona un tipo de documento",
  }),
});

export type DocumentFormValues = z.infer<typeof documentFormSchema>;

interface DocumentTypeSelectorProps {
  form: UseFormReturn<DocumentFormValues>;
}

const DocumentTypeSelector = ({ form }: DocumentTypeSelectorProps) => {
  return (
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
  );
};

export default DocumentTypeSelector;
