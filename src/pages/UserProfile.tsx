
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
import { ProfileStats } from "@/components/profile/ProfileStats";
import { AuctionsList } from "@/components/profile/AuctionsList";
import { PaymentMethods } from "@/components/profile/PaymentMethods";
import { NotificationSettings } from "@/components/profile/NotificationSettings";
import { useToast } from "@/hooks/use-toast";
import { ProfileCharts } from "@/components/profile/ProfileCharts";
import { QuickActions } from "@/components/profile/QuickActions";
import { auctionData, categoryData } from "@/data/profileData";
import Map from "@/components/Map";
import IdentityVerificationModal from "@/components/verification/IdentityVerificationModal";
import FacialVerificationModal from "@/components/verification/FacialVerificationModal";

const UserProfile = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verificationProgress] = useState(66);
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [showFacialModal, setShowFacialModal] = useState(false);

  // Definir todos los estados al inicio del componente
  const [mockAuctions] = useState([
    {
      id: "1",
      title: "iPhone 15 Pro Max",
      imageUrl: "https://picsum.photos/200/300",
      currentBid: 1200,
      endDate: new Date(Date.now() + 7200000),
      status: 'active' as const
    },
    {
      id: "2",
      title: "MacBook Pro M3",
      imageUrl: "https://picsum.photos/200/301",
      currentBid: 2500,
      endDate: new Date(Date.now() + 3600000),
      status: 'won' as const
    }
  ]);

  const [mockPaymentMethods] = useState([
    {
      id: "1",
      type: 'credit_card' as const,
      last4: "4242",
      brand: "Visa",
      expiryDate: "12/25"
    },
    {
      id: "2",
      type: 'paypal' as const
    }
  ]);

  const [mockNotificationSettings] = useState([
    {
      id: "1",
      type: 'bids' as const,
      email: true,
      push: true
    },
    {
      id: "2",
      type: 'messages' as const,
      email: true,
      push: false
    },
    {
      id: "3",
      type: 'security' as const,
      email: true,
      push: true
    }
  ]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleViewDetails = (id: string) => {
    navigate(`/auction/${id}`);
  };

  const handleContactSeller = (id: string) => {
    toast({
      title: "Contactando al vendedor",
      description: "Se abrirá el chat en breve"
    });
  };

  const handleProcessPayment = (id: string) => {
    navigate(`/payment/${id}`);
  };

  const handleAddPaymentMethod = () => {
    toast({
      title: "Añadir método de pago",
      description: "Se abrirá el formulario en breve"
    });
  };

  const handleRemovePaymentMethod = (id: string) => {
    toast({
      title: "Método de pago eliminado",
      description: "El método de pago ha sido eliminado exitosamente"
    });
  };

  const handleToggleNotification = (id: string, channel: 'email' | 'push') => {
    toast({
      title: "Configuración actualizada",
      description: "Tus preferencias de notificación han sido actualizadas"
    });
  };

  const verificationSteps = [
    {
      title: "Email verificado",
      status: user.verificationStatus.email ? "completed" : "pending",
      icon: user.verificationStatus.email ? CheckCircle2 : AlertCircle,
      onClick: null
    },
    {
      title: "Identidad verificada",
      status: user.verificationStatus.identity ? "completed" : "pending",
      icon: user.verificationStatus.identity ? CheckCircle2 : AlertCircle,
      onClick: () => setShowIdentityModal(true)
    },
    {
      title: "Verificación facial",
      status: user.verificationStatus.facial ? "completed" : "pending",
      icon: user.verificationStatus.facial ? CheckCircle2 : AlertCircle,
      onClick: () => setShowFacialModal(true)
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
            <ProfileStats
              activeAuctions={5}
              completedTransactions={15}
              rating={4.8}
              securityLevel="Alto"
            />

            <QuickActions />

            <ProfileCharts
              auctionData={auctionData}
              categoryData={categoryData}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ubicación</CardTitle>
                </CardHeader>
                <CardContent>
                  <Map 
                    location={{ lat: 40.4168, lng: -3.7038 }} 
                    address="Madrid, España" 
                  />
                </CardContent>
              </Card>

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
            </div>
          </TabsContent>

          {/* Auctions Tab */}
          <TabsContent value="auctions">
            <Card>
              <CardHeader>
                <CardTitle>Mis Subastas</CardTitle>
              </CardHeader>
              <CardContent>
                <AuctionsList
                  auctions={mockAuctions}
                  onViewDetails={handleViewDetails}
                  onContactSeller={handleContactSeller}
                  onProcessPayment={handleProcessPayment}
                />
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
                      {step.status !== "completed" && step.onClick && (
                        <Button variant="outline" size="sm" onClick={step.onClick}>
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
          <TabsContent value="settings" className="space-y-6">
            <PaymentMethods
              methods={mockPaymentMethods}
              balance={1500}
              onAddMethod={handleAddPaymentMethod}
              onRemoveMethod={handleRemovePaymentMethod}
            />

            <NotificationSettings
              settings={mockNotificationSettings}
              onToggle={handleToggleNotification}
            />

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

        {/* Modales de verificación */}
        <IdentityVerificationModal
          open={showIdentityModal}
          onOpenChange={setShowIdentityModal}
        />
        <FacialVerificationModal
          open={showFacialModal}
          onOpenChange={setShowFacialModal}
        />
      </div>
    </MainLayout>
  );
};

export default UserProfile;
