
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Camera, FileUp } from "lucide-react";
import FacialVerificationModal from "@/components/verification/FacialVerificationModal";
import IdentityVerificationModal from "@/components/verification/IdentityVerificationModal";

const VerificationDemo = () => {
  const [facialModalOpen, setFacialModalOpen] = useState(false);
  const [identityModalOpen, setIdentityModalOpen] = useState(false);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Verificación de Identidad</h1>
          <p className="text-gray-600 text-center mb-12">
            Para garantizar la seguridad de nuestra plataforma y de nuestros usuarios, requerimos un proceso de verificación de identidad. Por favor, completa los siguientes pasos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex flex-col items-center gap-4 h-full">
                <div className="rounded-full bg-primary/10 p-4">
                  <FileUp className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Documento de Identidad</h3>
                <p className="text-gray-500 text-center mb-6">
                  Sube una foto de tu DNI, NIE o pasaporte para verificar tu identidad
                </p>
                <Button 
                  onClick={() => setIdentityModalOpen(true)}
                  className="mt-auto"
                >
                  Subir Documento
                </Button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <div className="flex flex-col items-center gap-4 h-full">
                <div className="rounded-full bg-primary/10 p-4">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Verificación Facial</h3>
                <p className="text-gray-500 text-center mb-6">
                  Realiza una verificación facial para confirmar que eres tú quien dice ser
                </p>
                <Button 
                  onClick={() => setFacialModalOpen(true)}
                  className="mt-auto"
                >
                  Iniciar Verificación
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">¿Por qué verificamos tu identidad?</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-600">Para proteger a todos los usuarios de nuestra plataforma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-600">Para prevenir fraudes y actividades sospechosas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-600">Para cumplir con las regulaciones de seguridad financiera</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-gray-600">Para brindarte un entorno de subastas seguro y confiable</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <FacialVerificationModal 
        open={facialModalOpen} 
        onOpenChange={setFacialModalOpen} 
      />
      
      <IdentityVerificationModal 
        open={identityModalOpen} 
        onOpenChange={setIdentityModalOpen} 
      />
    </MainLayout>
  );
};

export default VerificationDemo;
