
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginAlertEmailTemplate } from "@/components/email-templates/LoginAlertEmailTemplate";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmailTemplateDemo = () => {
  const [activeTab, setActiveTab] = useState<string>("successful");
  
  const demoData = {
    ip: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    location: "Madrid, España",
    date: new Date(),
    loginSuccessful: activeTab === "successful"
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Demostración de Plantillas de Correo</h1>
      
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Plantilla de Alerta de Inicio de Sesión</h2>
        
        <Tabs defaultValue="successful" onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="successful">Inicio exitoso</TabsTrigger>
            <TabsTrigger value="suspicious">Intento sospechoso</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mb-4 border rounded-md overflow-hidden">
          <LoginAlertEmailTemplate {...demoData} />
        </div>
        
        <div className="flex justify-center mt-6">
          <Button onClick={() => alert("Esta es solo una demostración. En una implementación real, este correo sería enviado automáticamente.")}>
            Probar envío de correo
          </Button>
        </div>
      </Card>
      
      <div className="mt-10 text-center text-sm text-gray-500">
        <p>Esta es una página de demostración para visualizar las plantillas de correo electrónico.</p>
        <p>En un entorno de producción, estas plantillas se enviarían automáticamente en respuesta a eventos específicos.</p>
      </div>
    </div>
  );
};

export default EmailTemplateDemo;
