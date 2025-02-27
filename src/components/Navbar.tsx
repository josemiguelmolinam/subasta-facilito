
import { Button } from "@/components/ui/button";
import { LogIn, Gavel, User, Settings, MessageSquare, Bell, LogOut } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleNotificationsClick = () => {
    toast({
      title: "Próximamente",
      description: "Las notificaciones estarán disponibles pronto",
    });
  };

  const handleMessagesClick = () => {
    toast({
      title: "Próximamente",
      description: "Los mensajes estarán disponibles pronto",
    });
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-auction-soft">
        <div className="ml-4 container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            {/* Logo Mejorado y Profesional */}
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  {/* Contenedor principal del logo */}
                  <div className="h-12 w-12 bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary rounded-xl p-0.5 transition-all duration-300 group-hover:scale-105">
                    {/* Fondo interno del logo */}
                    <div className="h-full w-full bg-white rounded-[9px] flex items-center justify-center">
                      {/* Icono del martillo */}
                      <Gavel className="h-7 w-7 text-auction-primary" />
                    </div>
                  </div>
                </div>
                
                {/* Texto del logo */}
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-auction-primary">
                    Subastalo
                  </span>
                  <span className="text-sm text-auction-secondary">
                    Tu plataforma líder en subastas
                  </span>
                </div>
              </a>
            </div>

            {/* Contenido del Navbar */}
            <div className="flex items-center w-full justify-center md:justify-between">
              {/* SearchBar */}
              <div className="hidden md:block w-[600px] ml-[350px]">
                <SearchBar />
              </div>

              {/* Botones */}
              <div className="flex items-center space-x-12">
                {!user ? (
                  <>
                    <Button
                      className="group flex items-center gap-2 px-2 py-2 text-sm font-bold bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary text-white rounded-md shadow-md hover:shadow-auction-primary/50 transition-all duration-300"
                      onClick={() => navigate("/register")}
                      style={{ marginLeft: "55px" }}
                    >
                      <LogIn className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      Inicia sesión o Regístrate
                    </Button>

                    <Button
                      className="group flex items-center gap-2 px-4 py-2 text-sm font-bold bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary text-white rounded-md shadow-md hover:shadow-auction-primary/50 transition-all duration-300"
                      onClick={() => navigate("/register")}
                    >
                      <Gavel className="h-4 w-4 text-white transform transition-transform duration-300 group-hover:rotate-[-20deg]" />
                      Subastalo
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="group flex ml-20 items-center gap-2 px-4 py-2 font-bold text-lg bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary text-white rounded-lg shadow-lg transition-all duration-300 hover:from-auction-tertiary hover:via-auction-secondary hover:to-auction-primary hover:shadow-auction-primary/50"
                      onClick={() => navigate("/auctions/create")}
                    >
                      <Gavel className="h-4 w-4 text-white transform transition-transform duration-300 group-hover:rotate-[-20deg]" />
                      Subastalo
                    </Button>

                    {/* Menú de perfil */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="relative h-12 w-12 rounded-full"
                          style={{ marginLeft: "150px" }}
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              <User className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64 mt-2" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-auction-soft transition-colors"
                            onClick={() => navigate("/profile")}
                          >
                            <User className="mr-2 h-4 w-4 text-auction-primary" />
                            <span>Mi Perfil</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-auction-soft transition-colors"
                            onClick={() => navigate("/profile/settings")}
                          >
                            <Settings className="mr-2 h-4 w-4 text-auction-secondary" />
                            <span>Configuración</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-auction-soft transition-colors"
                            onClick={handleMessagesClick}
                          >
                            <MessageSquare className="mr-2 h-4 w-4 text-auction-tertiary" />
                            <span>Mensajes</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-auction-soft transition-colors"
                            onClick={handleNotificationsClick}
                          >
                            <Bell className="mr-2 h-4 w-4 text-auction-primary" />
                            <span>Notificaciones</span>
                            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              3
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => logout()}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Cerrar sesión</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <MobileNav />
    </>
  );
};
