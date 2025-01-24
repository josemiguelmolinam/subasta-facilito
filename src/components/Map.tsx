import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface MapProps {
  location: { lat: number; lng: number };
  address: string;
}

const Map = ({ location, address }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || mapInitialized) return;

    // Replace this with your actual Mapbox token
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHMxYzBtYnQwMGR1MmpxcDh5Z3Jld2tzIn0.PJrwU3QQZRiJZn8yNK_W_g';
    
    try {
      console.log('Initializing map with coordinates:', location);
      
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [location.lng, location.lat],
        zoom: 14
      });

      newMap.on('load', () => {
        console.log('Map loaded successfully');
        new mapboxgl.Marker()
          .setLngLat([location.lng, location.lat])
          .addTo(newMap);
      });

      map.current = newMap;
      setMapInitialized(true);

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      if (map.current) {
        console.log('Cleaning up map');
        map.current.remove();
      }
    };
  }, [location, mapInitialized]);

  // Reinitialize map when dialog opens
  useEffect(() => {
    if (isOpen && map.current) {
      map.current.resize();
    }
  }, [isOpen]);

  return (
    <>
      <div 
        className="h-40 rounded-lg overflow-hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div ref={mapContainer} className="w-full h-full" />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <div ref={mapContainer} className="w-full h-full rounded-lg" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Map;