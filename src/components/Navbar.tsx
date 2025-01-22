import { Button } from "@/components/ui/button";
import { LogIn, Gavel, User } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-auction-soft">
        <div className=" ml-4 container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2 group">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-auction-primary via-auction-secondary to-auction-tertiary p-1.5 shadow-lg group-hover:shadow-auction-primary/25 transition-all duration-300">
                  <Gavel className="h-full w-full text-white transform group-hover:rotate-[-20deg] transition-all duration-300" />
                </div>
                <span
                  className="text-3xl font-bold bg-gradient-to-r from-auction-primary via-auction-secondary to-auction-tertiary
                    bg-[length:400%_400%] bg-clip-text text-transparent
                    animate-gradient-bold hover:animate-none
                    hover:from-auction-tertiary hover:via-auction-secondary hover:to-auction-primary transition-all duration-700"
                    style={{ marginLeft: "14px" }}
                >
                  Subastalo
                </span>
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

      {/* Botón "Subastalo" que manda al registro */}
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
        <Gavel className="h-4 w-4 text-white transform transition-transform duration-300 group-hover:rotate-[-20deg]"/>
       
        Subastalo
      </Button>

      {/* Avatar del usuario */}
      <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="relative h-12 w-12 rounded-full bg-auction-soft hover:bg-auction-primary/10"
      style={{ marginLeft: "150px" }}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>
          <User className="h-4 w-4 text-auction-primary" />
        </AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56" align="end" forceMount>
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{user.name}</p>
        <p className="text-xs leading-none text-muted-foreground">
          {user.email}
        </p>
      </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => navigate("/profile")}>
      Mi Perfil
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => logout()}>
      Cerrar sesión
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
