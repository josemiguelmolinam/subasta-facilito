import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  location: {
    lat: number;
    lng: number;
  };
  address: string;
}

const Map: React.FC<MapProps> = ({ location, address }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) {
      console.log('Map container not found');
      return;
    }

    try {
      // Clean up existing instances
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }

      // Initialize map
      mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGVhcnRleHQifQ.dGVlYXJ0ZXh0'; // Replace with your token
      
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [location.lng, location.lat],
        zoom: 14,
      });

      // Add navigation control
      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add marker
      const newMarker = new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(newMap);

      // Store references
      map.current = newMap;
      marker.current = newMarker;

      console.log('Map initialized successfully');

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    // Cleanup function
    return () => {
      console.log('Cleaning up map component');
      try {
        if (marker.current) {
          marker.current.remove();
          marker.current = null;
        }
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };
  }, [location.lat, location.lng]);

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;