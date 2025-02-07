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
            {/* Logo Mejorado */}
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2 group relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary p-2 relative transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]">
                    <Gavel className="h-full w-full text-white transform transition-all duration-500 group-hover:rotate-[-20deg] group-hover:scale-110" />
                  </div>
                </div>
                <div className="flex flex-col items-start ml-3">
                  <span className="text-3xl font-playfair font-black bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary bg-clip-text text-transparent relative group-hover:after:w-full after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-auction-primary after:to-auction-tertiary after:w-0 after:transition-all after:duration-500">
                    Subastalo
                  </span>
                  <span className="text-xs font-playfair text-auction-secondary font-medium tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                    SUBASTAS EXCLUSIVAS
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

                    {/* Menú de perfil mejorado */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="relative h-12 w-12 rounded-full bg-auction-soft hover:bg-auction-primary/10 transition-all duration-300"
                          style={{ marginLeft: "150px" }}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              <User className="h-4 w-4 text-white" />
                            </AvatarFallback>
                          </Avatar>
                          {/* Indicador de notificaciones */}
                          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
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