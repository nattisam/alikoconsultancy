import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      const { error } = await signUp(email, password, email.split("@")[0]);
      setLoading(false);
      if (error) {
        toast({ title: "Sign Up Failed", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Account Created", description: "You can now sign in." });
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      setLoading(false);
      if (error) {
        toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      } else {
        navigate("/admin");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="w-full max-w-sm mx-4">
        <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-accent" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-primary">Admin Login</h1>
            <p className="text-muted-foreground text-sm mt-1">Aliko Consultancy Dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background"
            />
            <Button type="submit" disabled={loading} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold py-5">
              {loading ? (isSignUp ? "Creating..." : "Signing in...") : (isSignUp ? "Create Account" : "Sign In")}
            </Button>
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="w-full text-xs text-muted-foreground hover:text-accent transition-colors">
              {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
