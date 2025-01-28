import { Button } from '@/components/ui/button';
import { Calendar, Truck, CreditCard, Filter, Clock } from 'lucide-react';

interface PurchaseFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export const PurchaseFilters = ({ currentFilter, onFilterChange }: PurchaseFiltersProps) => {
  const filters = [
    { id: 'all', label: 'Todos', icon: Filter },
    { id: 'last-30', label: 'Últimos 30 días', icon: Clock },
    { id: 'last-year', label: 'Último año', icon: Calendar },
    { id: 'in-transit', label: 'En tránsito', icon: Truck },
    { id: 'delivered', label: 'Entregados', icon: CreditCard },
  ];

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-gradient-to-br from-white to-auction-soft/30 rounded-xl shadow-sm">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = currentFilter === filter.id;
        
        return (
          <Button
            key={filter.id}
            variant={isActive ? "default" : "outline"}
            onClick={() => onFilterChange(filter.id)}
            className={`
              relative group overflow-hidden transition-all duration-500
              ${isActive 
                ? 'bg-gradient-to-r from-auction-primary to-auction-secondary text-white shadow-lg scale-105' 
                : 'hover:bg-auction-soft hover:text-auction-primary hover:scale-105'}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-auction-primary to-auction-secondary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <Icon className={`w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110 ${
              isActive ? 'text-white' : 'text-auction-secondary'
            }`} />
            <span className="relative z-10">{filter.label}</span>
          </Button>
        );
      })}
    </div>
  );
};