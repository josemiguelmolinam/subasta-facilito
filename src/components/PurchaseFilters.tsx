import { Button } from '@/components/ui/button';
import { Calendar, Truck, CreditCard } from 'lucide-react';

interface PurchaseFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export const PurchaseFilters = ({ currentFilter, onFilterChange }: PurchaseFiltersProps) => {
  const filters = [
    { id: 'all', label: 'Todos', icon: null },
    { id: 'last-30', label: 'Últimos 30 días', icon: Calendar },
    { id: 'last-year', label: 'Último año', icon: Calendar },
    { id: 'in-transit', label: 'En tránsito', icon: Truck },
    { id: 'delivered', label: 'Entregados', icon: CreditCard },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <Button
            key={filter.id}
            variant={currentFilter === filter.id ? "default" : "outline"}
            onClick={() => onFilterChange(filter.id)}
            className={`
              text-sm transition-all duration-300 hover:scale-105
              ${currentFilter === filter.id 
                ? 'bg-auction-primary text-white hover:bg-auction-secondary' 
                : 'hover:bg-auction-soft hover:text-auction-primary'}
            `}
          >
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
};