import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface SOSPopupProps {
  user: User;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface PresetOption {
  id: string;
  label: string;
  icon: string;
  description: string;
}

const presetOptions: PresetOption[] = [
  { id: 'meds', label: 'Medical Aid', icon: '💊', description: 'Need immediate medical attention' },
  { id: 'food', label: 'Food Supply', icon: '🍞', description: 'Running out of food' },
  { id: 'water', label: 'Water Supply', icon: '💧', description: 'Need clean drinking water' },
  { id: 'evacuation', label: 'Evacuation', icon: '🚁', description: 'Need immediate rescue/evacuation' }
];

const SOSPopup = ({ user, onClose, onSubmit }: SOSPopupProps) => {
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Auto-capture location when popup opens
    captureLocation();
  }, []);

  const captureLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Location Not Available",
        description: "Your browser doesn't support geolocation",
        variant: "destructive"
      });
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Location error:', error);
        toast({
          title: "Location Error",
          description: "Could not get your location. Please enable location services.",
          variant: "destructive"
        });
        setIsGettingLocation(false);
        // Set a default location for demo
        setLocation({ lat: 40.7128, lng: -74.0060 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handlePresetToggle = (presetId: string) => {
    setSelectedPresets(prev => 
      prev.includes(presetId) 
        ? prev.filter(id => id !== presetId)
        : [...prev, presetId]
    );
  };

  const handleSubmit = () => {
    if (selectedPresets.length === 0 && !message.trim()) {
      toast({
        title: "Select Emergency Type",
        description: "Please select at least one emergency type or add a message",
        variant: "destructive"
      });
      return;
    }

    if (!location) {
      toast({
        title: "Location Required",
        description: "Location is required to send SOS signal",
        variant: "destructive"
      });
      return;
    }

    const sosData = {
      id: `sos-${Date.now()}`,
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email
      },
      location,
      presets: selectedPresets,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    onSubmit(sosData);
  };

  const handleSkipMessage = () => {
    if (selectedPresets.length === 0) {
      toast({
        title: "Select Emergency Type",
        description: "Please select at least one emergency type",
        variant: "destructive"
      });
      return;
    }

    if (!location) {
      captureLocation();
      return;
    }

    const sosData = {
      id: `sos-${Date.now()}`,
      user: {
        name: user.name,
        phone: user.phone,
        email: user.email
      },
      location,
      presets: selectedPresets,
      message: "",
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    onSubmit(sosData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg bg-card border-2 border-red-500/30 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-red-600/20 to-red-700/20 border-b border-red-500/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center text-red-400">
              <Send className="w-6 h-6 mr-2" />
              Emergency SOS
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Location Status */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">Location Status</span>
            </div>
            {isGettingLocation ? (
              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400">
                Getting Location...
              </Badge>
            ) : location ? (
              <Badge className="bg-green-500/20 text-green-400">
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-500/20 text-red-400">
                Location Required
              </Badge>
            )}
          </div>

          {/* Emergency Type Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-400" />
              What do you need?
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {presetOptions.map((preset) => (
                <label
                  key={preset.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedPresets.includes(preset.id)
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-border hover:border-red-500/50 hover:bg-red-500/5'
                  }`}
                >
                  <Checkbox
                    checked={selectedPresets.includes(preset.id)}
                    onCheckedChange={() => handlePresetToggle(preset.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{preset.icon}</span>
                      <span className="font-medium text-sm">{preset.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {preset.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Optional Message */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Additional Information (Optional)</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your situation in detail (optional)..."
              className="min-h-[80px] bg-background border-border"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleSubmit}
              className="w-full btn-emergency py-4 text-lg"
              disabled={isGettingLocation}
            >
              <Send className="w-5 h-5 mr-2" />
              Send Emergency SOS
            </Button>
            
            <Button 
              onClick={handleSkipMessage}
              variant="outline"
              className="w-full"
              disabled={isGettingLocation}
            >
              Quick Send (Skip Message)
            </Button>
          </div>

          {/* Emergency Info */}
          <div className="p-3 bg-muted/30 rounded-lg text-center">
            <p className="text-xs text-muted-foreground">
              Your location and emergency details will be immediately shared with rescue teams. 
              Stay calm and follow any instructions from emergency responders.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOSPopup;