import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: ""
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const user = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    toast({
      title: "Registration Successful",
      description: "Welcome to Emergency SOS System",
    });
    navigate('/user');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminCredentials.username === "ADMIN" && adminCredentials.password === "12345678") {
      sessionStorage.setItem('isAdmin', 'true');
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the operator dashboard",
      });
      navigate('/admin');
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Emergency SOS</h1>
          <p className="text-muted-foreground text-lg">Disaster Response & Rescue Coordination</p>
        </div>

        {!showAdminLogin ? (
          <Card className="card-emergency">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">User Registration</CardTitle>
              <CardDescription>Register to access emergency SOS services</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                    className="bg-background border-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    className="bg-background border-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 9876543210"
                    className="bg-background border-border"
                  />
                </div>

                <Button type="submit" className="w-full btn-emergency">
                  Register for Emergency Access
                </Button>
              </form>

              <div className="mt-6 pt-4 border-t border-border">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAdminLogin(true)}
                  className="w-full"
                >
                  Admin / Operator Login
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="card-emergency">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>Access operator dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={adminCredentials.username}
                    onChange={(e) => setAdminCredentials({...adminCredentials, username: e.target.value})}
                    placeholder="ADMIN"
                    className="bg-background border-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({...adminCredentials, password: e.target.value})}
                    placeholder="••••••••"
                    className="bg-background border-border"
                  />
                </div>

                <Button type="submit" className="w-full btn-safe">
                  Access Operator Dashboard
                </Button>
              </form>

              <div className="mt-6 pt-4 border-t border-border">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAdminLogin(false)}
                  className="w-full"
                >
                  Back to User Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Signup;