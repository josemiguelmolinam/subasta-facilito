
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProtectionInfoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProtectionInfo = ({ open, onOpenChange }: ProtectionInfoProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Protección Subastalo</DialogTitle>
        <DialogDescription className="space-y-4 mt-4">
          <p>Ofrecemos protección completa en:</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Transacciones seguras y verificadas</li>
            <li>Garantía de devolución</li>
            <li>Protección contra fraude</li>
            <li>Seguimiento de envíos en tiempo real</li>
            <li>Verificación de vendedores</li>
            <li>Soporte 24/7</li>
          </ul>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);
