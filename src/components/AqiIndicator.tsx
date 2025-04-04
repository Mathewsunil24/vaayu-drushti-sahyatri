
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type AqiLevel = 'good' | 'moderate' | 'unhealthy' | 'bad' | 'severe' | 'hazardous';

interface AqiIndicatorProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  pulsing?: boolean;
}

const AqiIndicator: React.FC<AqiIndicatorProps> = ({
  value,
  size = 'md',
  showLabel = true,
  pulsing = false,
}) => {
  let level: AqiLevel = 'good';
  let color = 'bg-aqi-good';
  let label = 'Good';
  let textColor = 'text-white';
  
  if (value <= 50) {
    level = 'good';
    color = 'bg-aqi-good';
    label = 'Good';
  } else if (value <= 100) {
    level = 'moderate';
    color = 'bg-aqi-moderate';
    label = 'Moderate';
    textColor = 'text-black';
  } else if (value <= 150) {
    level = 'unhealthy';
    color = 'bg-aqi-unhealthy';
    label = 'Unhealthy for Sensitive Groups';
  } else if (value <= 200) {
    level = 'bad';
    color = 'bg-aqi-bad';
    label = 'Unhealthy';
  } else if (value <= 300) {
    level = 'severe';
    color = 'bg-aqi-severe';
    label = 'Very Unhealthy';
  } else {
    level = 'hazardous';
    color = 'bg-aqi-hazardous';
    label = 'Hazardous';
  }
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          'rounded-full flex items-center justify-center font-bold',
          color,
          textColor,
          sizeClasses[size],
          pulsing && 'aqi-pulse'
        )}
      >
        {value}
      </div>
      {showLabel && (
        <Badge variant="outline" className="mt-1">
          {label}
        </Badge>
      )}
    </div>
  );
};

export default AqiIndicator;
