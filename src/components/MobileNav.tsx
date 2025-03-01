
import { Home, Wallet, User, ShoppingBag, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";

export const MobileNav = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-auction-soft md:hidden z-40">
      <div className="flex justify-around items-center h-16 px-4">
        <NavItem 
          icon={<Home size={20} />} 
          label="Inicio" 
          href="/" 
          active={isActive('/')}
        />
        <NavItem 
          icon={<Wallet size={20} />} 
          label="Billetera" 
          href="/wallet" 
          active={isActive('/wallet')}
        />
        <NavItem 
          icon={<ShoppingBag size={20} />} 
          label="Compras" 
          href="/purchases" 
          active={isActive('/purchases')}
        />
        <NavItem 
          icon={<User size={20} />} 
          label="Perfil" 
          href="/profile" 
          active={isActive('/profile')}
        />
        <NavItem 
          icon={<Zap size={20} className={isActive('/auctions') ? "text-auction-primary" : ""} />} 
          label="Subastas" 
          href="/auctions" 
          active={isActive('/auctions')}
        />
      </div>
    </nav>
  );
};

const NavItem = ({ 
  icon, 
  label, 
  href,
  active = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  href: string;
  active?: boolean;
}) => {
  return (
    <a 
      href={href}
      className={cn(
        "flex flex-col items-center justify-center space-y-1 text-xs",
        "transition-colors duration-200",
        active 
          ? "text-auction-primary" 
          : "text-auction-dark hover:text-auction-primary"
      )}
    >
      {icon}
      <span className="text-xs truncate">{label}</span>
    </a>
  );
};
