// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Camera, CameraOff, Wifi, WifiOff } from "lucide-react";

// interface CameraFeedProps {
//   streamUrl?: string;
//   droneId?: string;
// }

// const CameraFeed = ({ streamUrl, droneId = "Drone Alpha" }: CameraFeedProps) => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleConnect = () => {
//     setIsLoading(true);
//     // Simulate connection attempt
//     setTimeout(() => {
//       setIsConnected(!isConnected);
//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="w-full space-y-4">
//       {/* Feed Controls */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
//           <span className="text-sm font-medium">
//             {droneId} {isConnected ? '(Live)' : '(Offline)'}
//           </span>
//         </div>
        
//         <Button 
//           variant="outline" 
//           size="sm" 
//           onClick={handleConnect}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
//           ) : isConnected ? (
//             <WifiOff className="w-4 h-4" />
//           ) : (
//             <Wifi className="w-4 h-4" />
//           )}
//           <span className="ml-2">
//             {isLoading ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
//           </span>
//         </Button>
//       </div>

//       {/* Video Feed Area */}
//       <Card className="relative aspect-video bg-black rounded-lg overflow-hidden border-2 border-border">
//         {isConnected ? (
//           <div className="relative w-full h-full">
//             {/* Simulated video feed with moving elements */}
//             <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
//               {/* Simulated drone view with grid overlay */}
//               <div className="absolute inset-0 opacity-20">
//                 <svg className="w-full h-full" viewBox="0 0 100 100">
//                   <defs>
//                     <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
//                       <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#22c55e" strokeWidth="0.5"/>
//                     </pattern>
//                   </defs>
//                   <rect width="100" height="100" fill="url(#grid)" />
//                 </svg>
//               </div>
              
//               {/* Crosshair overlay */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="relative">
//                   <div className="w-8 h-8 border-2 border-green-400 rounded-full opacity-80"></div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                   </div>
//                 </div>
//               </div>

//               {/* Status overlay */}
//               <div className="absolute top-4 left-4 space-y-2">
//                 <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1">
//                   <span className="text-green-400 text-xs font-mono">REC ●</span>
//                 </div>
//                 <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1">
//                   <span className="text-white text-xs font-mono">ALT: 150m</span>
//                 </div>
//                 <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1">
//                   <span className="text-white text-xs font-mono">GPS: LOCKED</span>
//                 </div>
//               </div>

//               {/* Battery indicator */}
//               <div className="absolute top-4 right-4">
//                 <div className="bg-black/60 backdrop-blur-sm rounded px-2 py-1">
//                   <span className="text-green-400 text-xs font-mono">BAT: 78%</span>
//                 </div>
//               </div>

//               {/* Simulated moving elements */}
//               <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
//                 <div className="w-4 h-4 bg-yellow-400 rounded opacity-80 animate-pulse"></div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
//             <CameraOff className="w-16 h-16 mb-4 opacity-50" />
//             <p className="text-lg font-medium">Camera Feed Offline</p>
//             <p className="text-sm opacity-75">Click connect to establish live feed</p>
//           </div>
//         )}

//         {/* Recording indicator */}
//         {isConnected && (
//           <div className="absolute top-2 left-2">
//             <div className="flex items-center space-x-2 bg-red-600/90 text-white px-2 py-1 rounded text-xs">
//               <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//               <span>LIVE</span>
//             </div>
//           </div>
//         )}
//       </Card>

//       {/* Feed Quality Info */}
//       {isConnected && (
//         <div className="flex items-center justify-between text-xs text-muted-foreground">
//           <span>Quality: 1080p @ 30fps</span>
//           <span>Latency: ~200ms</span>
//           <span>Signal: Strong</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CameraFeed;
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CameraOff, Wifi, WifiOff } from "lucide-react";

interface CameraFeedProps {
  streamUrl?: string;
  droneId?: string;
}

const CameraFeed = ({ streamUrl = "http://127.0.0.1:5000/video_feed", droneId = "Drone Alpha" }: CameraFeedProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(!isConnected);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full space-y-4">
      {/* Feed Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium">
            {droneId} {isConnected ? '(Live)' : '(Offline)'}
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleConnect}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          ) : isConnected ? (
            <WifiOff className="w-4 h-4" />
          ) : (
            <Wifi className="w-4 h-4" />
          )}
          <span className="ml-2">
            {isLoading ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
          </span>
        </Button>
      </div>

      {/* Video Feed Area */}
      <Card className="relative aspect-video bg-black rounded-lg overflow-hidden border-2 border-border">
        {isConnected ? (
          <img 
            src={"http://127.0.0.1:5000/video_feed"} 
            alt="Camera Feed" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <CameraOff className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-medium">Camera Feed Offline</p>
            <p className="text-sm opacity-75">Click connect to establish live feed</p>
          </div>
        )}

        {/* Recording indicator */}
        {isConnected && (
          <div className="absolute top-2 left-2">
            <div className="flex items-center space-x-2 bg-red-600/90 text-white px-2 py-1 rounded text-xs">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </div>
          </div>
        )}
      </Card>

      {/* Feed Quality Info */}
      {isConnected && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Quality: 1080p @ 30fps</span>
          <span>Latency: ~200ms</span>
          <span>Signal: Strong</span>
        </div>
      )}
    </div>
  );
};

export default CameraFeed;
