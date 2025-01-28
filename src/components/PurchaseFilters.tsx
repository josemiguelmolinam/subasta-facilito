import { Button } from '@/components/ui/button';

interface PurchaseFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export const PurchaseFilters = ({ currentFilter, onFilterChange }: PurchaseFiltersProps) => {
  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'last-30', label: 'Últimos 30 días' },
    { id: 'last-year', label: 'Último año' },
    { id: 'in-transit', label: 'En tránsito' },
    { id: 'delivered', label: 'Entregados' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={currentFilter === filter.id ? "default" : "outline"}
          onClick={() => onFilterChange(filter.id)}
          className="text-sm"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};