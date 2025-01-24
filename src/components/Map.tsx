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
    if (!mapContainer.current || !location) {
      console.log('Map container or location not available');
      return;
    }

    // Clean up existing instances before creating new ones
    if (map.current) {
      console.log('Map already initialized, cleaning up...');
      if (marker.current) {
        marker.current.remove();
      }
      map.current.remove();
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHMxYzBtYnQwMGR1MmpxcDh5Z3Jld2tzIn0.PJrwU3QQZRiJZn8yNK_W_g';
    
    try {
      console.log('Initializing map with coordinates:', location);
      
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [location.lng, location.lat],
        zoom: 14
      });

      const markerInstance = new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat]);

      mapInstance.on('load', () => {
        console.log('Map loaded successfully');
        markerInstance.addTo(mapInstance);
      });

      // Only set refs after successful initialization
      map.current = mapInstance;
      marker.current = markerInstance;

    } catch (error) {
      console.error('Error initializing map:', error);
    }

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

  useEffect(() => {
    if (isOpen && map.current) {
      console.log('Dialog opened, resizing map');
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