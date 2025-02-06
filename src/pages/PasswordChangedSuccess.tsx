import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const PasswordChangedSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "¡Contraseña Actualizada!",
      description: "Tu contraseña ha sido cambiada exitosamente",
    });
  }, [toast]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-auction-soft to-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex flex-col items-center space-y-6">
              {/* Icono animado */}
              <motion.div 
                className="w-20 h-20 bg-auction-soft rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              >
                <ShieldCheck className="h-10 w-10 text-auction-primary" />
              </motion.div>

              {/* Check icon con animación de entrada */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <CheckCircle className="h-8 w-8 text-green-500" />
              </motion.div>

              {/* Texto con animación */}
              <motion.div 
                className="text-center space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-2xl font-bold text-auction-dark bg-gradient-to-r from-auction-primary to-auction-secondary bg-clip-text text-transparent">
                  ¡Contraseña Actualizada!
                </h1>
                <p className="text-gray-600">
                  Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.
                </p>
              </motion.div>

              {/* Botones con hover effects */}
              <div className="w-full space-y-4 pt-4">
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full bg-auction-primary hover:bg-auction-secondary transition-all duration-300 transform hover:scale-105"
                >
                  Iniciar Sesión
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="w-full hover:bg-auction-soft transition-all duration-300"
                >
                  Volver al Inicio
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PasswordChangedSuccess;