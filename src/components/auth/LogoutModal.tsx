
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
import { Progress } from "@/components/ui/progress";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(7);
  const [animateIcon, setAnimateIcon] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Set animation delay
      setTimeout(() => {
        setAnimateIcon(true);
      }, 500);

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
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-gray-900 to-gray-800 text-white border-none shadow-2xl">
        <DialogHeader className="space-y-2">
          <div className="absolute right-4 top-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-6 w-6 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <DialogTitle className="text-xl font-semibold text-center text-white">
            Cerrando sesión
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-6">
          {/* Icon with animated background */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary rounded-full blur-lg opacity-75 ${animateIcon ? 'animate-pulse' : 'opacity-0'} transition-opacity duration-500`}></div>
            <div className={`relative bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary p-4 rounded-full transform transition-all duration-700 ${animateIcon ? 'scale-100 rotate-0' : 'scale-90 rotate-[-10deg]'}`}>
              <LogOut className="h-12 w-12 text-white" />
            </div>
          </div>

          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <CheckCircle className={`h-5 w-5 transition-transform duration-500 ${animateIcon ? 'scale-100' : 'scale-0'}`} />
              <p className="font-medium">Sesión cerrada exitosamente</p>
            </div>
            
            <p className="text-gray-300">
              Gracias por usar Subastalo. ¡Te esperamos pronto!
            </p>
            
            <div className="text-sm text-gray-400">
              Redirigiendo en <span className="font-semibold text-white">{timeRemaining}</span> segundos...
            </div>
          </div>

          {/* Animated Progress bar */}
          <div className="w-full overflow-hidden rounded-full h-2 bg-gray-700/50">
            <div 
              className="h-full bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary relative"
              style={{ width: `${progress}%`, transition: 'width 100ms linear' }}
            >
              <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]" style={{ 
                backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                backgroundSize: '200% 100%'
              }}></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
