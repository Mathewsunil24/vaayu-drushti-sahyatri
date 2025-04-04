
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Lungs, Heart, Brain, AlertTriangle } from 'lucide-react';

interface HealthProfile {
  age: number;
  hasAsthma: boolean;
  hasCOPD: boolean;
  hasHeartDisease: boolean;
  sensitivityLevel: number;
  allergyTriggers: string[];
}

const HealthProfileForm: React.FC = () => {
  const [profile, setProfile] = useState<HealthProfile>({
    age: 30,
    hasAsthma: false,
    hasCOPD: false,
    hasHeartDisease: false,
    sensitivityLevel: 50,
    allergyTriggers: [],
  });
  
  const [allergyInput, setAllergyInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSensitivityChange = (value: number[]) => {
    setProfile({
      ...profile,
      sensitivityLevel: value[0],
    });
  };
  
  const addAllergyTrigger = () => {
    if (allergyInput.trim() && !profile.allergyTriggers.includes(allergyInput.trim())) {
      setProfile({
        ...profile,
        allergyTriggers: [...profile.allergyTriggers, allergyInput.trim()]
      });
      setAllergyInput('');
    }
  };
  
  const removeAllergyTrigger = (trigger: string) => {
    setProfile({
      ...profile,
      allergyTriggers: profile.allergyTriggers.filter(t => t !== trigger)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Health profile submitted:', profile);
    // Here you would typically save the profile to state or to a backend
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="text-vaayu-purple" size={20} />
          Health Profile
        </CardTitle>
        <CardDescription>
          Customize your health profile to get personalized air quality recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={profile.age}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sensitivity">Air Quality Sensitivity</Label>
                <Slider
                  id="sensitivity"
                  min={0}
                  max={100}
                  step={1}
                  value={[profile.sensitivityLevel]}
                  onValueChange={handleSensitivityChange}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lungs size={18} className="text-vaayu-blue" />
                  <Label htmlFor="asthma">Asthma</Label>
                </div>
                <Switch
                  id="asthma"
                  name="hasAsthma"
                  checked={profile.hasAsthma}
                  onCheckedChange={(checked) =>
                    setProfile({ ...profile, hasAsthma: checked })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lungs size={18} className="text-vaayu-orange" />
                  <Label htmlFor="copd">COPD</Label>
                </div>
                <Switch
                  id="copd"
                  name="hasCOPD"
                  checked={profile.hasCOPD}
                  onCheckedChange={(checked) =>
                    setProfile({ ...profile, hasCOPD: checked })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart size={18} className="text-vaayu-red" />
                  <Label htmlFor="heartDisease">Heart Disease</Label>
                </div>
                <Switch
                  id="heartDisease"
                  name="hasHeartDisease"
                  checked={profile.hasHeartDisease}
                  onCheckedChange={(checked) =>
                    setProfile({ ...profile, hasHeartDisease: checked })
                  }
                />
              </div>
            </div>
            
            <div className="space-y-2 mt-2">
              <Label>Allergy Triggers</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Pollen, Dust"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                />
                <Button 
                  type="button" 
                  onClick={addAllergyTrigger}
                  variant="secondary"
                >
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {profile.allergyTriggers.map((trigger) => (
                  <Badge 
                    key={trigger}
                    variant="secondary"
                    className="px-2 py-1 cursor-pointer"
                    onClick={() => removeAllergyTrigger(trigger)}
                  >
                    {trigger} ×
                  </Badge>
                ))}
                {profile.allergyTriggers.length === 0 && (
                  <span className="text-xs text-muted-foreground">No triggers added yet</span>
                )}
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-6">Save Health Profile</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthProfileForm;
