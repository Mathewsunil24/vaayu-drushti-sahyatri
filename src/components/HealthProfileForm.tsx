
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  CalendarDays, 
  Activity, 
  Heart, 
  Stethoscope, 
  Medal, 
  AlertCircle,
  Save,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface HealthProfileFormProps {
  // Define any props the component needs here
}

interface HealthProfile {
  age: number;
  activityLevel: 'Low' | 'Moderate' | 'High';
  heartCondition: boolean;
  respiratoryIssues: boolean;
  allergies: string;
  otherConditions: string;
}

const HealthProfileForm: React.FC<HealthProfileFormProps> = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [profile, setProfile] = useState<HealthProfile>({
    age: 30,
    activityLevel: 'Moderate',
    heartCondition: false,
    respiratoryIssues: true,
    allergies: 'Pollen',
    otherConditions: 'None'
  });
  
  const [editedProfile, setEditedProfile] = useState<HealthProfile>({...profile});
  
  const handleEditClick = () => {
    setEditedProfile({...profile});
    setIsDialogOpen(true);
  };
  
  const handleSave = () => {
    setProfile({...editedProfile});
    setIsDialogOpen(false);
    toast.success("Health profile updated successfully!");
  };
  
  const handleCancel = () => {
    setIsDialogOpen(false);
  };
  
  const handleChange = (field: keyof HealthProfile, value: any) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
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
              <span>Age: {profile.age}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="text-muted-foreground" size={16} />
              <span>Activity Level: {profile.activityLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="text-muted-foreground" size={16} />
              <span>Heart Condition: {profile.heartCondition ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="text-muted-foreground" size={16} />
              <span>Respiratory Issues: {profile.respiratoryIssues ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Medal className="text-muted-foreground" size={16} />
              <span>Allergies: {profile.allergies}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="text-muted-foreground" size={16} />
              <span>Other Conditions: {profile.otherConditions}</span>
            </div>
          </div>
          <Button onClick={handleEditClick}>Edit Profile</Button>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Health Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                value={editedProfile.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Activity Level</Label>
              <RadioGroup 
                value={editedProfile.activityLevel}
                onValueChange={(value) => handleChange('activityLevel', value as 'Low' | 'Moderate' | 'High')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Low" id="low" />
                  <Label htmlFor="low">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="High" id="high" />
                  <Label htmlFor="high">High</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid gap-2">
              <Label>Heart Condition</Label>
              <RadioGroup 
                value={editedProfile.heartCondition ? "yes" : "no"}
                onValueChange={(value) => handleChange('heartCondition', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="heart-yes" />
                  <Label htmlFor="heart-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="heart-no" />
                  <Label htmlFor="heart-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid gap-2">
              <Label>Respiratory Issues</Label>
              <RadioGroup 
                value={editedProfile.respiratoryIssues ? "yes" : "no"}
                onValueChange={(value) => handleChange('respiratoryIssues', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="respiratory-yes" />
                  <Label htmlFor="respiratory-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="respiratory-no" />
                  <Label htmlFor="respiratory-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Input 
                id="allergies" 
                value={editedProfile.allergies}
                onChange={(e) => handleChange('allergies', e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="otherConditions">Other Conditions</Label>
              <Input 
                id="otherConditions" 
                value={editedProfile.otherConditions}
                onChange={(e) => handleChange('otherConditions', e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HealthProfileForm;
