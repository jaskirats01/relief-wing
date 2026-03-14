import { useEffect, useRef } from "react";
import { MapPin, Navigation, Zap } from "lucide-react";

interface SOSRequest {
  id: string;
  user: { name: string; phone: string; email: string };
  location: { lat: number; lng: number };
  presets: string[];
  message: string;
  timestamp: string;
  status: 'pending' | 'acknowledged' | 'assigned' | 'resolved';
  assignedDrone?: string;
}

interface MapViewProps {
  sosRequests?: SOSRequest[];
  height?: string;
}

// Mock drone locations
const mockDrones = [
  { id: 'drone-01', name: 'Alpha', lat: 40.7128, lng: -74.0060, status: 'active' },
  { id: 'drone-02', name: 'Beta', lat: 40.7589, lng: -73.9851, status: 'returning' },
  { id: 'drone-03', name: 'Gamma', lat: 40.7505, lng: -73.9934, status: 'active' }
];

// Mock bases
const mockBases = [
  { id: 'base-01', name: 'Emergency Base Alpha', lat: 40.7414, lng: -74.0055 },
  { id: 'base-02', name: 'Emergency Base Beta', lat: 40.7505, lng: -73.9855 }
];

const MapView = ({ sosRequests = [], height = "400px" }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize map (this would be where you'd initialize Leaflet or Google Maps)
    // For now, we'll create a visual representation
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-500';
      case 'acknowledged': return 'bg-yellow-500';
      case 'assigned': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDroneStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'returning': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="relative">
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-lg border border-border overflow-hidden"
        style={{ height }}
      >
        {/* Simulated map background with grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="mapGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#64748b" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#mapGrid)" />
          </svg>
        </div>

        {/* SOS Request Markers */}
        {sosRequests.map((request, index) => (
          <div
            key={request.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${30 + (index * 20)}%`,
              top: `${40 + (index * 15)}%`
            }}
          >
            <div className={`w-6 h-6 ${getStatusColor(request.status)} rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse`}>
              <MapPin className="w-3 h-3 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">{request.user.name}</div>
              <div>{request.presets.join(', ')}</div>
              <div className="text-gray-300">{request.status}</div>
            </div>
          </div>
        ))}

        {/* Drone Markers */}
        {mockDrones.map((drone, index) => (
          <div
            key={drone.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${50 + (index * 15)}%`,
              top: `${30 + (index * 20)}%`
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <Zap className={`w-4 h-4 ${getDroneStatusColor(drone.status)}`} />
              </div>
              
              {/* Drone range indicator */}
              <div className="absolute inset-0 w-16 h-16 border border-blue-400/30 rounded-full -translate-x-1/4 -translate-y-1/4 animate-pulse"></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">Drone {drone.name}</div>
              <div className="capitalize">{drone.status}</div>
            </div>
          </div>
        ))}

        {/* Base Markers */}
        {mockBases.map((base, index) => (
          <div
            key={base.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${20 + (index * 60)}%`,
              top: `${70}%`
            }}
          >
            <div className="w-10 h-10 bg-green-600 rounded-lg border-2 border-white shadow-lg flex items-center justify-center">
              <Navigation className="w-5 h-5 text-white" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">{base.name}</div>
            </div>
          </div>
        ))}

        {/* Map Scale */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs rounded px-2 py-1">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-px bg-white"></div>
            <span>1 km</span>
          </div>
        </div>

        {/* Coordinates */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs rounded px-2 py-1 font-mono">
          40.7128°N, 74.0060°W
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Emergency SOS</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span>Active Drone</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded-lg"></div>
          <span>Emergency Base</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>Acknowledged</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Resolved</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;