import { Home, Wallet, User, ShoppingBag, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileNav = () => {
  const isLoggedIn = false; // This should be replaced with your actual auth logic

  if (!isLoggedIn) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-auction-soft md:hidden">
      <div className="flex justify-around items-center h-16 px-4">
        <NavItem icon={<Home size={24} />} label="Inicio" href="/" />
        <NavItem icon={<Wallet size={24} />} label="Billetera" href="/wallet" />
        <NavItem icon={<ShoppingBag size={24} />} label="Compras" href="/purchases" />
        <NavItem icon={<User size={24} />} label="Perfil" href="/profile" />
        <NavItem icon={<Zap size={24} className="text-auction-primary" />} label="Subastas" href="/auctions" />
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
        "flex flex-col items-center justify-center space-y-1 text-sm",
        "transition-colors duration-200",
        active 
          ? "text-auction-primary" 
          : "text-auction-dark hover:text-auction-primary"
      )}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </a>
  );
};