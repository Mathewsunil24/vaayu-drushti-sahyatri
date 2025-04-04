
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AirQualityMap from '@/components/AirQualityMap';
import HealthProfileForm from '@/components/HealthProfileForm';
import RouteOptimizer from '@/components/RouteOptimizer';
import HealthRecommendation from '@/components/HealthRecommendation';
import AqiIndicator from '@/components/AqiIndicator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gauge, Wind } from 'lucide-react';

const Index: React.FC = () => {
  const [currentAqi] = useState(75); // This would come from an API in a real app

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="container flex-1 py-6">
        {/* Current AQI Display */}
        <div className="mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <AqiIndicator value={currentAqi} size="lg" pulsing />
                  <div>
                    <h2 className="text-2xl font-bold">Current Air Quality</h2>
                    <p className="text-muted-foreground">Your Location: Central District</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <Wind className="text-vaayu-blue mb-1" />
                    <span className="text-sm font-medium">12 km/h</span>
                    <span className="text-xs text-muted-foreground">NE Wind</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <Gauge className="text-vaayu-purple mb-1" />
                    <span className="text-sm font-medium">42%</span>
                    <span className="text-xs text-muted-foreground">Humidity</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="map" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="map">AQI Map</TabsTrigger>
            <TabsTrigger value="route">Route Planning</TabsTrigger>
            <TabsTrigger value="health">Health Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <AirQualityMap />
              </div>
              <div>
                <HealthRecommendation 
                  aqiValue={currentAqi}
                  hasAsthma={true}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="route" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RouteOptimizer />
              <AirQualityMap />
            </div>
          </TabsContent>
          
          <TabsContent value="health" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HealthProfileForm />
              <HealthRecommendation 
                aqiValue={currentAqi}
                hasAsthma={true}
                hasCOPD={false}
                hasHeartDisease={true}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
