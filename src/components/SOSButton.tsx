import { AlertTriangle } from "lucide-react";

interface SOSButtonProps {
  onClick: () => void;
}

const SOSButton = ({ onClick }: SOSButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative w-32 h-32 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-200 pulse-emergency group"
      aria-label="Emergency SOS Button"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
      
      <div className="flex flex-col items-center justify-center h-full text-white">
        <AlertTriangle className="w-12 h-12 mb-2 animate-pulse" />
        <span className="text-2xl font-bold tracking-wider">SOS</span>
        <span className="text-xs font-medium opacity-90">EMERGENCY</span>
      </div>

      {/* Pulsing ring effect */}
      <div className="absolute inset-0 rounded-full border-4 border-red-400 opacity-75 animate-ping"></div>
      <div className="absolute inset-2 rounded-full border-2 border-red-300 opacity-50 animate-pulse"></div>
    </button>
  );
};

export default SOSButton;