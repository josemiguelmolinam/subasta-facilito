import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';

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
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) {
      console.log('Map container or token not available');
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

      // Set the access token
      mapboxgl.accessToken = mapboxToken;

      // Create new map instance
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [location.lng, location.lat],
        zoom: 14,
      });

      // Add navigation control
      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Create marker
      const newMarker = new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(newMap);

      // Store references
      map.current = newMap;
      marker.current = newMarker;
      setShowTokenInput(false);

      console.log('Map initialized successfully');
    } catch (error) {
      console.error('Error initializing map:', error);
      setShowTokenInput(true);
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
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
  }, [location.lat, location.lng, mapboxToken]);

  if (showTokenInput) {
    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <p className="text-sm text-gray-600">
          Please enter your Mapbox public token. You can find it at{' '}
          <a 
            href="https://www.mapbox.com/account/access-tokens" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            mapbox.com
          </a>
        </p>
        <Input
          type="text"
          value={mapboxToken}
          onChange={(e) => setMapboxToken(e.target.value)}
          placeholder="Enter your Mapbox public token"
          className="w-full"
        />
        <Button onClick={initializeMap} className="w-full">
          Initialize Map
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;