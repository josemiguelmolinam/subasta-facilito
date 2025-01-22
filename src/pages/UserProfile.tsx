import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Loader2, Edit2, Lock, LogOut, Activity, Star } from "lucide-react";

const UserProfile = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-auction-primary to-auction-secondary">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 mt-16">
        {/* Tarjeta principal */}
        <Card className="max-w-5xl mx-auto overflow-hidden shadow-xl bg-gradient-to-br from-white to-gray-50 rounded-2xl border">
          {/* Sección superior con animación */}
          <div
            className="relative h-36 bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary animate-gradient-smooth"
            style={{
              backgroundSize: "300% 300%",
              animation: "gradientSmooth 10s ease infinite",
            }}
          >
            {/* Avatar flotante */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <Avatar className="h-28 w-28 border-4 border-white shadow-lg rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-auction-primary text-white text-3xl font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Información del usuario */}
          <CardHeader className="mt-20 text-center px-6">
            <CardTitle className="text-3xl font-bold text-gray-800">{user.name}</CardTitle>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex justify-center space-x-4 mt-4">
              
            </div>
          </CardHeader>

          {/* Contenido principal */}
          <CardContent className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              {/* Lista de tabs */}
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-lg p-1 shadow-sm">
                <TabsTrigger value="overview" className="rounded-md">
                  Resumen
                </TabsTrigger>
                <TabsTrigger value="auctions" className="rounded-md">
                  Mis Subastas
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-md">
                  Configuración
                </TabsTrigger>
              </TabsList>

              {/* Resumen */}
              <TabsContent value="overview" className="space-y-6 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-gray-100 to-gray-50 p-4 rounded-lg shadow-md">
                    <Activity className="h-10 w-10 text-auction-primary" />
                    <h3 className="text-lg font-semibold mt-4">Subastas Activas</h3>
                    <p className="text-2xl font-bold">5</p>
                  </Card>
                  <Card className="bg-gradient-to-br from-gray-100 to-gray-50 p-4 rounded-lg shadow-md">
                    <Star className="h-10 w-10 text-auction-secondary" />
                    <h3 className="text-lg font-semibold mt-4">Valoraciones</h3>
                    <p className="text-2xl font-bold">4.8/5</p>
                  </Card>
                  <Card className="bg-gradient-to-br from-gray-100 to-gray-50 p-4 rounded-lg shadow-md">
                    <Lock className="h-10 w-10 text-auction-tertiary" />
                    <h3 className="text-lg font-semibold mt-4">Seguridad</h3>
                    <p className="text-2xl font-bold">Alta</p>
                  </Card>
                </div>
              </TabsContent>

              {/* Mis Subastas */}
              <TabsContent value="auctions" className="space-y-6 pt-6">
                <h3 className="text-lg font-semibold text-gray-800">Subastas Activas</h3>
                <div className="bg-gray-50 border rounded-md p-4 text-gray-600 text-center">
                  No tienes subastas activas.
                </div>
              </TabsContent>

              {/* Configuración */}
            {/* Configuración */}
<TabsContent value="settings" className="space-y-6 pt-6">
  <div className="flex items-center justify-center gap-4">
    {/* Botón para editar perfil */}
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 hover:bg-auction-soft hover:text-auction-primary"
      onClick={() => navigate("/profile/edit")}
    >
      <Edit2 className="h-4 w-4" />
      Editar Perfil
    </Button>

    {/* Botón para cerrar sesión */}
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 hover:bg-red-100 hover:text-red-600"
      onClick={() => logout()}
    >
      <LogOut className="h-4 w-4" />
      Cerrar Sesión
    </Button>
  </div>
</TabsContent>

            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UserProfile;
