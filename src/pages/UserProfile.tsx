import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  User, Building2, Edit2, MapPin, Calendar, Shield, 
  Activity, Star, Lock, LogOut, Package, Clock,
  CheckCircle2, XCircle, AlertCircle
} from "lucide-react";
import { useState } from "react";

const UserProfile = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [verificationProgress] = useState(66); // Example: 2 of 3 steps completed

  if (!user) {
    navigate("/login");
    return null;
  }

  const stats = [
    {
      icon: Activity,
      label: "Subastas Activas",
      value: "5 en curso",
      color: "text-blue-500"
    },
    {
      icon: Package,
      label: "Transacciones",
      value: "15 completadas",
      color: "text-green-500"
    },
    {
      icon: Star,
      label: "Valoración",
      value: "4.8/5",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      label: "Seguridad",
      value: "Alto",
      color: "text-purple-500"
    }
  ];

  const verificationSteps = [
    {
      title: "Email verificado",
      status: user.verificationStatus.email ? "completed" : "pending",
      icon: user.verificationStatus.email ? CheckCircle2 : AlertCircle
    },
    {
      title: "Identidad verificada",
      status: user.verificationStatus.identity ? "completed" : "pending",
      icon: user.verificationStatus.identity ? CheckCircle2 : AlertCircle
    },
    {
      title: "Verificación facial",
      status: user.verificationStatus.facial ? "completed" : "pending",
      icon: user.verificationStatus.facial ? CheckCircle2 : AlertCircle
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Header Section with Background */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary" />
          
          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent text-white">
            <div className="flex items-end gap-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-auction-primary text-xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Madrid, España</span>
                  <Calendar className="h-4 w-4 ml-4" />
                  <span className="text-sm">Usuario desde enero 2024</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="bg-white hover:bg-gray-100"
                onClick={() => navigate("/profile/edit")}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow rounded-lg">
            <TabsTrigger value="summary">Resumen</TabsTrigger>
            <TabsTrigger value="auctions">Mis Subastas</TabsTrigger>
            <TabsTrigger value="verification">Verificación</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-3 bg-gray-100 ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-xl font-bold">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Último inicio de sesión</p>
                      <p className="text-sm text-gray-500">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Auctions Tab */}
          <TabsContent value="auctions">
            <Card>
              <CardHeader>
                <CardTitle>Mis Subastas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  No tienes subastas activas en este momento
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Verificación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Progreso de verificación
                    </span>
                    <span className="text-sm text-gray-500">
                      {verificationProgress}%
                    </span>
                  </div>
                  <Progress value={verificationProgress} className="h-2" />
                </div>

                <div className="space-y-4">
                  {verificationSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className={`rounded-full p-2 ${
                        step.status === "completed" 
                          ? "bg-green-100 text-green-600" 
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{step.title}</p>
                        <p className="text-sm text-gray-500">
                          {step.status === "completed" 
                            ? "Verificado" 
                            : "Pendiente de verificación"}
                        </p>
                      </div>
                      {step.status !== "completed" && (
                        <Button variant="outline" size="sm">
                          Verificar
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Seguridad de la cuenta</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/profile/edit")}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Configurar autenticación en dos pasos
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sesión</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar sesión
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default UserProfile;