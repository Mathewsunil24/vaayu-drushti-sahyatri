import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  CalendarDays, 
  Activity, 
  Heart, 
  Stethoscope, 
  Medal, 
  AlertCircle
} from 'lucide-react'; // Changed from using the non-existent Lungs icon

interface HealthProfileFormProps {
  // Define any props the component needs here
}

const HealthProfileForm: React.FC<HealthProfileFormProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="text-vaayu-blue" size={20} />
          My Health Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="text-muted-foreground" size={16} />
            <span>Age: 30</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="text-muted-foreground" size={16} />
            <span>Activity Level: Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="text-muted-foreground" size={16} />
            <span>Heart Condition: No</span>
          </div>
          <div className="flex items-center gap-2">
            <Stethoscope className="text-muted-foreground" size={16} />
            <span>Respiratory Issues: Yes</span>
          </div>
          <div className="flex items-center gap-2">
            <Medal className="text-muted-foreground" size={16} />
            <span>Allergies: Pollen</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="text-muted-foreground" size={16} />
            <span>Other Conditions: None</span>
          </div>
        </div>
        <Button>Edit Profile</Button>
      </CardContent>
    </Card>
  );
};

export default HealthProfileForm;
