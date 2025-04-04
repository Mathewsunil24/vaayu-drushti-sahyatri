
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Leaf, Wind, AlertTriangle } from 'lucide-react';

interface HealthRecommendationProps {
  aqiValue: number;
  hasAsthma?: boolean;
  hasCOPD?: boolean;
  hasHeartDisease?: boolean;
}

const HealthRecommendation: React.FC<HealthRecommendationProps> = ({
  aqiValue,
  hasAsthma = false,
  hasCOPD = false,
  hasHeartDisease = false,
}) => {
  // Determine health risk based on AQI and health conditions
  let riskLevel = "Low";
  let recommendations: string[] = [];
  let icon = Leaf;
  let iconColor = "text-vaayu-green";
  
  if (aqiValue <= 50) {
    recommendations = [
      "Air quality is good, enjoy outdoor activities!",
      "Keep monitoring air quality for changes",
    ];
    if (hasAsthma || hasCOPD || hasHeartDisease) {
      recommendations.push("Even in good air quality, keep your medication handy");
    }
    icon = Leaf;
    iconColor = "text-vaayu-green";
  } else if (aqiValue <= 100) {
    riskLevel = hasAsthma || hasCOPD || hasHeartDisease ? "Moderate" : "Low";
    recommendations = [
      "Air quality is acceptable for most individuals",
      "Consider reducing prolonged outdoor exertion if sensitive to air pollution",
    ];
    if (hasAsthma || hasCOPD) {
      recommendations.push("Keep rescue medications accessible");
    }
    icon = Wind;
    iconColor = "text-vaayu-yellow";
  } else if (aqiValue <= 150) {
    riskLevel = hasAsthma || hasCOPD || hasHeartDisease ? "High" : "Moderate";
    recommendations = [
      "Members of sensitive groups may experience health effects",
      "Consider limiting outdoor activities, especially during peak pollution times",
      "Keep windows closed to maintain indoor air quality",
    ];
    if (hasAsthma || hasCOPD) {
      recommendations.push("Use your preventative medications as prescribed");
    }
    if (hasHeartDisease) {
      recommendations.push("Monitor for symptoms like unusual fatigue or shortness of breath");
    }
    icon = Shield;
    iconColor = "text-vaayu-orange";
  } else {
    riskLevel = "High";
    recommendations = [
      "Health alert: everyone may experience health effects",
      "Avoid outdoor activities",
      "Use air purifiers indoors if available",
      "Wear N95 mask if going outside is necessary",
    ];
    if (hasAsthma || hasCOPD || hasHeartDisease) {
      recommendations.push("Contact your healthcare provider if experiencing symptoms");
    }
    icon = AlertTriangle;
    iconColor = "text-vaayu-red";
  }
  
  const Icon = icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={iconColor} size={20} />
          Health Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span>Risk Level:</span>
            <span className={`font-medium ${
              riskLevel === "Low" ? "text-vaayu-green" : 
              riskLevel === "Moderate" ? "text-vaayu-yellow" : 
              "text-vaayu-red"
            }`}>
              {riskLevel}
            </span>
          </div>
          
          <ul className="space-y-2 list-disc pl-5">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
          
          {(hasAsthma || hasCOPD || hasHeartDisease) && (
            <p className="text-sm bg-vaayu-lightPurple p-3 rounded-md mt-3">
              These recommendations are personalized based on your health profile.
              Always consult your healthcare provider for medical advice.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthRecommendation;
