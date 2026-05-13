import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { LocateFixed } from 'lucide-react';
import { useTranslation } from '../../core/i18n';
import { getPlaces } from '../../data/db';
import { Place } from '../../data/models';

const containerStyle = {
  width: '100%',
  height: '100vh' // Takes full height, nav covers bottom
};

const defaultCenter = {
  lat: 36.7538, // Algiers
  lng: 3.0588
};

const mapOptions = {
  disableDefaultUI: true,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }]
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }]
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }]
    }
  ]
};

export function MapScreen() {
  const [, setNavLocation] = useLocation();
  const { t } = useTranslation();
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLoc, setUserLoc] = useState<google.maps.LatLngLiteral | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  useEffect(() => {
    async function load() {
      try {
        const p = await getPlaces();
        setPlaces(p);
      } catch (err) {
        console.warn('Could not load places:', err);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLoc({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        console.error,
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const centerToUser = () => {
    if (userLoc && mapRef.current) {
      mapRef.current.panTo(userLoc);
      mapRef.current.setZoom(15);
    }
  };

  if (!isLoaded) return <div className="flex items-center justify-center min-h-screen bg-background">{t('splash.loading')}</div>;

  return (
    <div className="relative w-full h-screen">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLoc || defaultCenter}
        zoom={12}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {userLoc && (
          <Marker
            position={userLoc}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#3b82f6',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }}
          />
        )}

        {places.map(place => (
          <Marker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            onClick={() => setSelectedPlace(place)}
            icon={{
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 6,
              fillColor: '#8B5CF6',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 1,
            }}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div className="p-2 min-w-[150px] text-gray-900">
              <h3 className="font-bold text-lg mb-1">{selectedPlace.name}</h3>
              <p className="text-sm text-gray-600 mb-2 capitalize">{selectedPlace.type}</p>
              <button 
                onClick={() => setNavLocation(`/place/${selectedPlace.id}`)}
                className="w-full bg-[#8B5CF6] text-white py-1.5 rounded-md text-sm font-medium hover:bg-[#7C3AED]"
              >
                View details
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <button 
        onClick={centerToUser}
        className="absolute top-6 right-4 bg-surface p-3 rounded-full shadow-lg text-primary border border-gray-800"
      >
        <LocateFixed size={24} />
      </button>
    </div>
  );
}
