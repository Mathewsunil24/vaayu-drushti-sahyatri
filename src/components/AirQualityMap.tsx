
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, AlertTriangle, MapIcon } from 'lucide-react';
import AqiIndicator from './AqiIndicator';

// Mock data for AQI points
const mockAqiPoints = [
  { id: 1, lat: 40, lng: 40, value: 35, location: "Downtown" },
  { id: 2, lat: 41, lng: 41, value: 75, location: "North End" },
  { id: 3, lat: 39, lng: 42, value: 125, location: "Industrial Zone" },
  { id: 4, lat: 42, lng: 39, value: 55, location: "Residential Area" },
  { id: 5, lat: 38, lng: 38, value: 165, location: "Highway Junction" },
];

const AirQualityMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(mockAqiPoints[0]);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MapIcon className="text-vaayu-blue" size={20} />
          Air Quality Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4 relative">
        {/* This would be replaced with an actual map component in a real implementation */}
        <div className="map-container bg-vaayu-lightBlue p-4">
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>Interactive AQI map would render here</p>
              <p className="text-xs mt-2">Using an actual mapping library like Google Maps, Mapbox, or Leaflet</p>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
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

          <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
            <Navigation className="text-vaayu-blue" size={24} />
          </div>
          
          {/* Sample AQI markers */}
          <div className="absolute top-1/4 left-1/4 cursor-pointer" onClick={() => setSelectedLocation(mockAqiPoints[0])}>
            <AqiIndicator value={35} size="sm" showLabel={false} />
          </div>
          
          <div className="absolute top-1/3 right-1/3 cursor-pointer" onClick={() => setSelectedLocation(mockAqiPoints[1])}>
            <AqiIndicator value={75} size="sm" showLabel={false} />
          </div>
          
          <div className="absolute bottom-1/3 right-1/4 cursor-pointer" onClick={() => setSelectedLocation(mockAqiPoints[2])}>
            <AqiIndicator value={125} size="sm" showLabel={false} />
          </div>
          
          <div className="absolute bottom-1/4 left-1/3 cursor-pointer" onClick={() => setSelectedLocation(mockAqiPoints[4])}>
            <AqiIndicator value={165} size="sm" showLabel={false} />
          </div>
        </div>
        
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
