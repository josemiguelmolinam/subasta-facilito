
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Apple, Smartphone } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const WalletPayment = () => {
  const { toast } = useToast();
  
  const handleWalletPayment = (walletType: 'apple' | 'google') => {
    toast({
      title: `${walletType === 'apple' ? 'Apple Pay' : 'Google Pay'} seleccionado`,
      description: "Esta función estará disponible próximamente.",
      variant: "default"
    });
  };
  
  return (
    <motion.div 
      className="mt-6 p-6 border border-gray-200 rounded-xl space-y-6 bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={() => handleWalletPayment('apple')}
          className="bg-black hover:bg-gray-800 text-white px-6 py-6 rounded-xl flex items-center justify-center space-x-2 w-full"
        >
          <Apple className="h-8 w-8 text-white" />
        </Button>
        
        <Button 
          onClick={() => handleWalletPayment('google')}
          className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-6 rounded-xl flex items-center justify-center space-x-2 w-full"
        >
          <Smartphone className="h-8 w-8 text-blue-500" />
        </Button>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        <p>Paga de forma rápida y segura con tu dispositivo.</p>
        <p className="mt-1">No es necesario introducir los datos de tu tarjeta.</p>
      </div>
    </motion.div>
  );
};
