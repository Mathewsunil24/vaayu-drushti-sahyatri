import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, AlertTriangle, MapIcon, LocateFixed } from 'lucide-react';
import AqiIndicator from './AqiIndicator';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

// Mock data for AQI points
const mockAqiPoints = [
  { id: 1, lat: 40, lng: 40, value: 35, location: "Downtown" },
  { id: 2, lat: 41, lng: 41, value: 75, location: "North End" },
  { id: 3, lat: 39, lng: 42, value: 125, location: "Industrial Zone" },
  { id: 4, lat: 42, lng: 39, value: 55, location: "Residential Area" },
  { id: 5, lat: 38, lng: 38, value: 165, location: "Highway Junction" },
];

// Custom component to handle map center updates
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const AirQualityMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(mockAqiPoints[0]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40, 40]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          setLocationError(error.message);
          console.error('Error getting location:', error);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
    }
  }, []);

  const handleMarkerClick = (location: typeof mockAqiPoints[0]) => {
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
  };

  const handleLocateClick = () => {
    if (userLocation) {
      setMapCenter(userLocation);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          setLocationError(error.message);
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MapIcon className="text-vaayu-blue" size={20} />
          Air Quality Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4 relative">
        <div className="map-container h-[400px] w-full">
          <MapContainer
            center={mapCenter}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <ChangeView center={mapCenter} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && (
              <Marker
                position={userLocation}
                icon={L.divIcon({
                  className: 'current-location-marker',
                  html: '<div class="w-4 h-4 bg-vaayu-blue rounded-full border-2 border-white shadow-lg"></div>',
                  iconSize: [16, 16],
                  iconAnchor: [8, 8]
                })}
              >
                <Popup>Your Location</Popup>
              </Marker>
            )}
            {mockAqiPoints.map((point) => (
              <Marker
                key={point.id}
                position={[point.lat, point.lng]}
                eventHandlers={{
                  click: () => handleMarkerClick(point),
                }}
              >
                <Popup>
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-medium">{point.location}</span>
                    <AqiIndicator value={point.value} size="sm" />
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg z-[1000]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex items-center">
              <MapPin className="text-vaayu-purple mr-2" size={18} />
              <span className="font-medium">{selectedLocation.location}</span>
            </div>
            
            <div className="flex items-center">
              <span className="mr-2">Current AQI:</span>
              <AqiIndicator value={selectedLocation.value} size="sm" />
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleLocateClick}
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
            title="Locate me"
          >
            <LocateFixed className="text-vaayu-blue" size={24} />
          </button>
          <div className="bg-white rounded-full p-2 shadow-md">
            <Navigation className="text-vaayu-blue" size={24} />
          </div>
        </div>

        {locationError && (
          <div className="absolute top-16 right-4 bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow-md z-[1000]">
            <AlertTriangle className="inline-block mr-2" size={16} />
            {locationError}
          </div>
        )}
        
        <div className="p-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="flex items-center">
              <div className="aqi-dot aqi-dot-good"></div>
              <span>0-50 Good</span>
            </div>
            <div className="flex items-center">
              <div className="aqi-dot aqi-dot-moderate"></div>
              <span>51-100 Moderate</span>
            </div>
            <div className="flex items-center">
              <div className="aqi-dot aqi-dot-unhealthy"></div>
              <span>101-150 Unhealthy for Sensitive</span>
            </div>
            <div className="flex items-center">
              <div className="aqi-dot aqi-dot-bad"></div>
              <span>151-200 Unhealthy</span>
            </div>
            <div className="flex items-center">
              <div className="aqi-dot aqi-dot-severe"></div>
              <span>201-300 Very Unhealthy</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQualityMap;
