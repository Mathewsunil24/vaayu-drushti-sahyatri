
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CornerDownRight, 
  MapPin, 
  Navigation, 
  LocateFixed,
  Route,
  Shuffle,
  Car,
  Shield
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RouteOption {
  id: number;
  name: string;
  duration: string;
  distance: string;
  aqiExposure: number;
  healthImpact: 'Low' | 'Medium' | 'High';
}

const RouteOptimizer: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routeOptions, setRouteOptions] = useState<RouteOption[]>([
    {
      id: 1, 
      name: "Health-optimized Route",
      duration: "28 mins",
      distance: "3.8 km",
      aqiExposure: 42,
      healthImpact: 'Low'
    },
    {
      id: 2, 
      name: "Fastest Route",
      duration: "22 mins",
      distance: "3.2 km",
      aqiExposure: 95,
      healthImpact: 'Medium'
    },
    {
      id: 3, 
      name: "Shortest Route",
      duration: "32 mins",
      distance: "2.8 km",
      aqiExposure: 145,
      healthImpact: 'High'
    }
  ]);
  
  const [selectedRoute, setSelectedRoute] = useState(routeOptions[0]);
  
  const handleCalculateRoutes = () => {
    // In a real app, this would call a route calculation API
    console.log("Calculating routes between:", origin, "and", destination);
  };
  
  const getHealthImpactColor = (impact: 'Low' | 'Medium' | 'High') => {
    switch (impact) {
      case 'Low': return 'text-aqi-good';
      case 'Medium': return 'text-aqi-moderate';
      case 'High': return 'text-aqi-bad';
      default: return '';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Route className="text-vaayu-blue" size={20} />
          Route Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-3">
            <div className="flex items-start gap-2">
              <MapPin className="mt-1 text-vaayu-blue flex-shrink-0" size={18} />
              <div className="grid gap-1.5 w-full">
                <Label htmlFor="origin">Starting Point</Label>
                <Input 
                  id="origin"
                  placeholder="Enter starting location"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="mt-6 flex-shrink-0"
                title="Use current location"
              >
                <LocateFixed size={18} />
              </Button>
            </div>
            
            <div className="flex items-start gap-2">
              <CornerDownRight className="mt-1 text-vaayu-purple flex-shrink-0" size={18} />
              <div className="grid gap-1.5 w-full">
                <Label htmlFor="destination">Destination</Label>
                <Input 
                  id="destination"
                  placeholder="Enter destination" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              onClick={handleCalculateRoutes}
              className="mt-1 w-full"
            >
              Calculate Optimized Routes
            </Button>
          </div>
          
          <div className="pt-2">
            <Tabs defaultValue="health" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="health" className="flex-1">Health Priority</TabsTrigger>
                <TabsTrigger value="speed" className="flex-1">Speed Priority</TabsTrigger>
              </TabsList>
              
              <div className="mt-4">
                {routeOptions.map((route) => (
                  <div 
                    key={route.id}
                    className={`p-3 border rounded-lg mb-2 cursor-pointer hover:bg-accent/50 transition-colors ${
                      selectedRoute.id === route.id ? 'border-vaayu-blue bg-accent/50' : ''
                    }`}
                    onClick={() => setSelectedRoute(route)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {route.id === 1 ? (
                          <Shield className="text-vaayu-green" size={18} />
                        ) : route.id === 2 ? (
                          <Car className="text-vaayu-blue" size={18} />
                        ) : (
                          <Shuffle className="text-vaayu-purple" size={18} />
                        )}
                        <span className="font-medium">{route.name}</span>
                      </div>
                      
                      <div className="flex items-center text-sm gap-4">
                        <span>{route.duration}</span>
                        <span>{route.distance}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>AQI Exposure: {route.aqiExposure}</span>
                      <span className={`font-medium ${getHealthImpactColor(route.healthImpact)}`}>
                        {route.healthImpact} Health Impact
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4">
                <Navigation className="mr-2" size={16} />
                Start Navigation
              </Button>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteOptimizer;
