
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

interface RegistrationSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

const RegistrationSuccessModal = ({
  open,
  onOpenChange,
  email
}: RegistrationSuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Encabezado con gradiente */}
            <div className="relative h-32 bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-primary bg-[size:200%] animate-gradient-smooth">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Mail className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 pt-8">
              <h2 className="text-2xl font-bold text-center mb-4">
                ¡Registro Exitoso!
              </h2>
              
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Hemos enviado un correo de verificación a:
                </p>
                <p className="font-medium text-lg text-auction-primary">
                  {email}
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Por favor, revisa tu bandeja de entrada y sigue las instrucciones para verificar tu cuenta.
                </p>
              </div>

              {/* Timeline de pasos */}
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-sm font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Revisa tu email</h3>
                    <p className="text-sm text-gray-500">
                      Busca el correo de verificación en tu bandeja de entrada
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Confirma tu cuenta</h3>
                    <p className="text-sm text-gray-500">
                      Haz clic en el botón de verificación del correo
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-sm font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">¡Comienza a explorar!</h3>
                    <p className="text-sm text-gray-500">
                      Disfruta de todas las funcionalidades de la plataforma
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-8 flex flex-col gap-3">
                <Button 
                  className="w-full" 
                  onClick={() => onOpenChange(false)}
                >
                  Entendido
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://gmail.com', '_blank')}
                >
                  Abrir Gmail
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationSuccessModal;
