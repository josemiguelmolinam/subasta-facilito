
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
      <DialogContent className="sm:max-w-md bg-[#1A1F2C]/95 backdrop-blur-lg text-white border-none shadow-2xl">
        <DialogHeader className="space-y-2">
          <div className="absolute right-4 top-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-6 w-6 rounded-full hover:bg-white/10 transition-colors duration-300 text-white"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/80">
            Cerrando sesión
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-8 py-6">
          {/* Icon with animated background */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary rounded-full blur-xl opacity-80 ${animateIcon ? 'animate-pulse' : 'opacity-0'} transition-opacity duration-500`}></div>
            <div className={`relative bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary p-5 rounded-full transform transition-all duration-700 ${animateIcon ? 'scale-100 rotate-0' : 'scale-90 rotate-[-10deg]'} shadow-[0_0_30px_rgba(155,135,245,0.5)]`}>
              <LogOut className="h-14 w-14 text-white" />
            </div>
          </div>

          <div className="space-y-5 text-center max-w-xs mx-auto">
            <div className={`flex items-center justify-center space-x-2 text-green-400 transform transition-all duration-500 ${animateIcon ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <CheckCircle className={`h-5 w-5 transition-transform duration-500 ${animateIcon ? 'scale-100' : 'scale-0'}`} />
              <p className="font-semibold">Sesión cerrada exitosamente</p>
            </div>
            
            <p className={`text-gray-300 transition-all duration-500 delay-100 ${animateIcon ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Gracias por usar Subastalo. ¡Te esperamos pronto!
            </p>
            
            <div className={`text-sm text-gray-400 transition-all duration-500 delay-200 ${animateIcon ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Redirigiendo en <span className="font-semibold text-white">{timeRemaining}</span> segundos...
            </div>
          </div>

          {/* Animated Progress bar */}
          <div className="w-full overflow-hidden rounded-full h-2.5 bg-gray-800/80 ring-1 ring-white/10">
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
