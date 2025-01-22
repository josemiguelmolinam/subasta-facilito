import React, { useState, useEffect } from 'react';
import { Search, X, Heart, Clock, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface RecentSearch {
  id: string;
  text: string;
  favorite: boolean;
}

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in'); // Clase de animación para los artículos dinámicos
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  const placeholders = [
    'Nissan GT-R',
    'iPhone 15 Pro Max',
    'PlayStation 5',
    'MacBook Pro M3',
    'Tesla Model S',
    'Samsung S24 Ultra',
  ];

  // Cambiar los artículos dinámicamente con efecto de desvanecimiento
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('fade-out'); // Aplica desvanecimiento
      setTimeout(() => {
        setPlaceholderIndex((current) => (current + 1) % placeholders.length); // Cambia el artículo
        setFadeClass('fade-in'); // Reaparece con el nuevo artículo
      }, 700); // Duración del desvanecimiento
    }, 2500); // Cambia cada 4 segundos

    return () => clearInterval(interval); 
  }, [placeholders.length]);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = (searchText: string = searchTerm) => {
    if (!searchText.trim()) return;

    const newSearch: RecentSearch = {
      id: Date.now().toString(),
      text: searchText.trim(),
      favorite: false,
    };

    setRecentSearches((prev) => [newSearch, ...prev.slice(0, 4)]);
    setSearchTerm(searchText);

    toast({
      title: "Búsqueda realizada",
      description: `Buscando: ${searchText}`,
    });
  };

  const toggleFavorite = (id: string) => {
    setRecentSearches((prev) =>
      prev.map((search) =>
        search.id === id ? { ...search, favorite: !search.favorite } : search
      )
    );
  };

  const deleteSearch = (id: string) => {
    setRecentSearches((prev) => prev.filter((search) => search.id !== id));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              className={cn(
                "w-[800px] ml-[-220px] max-w-4xl pl-14 pr-4 py-[10px] rounded-full border-2 text-base"
,
                "bg-white/80 backdrop-blur-sm",
                "focus:outline-none focus:border-auction-primary focus:ring-2 focus:ring-auction-primary/20",
                "group-hover:border-auction-primary/50 group-hover:shadow-lg",
                "transition-all duration-500 ease-in-out",
                isInputFocused ? "border-auction-primary" : "border-auction-soft"
              )}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Search
              className={cn(
                "absolute left-[-200px] top-1/2 -translate-y-1/2 w-6 h-6 transition-colors duration-300",
                isInputFocused || searchTerm ? "text-auction-primary" : "text-gray-600"
              )}
            />
            {!searchTerm && (
              <div
                className="absolute -left-40 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none"
              >
                {/* Texto fijo "Search" */}
                <span style={{ color: '#c8c8c8', fontWeight: '500' }}>Buscar</span>
                {/* Artículo dinámico con animación */}
                <span
                  className={cn("transition-opacity duration-300", fadeClass)}
                  style={{ color: '#5c7a89', fontWeight: '500' }}
                >
                  {placeholders[placeholderIndex]}
                </span>
              </div>
            )}
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-auction-soft"
                onClick={() => setSearchTerm('')}
              >
                <X className="w-4 h-4 text-gray-600" />
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[calc(100%+4cm)] mt-2 bg-white shadow-xl rounded-xl border border-gray-100"
          align="start"
          sideOffset={4}
        >
          <div className="p-0">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-semibold text-gray-900">Búsquedas recientes</span>
              </div>
              <Button
                variant="ghost"
                className="text-xs text-[#00BA88] hover:text-[#00BA88]/80 transition-colors flex items-center gap-2"
                onClick={() => setRecentSearches([])}
              >
                Eliminar todo
                <Trash2 className="w-4 h-4 text-[#00BA88]" />
              </Button>
            </div>
            {recentSearches.length > 0 ? (
              <div className="py-4" style={{ height: 'calc(100% + 4cm)' }}>
                {recentSearches.map((search) => (
                  <div
                    key={search.id}
                    className="flex items-center justify-between px-8 py-4 hover:bg-gray-50 group/item transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <button
                        className="text-base text-gray-700 hover:text-auction-primary transition-colors"
                        onClick={() => handleSearch(search.text)}
                      >
                        {search.text}
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-white hover:text-[#D946EF] transition-all duration-200"
                        onClick={() => toggleFavorite(search.id)}
                      >
                        <Heart
                          className={cn(
                            "w-4 h-4 transition-colors",
                            search.favorite ? "fill-[#D946EF] text-[#D946EF]" : "text-gray-400"
                          )}
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-base text-gray-500" style={{ height: 'calc(100% + 4cm)' }}>
                No hay búsquedas recientes
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
