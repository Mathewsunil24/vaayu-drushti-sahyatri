import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, AlertTriangle, MapIcon, LocateFixed, Search } from 'lucide-react';
import AqiIndicator from './AqiIndicator';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

interface LocationData {
  lat: string;
  lon: string;
  display_name: string;
  aqi?: number;
  locationType?: string;
}

// Mock data for AQI points
const mockAqiPoints: LocationData[] = [
  { lat: '40', lon: '40', display_name: "Downtown", aqi: 35, locationType: 'urban' },
  { lat: '41', lon: '41', display_name: "North End", aqi: 75, locationType: 'residential' },
  { lat: '39', lon: '42', display_name: "Industrial Zone", aqi: 125, locationType: 'industrial' },
  { lat: '42', lon: '39', display_name: "Residential Area", aqi: 55, locationType: 'residential' },
  { lat: '38', lon: '38', display_name: "Highway Junction", aqi: 165, locationType: 'industrial' },
];

// Custom component to handle map center updates
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

interface SearchResult {
  lat: string;
  lon: string;
  display_name: string;
}

// Function to determine location type based on name
const getLocationType = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('industrial') || lowerName.includes('factory')) return 'industrial';
  if (lowerName.includes('residential') || lowerName.includes('housing')) return 'residential';
  if (lowerName.includes('downtown') || lowerName.includes('city center')) return 'urban';
  if (lowerName.includes('park') || lowerName.includes('green')) return 'green';
  return 'mixed';
};

// Function to generate AQI based on location type
const generateAqiForLocation = (locationType: string): number => {
  const ranges = {
    industrial: { min: 100, max: 200 },
    urban: { min: 50, max: 150 },
    residential: { min: 30, max: 100 },
    green: { min: 0, max: 50 },
    mixed: { min: 40, max: 120 }
  };
  
  const range = ranges[locationType as keyof typeof ranges] || ranges.mixed;
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
};

const AirQualityMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(mockAqiPoints[0]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40, 40]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState<LocationData | null>(null);
  const [isLoadingAqi, setIsLoadingAqi] = useState(false);

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

  const updateLocationAqi = async (location: LocationData) => {
    setIsLoadingAqi(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const locationType = getLocationType(location.display_name);
      const aqi = generateAqiForLocation(locationType);
      
      return {
        ...location,
        aqi,
        locationType
      };
    } catch (error) {
      console.error('Error fetching AQI:', error);
      return location;
    } finally {
      setIsLoadingAqi(false);
    }
  };

  const handleLocationSelect = async (location: LocationData) => {
    const locationWithAqi = await updateLocationAqi(location);
    setSearchedLocation(locationWithAqi);
    setSelectedLocation(locationWithAqi);
    setMapCenter([parseFloat(location.lat), parseFloat(location.lon)]);
    setSearchResults([]);
    setSearchQuery(location.display_name);
  };

  const handleMarkerClick = async (location: LocationData) => {
    const locationWithAqi = await updateLocationAqi(location);
    setSelectedLocation(locationWithAqi);
    setMapCenter([parseFloat(location.lat), parseFloat(location.lon)]);
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      setLocationError('Error searching for location');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
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
        <div className="absolute top-4 left-4 z-[1000] w-80">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pr-10"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3"
              onClick={handleSearch}
              disabled={isSearching}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => handleLocationSelect(result)}
                >
                  {result.display_name}
                </button>
              ))}
            </div>
          )}
        </div>

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
            {searchedLocation && (
              <Marker
                position={[parseFloat(searchedLocation.lat), parseFloat(searchedLocation.lon)]}
                icon={L.divIcon({
                  className: 'searched-location-marker',
                  html: '<div class="w-4 h-4 bg-vaayu-purple rounded-full border-2 border-white shadow-lg"></div>',
                  iconSize: [16, 16],
                  iconAnchor: [8, 8]
                })}
              >
                <Popup>
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-medium">{searchedLocation.display_name}</span>
                    {isLoadingAqi ? (
                      <div className="text-sm text-muted-foreground">Loading AQI...</div>
                    ) : (
                      <>
                        <AqiIndicator value={searchedLocation.aqi || 0} size="sm" />
                        <div className="text-xs text-muted-foreground">
                          {searchedLocation.locationType} area
                        </div>
                      </>
                    )}
                  </div>
                </Popup>
              </Marker>
            )}
            {mockAqiPoints.map((point) => (
              <Marker
                key={point.lat + point.lon}
                position={[parseFloat(point.lat), parseFloat(point.lon)]}
                eventHandlers={{
                  click: () => handleMarkerClick(point),
                }}
              >
                <Popup>
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-medium">{point.display_name}</span>
                    <AqiIndicator value={point.aqi || 0} size="sm" />
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
              <span className="font-medium">{selectedLocation.display_name}</span>
            </div>
            
            <div className="flex items-center">
              <span className="mr-2">Current AQI:</span>
              {isLoadingAqi ? (
                <div className="text-sm text-muted-foreground">Loading...</div>
              ) : (
                <>
                  <AqiIndicator value={selectedLocation.aqi || 0} size="sm" />
                  {selectedLocation.locationType && (
                    <span className="text-xs text-muted-foreground ml-2">
                      ({selectedLocation.locationType} area)
                    </span>
                  )}
                </>
              )}
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
