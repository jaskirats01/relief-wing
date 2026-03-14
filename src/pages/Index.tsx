import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center p-4">
      <div className="text-center max-w-2xl space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-primary">Emergency SOS</h1>
          <p className="text-xl text-muted-foreground">
            Disaster Response & Rescue Coordination System
          </p>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Real-time emergency response platform connecting those in need with rescue operations and drone-assisted emergency services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="card-emergency space-y-4">
            <div className="flex justify-center">
              <Users className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">For Citizens</h3>
            <p className="text-muted-foreground">
              Register to access emergency SOS services with real-time location sharing and preset emergency types.
            </p>
            <Button 
              onClick={() => navigate('/')} 
              className="w-full btn-emergency"
            >
              Get Emergency Access
            </Button>
          </div>

          <div className="card-emergency space-y-4">
            <div className="flex justify-center">
              <Shield className="w-12 h-12 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">For Operators</h3>
            <p className="text-muted-foreground">
              Emergency operators can access the dashboard to coordinate rescue efforts and manage drone operations.
            </p>
            <Button 
              onClick={() => navigate('/')} 
              className="w-full btn-safe"
            >
              Operator Login
            </Button>
          </div>
        </div>

        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Emergency Operators:</strong> Use credentials <code>ADMIN</code> / <code>12345678</code> to access the operator dashboard for rescue coordination.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
