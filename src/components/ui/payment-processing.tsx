
import React from "react";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/loader";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CreditCard, ShieldCheck, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PaymentProcessingProps {
  isProcessing: boolean;
  className?: string;
}

export function PaymentProcessing({
  isProcessing,
  className,
}: PaymentProcessingProps) {
  const [progress, setProgress] = React.useState(0);
  const [stage, setStage] = React.useState(0);
  
  const stages = [
    "Conectando con el servidor seguro...",
    "Verificando información de pago...",
    "Procesando transacción...",
    "Confirmando pago..."
  ];

  React.useEffect(() => {
    if (!isProcessing) {
      setProgress(0);
      setStage(0);
      return;
    }

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + 1, 100);
        
        // Cambiar de etapa basado en el progreso
        if (newProgress >= 25 && newProgress < 50 && stage !== 1) {
          setStage(1);
        } else if (newProgress >= 50 && newProgress < 75 && stage !== 2) {
          setStage(2);
        } else if (newProgress >= 75 && stage !== 3) {
          setStage(3);
        }
        
        return newProgress;
      });
    }, 80);

    return () => {
      clearInterval(timer);
    };
  }, [isProcessing, stage]);

  if (!isProcessing) return null;

  return (
    <AnimatePresence>
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md",
            className
          )}
        >
          <div className="max-w-md w-full px-6 py-8 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
              className="mb-8 relative"
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-auction-primary/20 animate-ping" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-auction-primary/30 border-t-auction-primary"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white mb-4 text-center"
            >
              Procesando pago...
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full mb-8"
            >
              <Progress value={progress} className="h-2 bg-white/10" />
              <div className="mt-2 text-sm text-white/60 text-center">
                {progress}%
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/80 text-center mb-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg"
                >
                  {stages[stage]}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center space-x-6 text-white/60"
            >
              <div className="flex flex-col items-center">
                <Lock className="h-5 w-5 mb-2" />
                <span className="text-xs">Conexión Segura</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="h-5 w-5 mb-2" />
                <span className="text-xs">Datos Protegidos</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle2 className="h-5 w-5 mb-2" />
                <span className="text-xs">Verificado</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 flex justify-center"
            >
              <div className="relative w-32 h-8">
                <div className="absolute inset-0 w-full h-full bg-white/5 rounded-md overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/4 bg-white/10 animate-scan" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-white/40">Transacción segura</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
