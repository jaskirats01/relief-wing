import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import SOSButton from "@/components/SOSButton";
import SOSPopup from "@/components/SOSPopup";
import MapView from "@/components/MapView";
import { Battery, MapPin, Wifi, User, LogOut } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface DroneStatus {
  id: string;
  name: string;
  distance: number;
  battery: number;
  status: 'active' | 'returning' | 'offline';
  location: { lat: number; lng: number };
}

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showSOSPopup, setShowSOSPopup] = useState(false);
  const [nearestDrone, setNearestDrone] = useState<DroneStatus | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }

    setUser(JSON.parse(userData));

    // Simulate nearest drone data
    setNearestDrone({
      id: 'drone-01',
      name: 'Rescue Drone Alpha',
      distance: 1.2,
      battery: 78,
      status: 'active',
      location: { lat: 40.7128, lng: -74.0060 }
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been safely logged out",
    });
    navigate('/');
  };

  const handleSOSSubmit = (sosData: any) => {
    // Store SOS request in localStorage for admin to see
    const existingSOS = JSON.parse(localStorage.getItem('sosRequests') || '[]');
    const updatedSOS = [sosData, ...existingSOS];
    localStorage.setItem('sosRequests', JSON.stringify(updatedSOS));
    
    // Trigger a custom event to notify admin page if it's open
    window.dispatchEvent(new CustomEvent('newSOSRequest', { detail: sosData }));
    
    console.log('SOS Data:', sosData);
    toast({
      title: "SOS Signal Sent",
      description: "Emergency services have been notified. Help is on the way.",
      variant: "default"
    });
    setShowSOSPopup(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Emergency SOS</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Status */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Wifi className="w-5 h-5 mr-2 text-green-500" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    Connected
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emergency ID</span>
                  <span className="font-mono text-sm">{user.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nearest Drone */}
          {nearestDrone && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  Nearest Drone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{nearestDrone.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance</span>
                    <span>{nearestDrone.distance} km</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Battery</span>
                    <div className="flex items-center space-x-2">
                      <Battery className="w-4 h-4" />
                      <span>{nearestDrone.battery}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge 
                      variant={nearestDrone.status === 'active' ? 'default' : 'secondary'}
                      className={nearestDrone.status === 'active' ? 'bg-green-500/20 text-green-400' : ''}
                    >
                      {nearestDrone.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emergency Info */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Emergency Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span>{user.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground">
                    In case of emergency, press the SOS button below. Your location will be automatically shared with rescue teams.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Map */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Emergency Map</CardTitle>
          </CardHeader>
          <CardContent>
            <MapView sosRequests={[]} height="300px" />
          </CardContent>
        </Card>

        {/* SOS Button */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <SOSButton onClick={() => setShowSOSPopup(true)} />
        </div>

        {/* SOS Popup */}
        {showSOSPopup && (
          <SOSPopup
            user={user}
            onClose={() => setShowSOSPopup(false)}
            onSubmit={handleSOSSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default UserPage;