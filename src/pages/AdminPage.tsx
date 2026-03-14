import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import MapView from "@/components/MapView";
import CameraFeed from "@/components/CameraFeed";
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  User, 
  LogOut, 
  CheckCircle, 
  Zap,
  Settings
} from "lucide-react";

interface SOSRequest {
  id: string;
  user: {
    name: string;
    phone: string;
    email: string;
  };
  location: { lat: number; lng: number };
  presets: string[];
  message: string;
  timestamp: string;
  status: 'pending' | 'acknowledged' | 'assigned' | 'resolved';
  assignedDrone?: string;
}

const AdminPage = () => {
  const [sosRequests, setSosRequests] = useState<SOSRequest[]>([]);
  const [selectedDrone, setSelectedDrone] = useState<string>('drone-01');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/');
      return;
    }

    // Load existing SOS requests from localStorage
    const loadSOSRequests = () => {
      const storedSOS = JSON.parse(localStorage.getItem('sosRequests') || '[]');
      setSosRequests(storedSOS);
    };

    // Load initial SOS requests
    loadSOSRequests();

    // Listen for new SOS requests from users
    const handleNewSOS = (event: CustomEvent) => {
      setSosRequests(prev => [event.detail, ...prev]);
    };

    window.addEventListener('newSOSRequest', handleNewSOS as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('newSOSRequest', handleNewSOS as EventListener);
    };
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    toast({
      title: "Logged Out",
      description: "Admin session ended",
    });
    navigate('/');
  };

  const handleAcknowledge = (id: string) => {
    const updatedRequests = sosRequests.map(req => 
      req.id === id ? { ...req, status: 'acknowledged' as const } : req
    );
    setSosRequests(updatedRequests);
    localStorage.setItem('sosRequests', JSON.stringify(updatedRequests));
    toast({
      title: "SOS Acknowledged",
      description: "Request has been acknowledged",
    });
  };

  const handleAssignDrone = (id: string) => {
    const updatedRequests = sosRequests.map(req => 
      req.id === id ? { ...req, status: 'assigned' as const, assignedDrone: selectedDrone } : req
    );
    setSosRequests(updatedRequests);
    localStorage.setItem('sosRequests', JSON.stringify(updatedRequests));
    toast({
      title: "Drone Assigned",
      description: `${selectedDrone} assigned to SOS request`,
    });
  };

  const handleResolve = (id: string) => {
    const updatedRequests = sosRequests.map(req => 
      req.id === id ? { ...req, status: 'resolved' as const } : req
    );
    setSosRequests(updatedRequests);
    localStorage.setItem('sosRequests', JSON.stringify(updatedRequests));
    toast({
      title: "SOS Resolved",
      description: "Emergency situation resolved",
    });
  };

  const handleReturnToBase = (droneId: string) => {
    toast({
      title: "Command Sent",
      description: `${droneId} returning to base`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-500/20 text-red-400';
      case 'acknowledged': return 'bg-yellow-500/20 text-yellow-400';
      case 'assigned': return 'bg-blue-500/20 text-blue-400';
      case 'resolved': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPresetIcon = (preset: string) => {
    switch (preset) {
      case 'meds': return '💊';
      case 'food': return '🍞';
      case 'water': return '💧';
      case 'evacuation': return '🚁';
      default: return '❗';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Emergency Operator Dashboard</h1>
              <p className="text-sm text-muted-foreground">Real-time Emergency Response Coordination</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active SOS</p>
                  <p className="text-2xl font-bold text-red-400">
                    {sosRequests.filter(r => r.status !== 'resolved').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-green-400">
                    {sosRequests.filter(r => r.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Drones Active</p>
                  <p className="text-2xl font-bold text-blue-400">3</p>
                </div>
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                  <p className="text-2xl font-bold text-orange-400">4.2m</p>
                </div>
                <Clock className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SOS Requests */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                Active SOS Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {sosRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="border border-border rounded-lg p-4 space-y-3 bg-background/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{request.user.name}</span>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(request.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{request.location.lat.toFixed(4)}, {request.location.lng.toFixed(4)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {request.presets.map((preset) => (
                        <Badge key={preset} variant="outline" className="text-xs">
                          {getPresetIcon(preset)} {preset}
                        </Badge>
                      ))}
                    </div>

                    {request.message && (
                      <p className="text-sm bg-muted/50 p-2 rounded">
                        {request.message}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {request.status === 'pending' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAcknowledge(request.id)}
                        >
                          Acknowledge
                        </Button>
                      )}
                      {['acknowledged', 'pending'].includes(request.status) && (
                        <Button 
                          size="sm" 
                          className="btn-warning"
                          onClick={() => handleAssignDrone(request.id)}
                        >
                          Assign Drone
                        </Button>
                      )}
                      {request.status !== 'resolved' && (
                        <Button 
                          size="sm" 
                          className="btn-safe"
                          onClick={() => handleResolve(request.id)}
                        >
                          Mark Resolved
                        </Button>
                      )}
                      {request.assignedDrone && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReturnToBase(request.assignedDrone!)}
                        >
                          Return to Base
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map and Camera */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Emergency Map</CardTitle>
              </CardHeader>
              <CardContent>
                <MapView sosRequests={sosRequests} />
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Live Drone Feed</span>
                  <select 
                    value={selectedDrone}
                    onChange={(e) => setSelectedDrone(e.target.value)}
                    className="bg-background border border-border rounded px-2 py-1 text-sm"
                  >
                    <option value="drone-01">Drone Alpha</option>
                    <option value="drone-02">Drone Beta</option>
                    <option value="drone-03">Drone Gamma</option>
                  </select>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CameraFeed streamUrl="" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;