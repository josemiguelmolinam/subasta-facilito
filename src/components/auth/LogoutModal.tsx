
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, LogOut, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(7);

  useEffect(() => {
    if (isOpen) {
      // Auto-close and redirect after 7 seconds
      const redirectTimer = setTimeout(() => {
        onClose();
        navigate('/');
      }, 7000);

      // Progress bar animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) return 0;
          return prev - (100 / 70); // 100% divided by 70 (10 steps per second for 7 seconds)
        });
      }, 100);

      // Countdown timer
      const countdownInterval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(redirectTimer);
        clearInterval(progressInterval);
        clearInterval(countdownInterval);
      };
    }
  }, [isOpen, navigate, onClose]);

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-2">
          <div className="absolute right-4 top-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-6 w-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <DialogTitle className="text-xl font-semibold text-center">
            Cerrando sesión
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-6">
          {/* Icon with pulse animation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary p-4 rounded-full">
              <LogOut className="h-12 w-12 text-white" />
            </div>
          </div>

          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <p className="font-medium">Sesión cerrada exitosamente</p>
            </div>
            
            <p className="text-gray-600">
              Gracias por usar Subastalo. ¡Te esperamos pronto!
            </p>
            
            <div className="text-sm text-gray-500">
              Redirigiendo en {timeRemaining} segundos...
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary"
              style={{ width: `${progress}%`, transition: 'width 100ms linear' }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
