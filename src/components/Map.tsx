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

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [location.lng, location.lat],
      zoom: 14
    });

    new mapboxgl.Marker()
      .setLngLat([location.lng, location.lat])
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, [location]);

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