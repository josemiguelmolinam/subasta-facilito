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
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !location) return;

    // Replace this with your actual Mapbox token
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHMxYzBtYnQwMGR1MmpxcDh5Z3Jld2tzIn0.PJrwU3QQZRiJZn8yNK_W_g';
    
    try {
      console.log('Initializing map with coordinates:', location);
      
      // Create new map instance
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [location.lng, location.lat],
        zoom: 14
      });

      // Create marker
      const newMarker = new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat]);

      newMap.on('load', () => {
        console.log('Map loaded successfully');
        if (newMarker) {
          newMarker.addTo(newMap);
        }
      });

      // Store references
      map.current = newMap;
      marker.current = newMarker;

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    // Cleanup function
    return () => {
      console.log('Cleaning up map instance');
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [location]);

  // Handle map resize when dialog opens
  useEffect(() => {
    if (isOpen && map.current) {
      setTimeout(() => {
        map.current?.resize();
      }, 100);
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