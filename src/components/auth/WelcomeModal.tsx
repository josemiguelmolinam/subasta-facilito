
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PartyPopper } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const WelcomeModal = ({ isOpen, onClose, userName }: WelcomeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center space-y-6 py-6">
          {/* Icono animado */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary p-4 rounded-full">
              <PartyPopper className="h-12 w-12 text-white animate-bounce" />
            </div>
          </div>

          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary bg-clip-text text-transparent">
              ¡Bienvenido/a {userName}!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-600">
              Nos alegra tenerte de vuelta en Subastalo
            </p>
            <div className="bg-auction-soft/30 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-auction-primary">Acceso rápido:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>🎯 Explora las subastas activas</li>
                <li>📦 Revisa tus últimas ofertas</li>
                <li>🌟 Descubre artículos destacados</li>
              </ul>
            </div>
          </div>

          <div className="relative w-full h-1 bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-white/20 animate-scan"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
