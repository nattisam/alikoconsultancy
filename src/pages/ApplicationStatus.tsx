import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ApplicationStatus = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    const { data, error: err } = await supabase.rpc("check_application_status", { app_code: code.trim() });
    setLoading(false);
    if (err) { setError("Something went wrong. Please try again."); return; }
    if (data && (data as any).error) { setError("Application not found. Please check your code."); return; }
    setResult(data);
  };

  const statusConfig: Record<string, { icon: typeof CheckCircle2; label: string; color: string }> = {
    submitted: { icon: Clock, label: "Submitted - Under Initial Review", color: "text-blue-500" },
    under_review: { icon: Clock, label: "Under Review", color: "text-yellow-500" },
    approved: { icon: CheckCircle2, label: "Approved", color: "text-green-500" },
    rejected: { icon: AlertCircle, label: "Not Approved", color: "text-red-500" },
    waitlisted: { icon: Clock, label: "Waitlisted", color: "text-orange-500" },
    draft: { icon: Clock, label: "Draft", color: "text-muted-foreground" },
  };

  return (
    <div>
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 block">Application Status</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Track Your Application</h1>
            <p className="text-primary-foreground/70 text-lg">Enter your application code to check the current status.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-narrow">
          <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-3 mb-12">
            <Input placeholder="Enter application code (e.g. APP-ALC-XXXXX)" value={code} onChange={(e) => { setCode(e.target.value); setResult(null); setError(""); }} className="bg-card" />
            <Button type="submit" className="bg-gold text-navy hover:bg-gold/90 font-semibold" disabled={!code.trim() || loading}>
              <Search className="w-4 h-4" />
            </Button>
          </form>
          {error && (
            <div className="max-w-md mx-auto text-center">
              <div className="bg-destructive/10 rounded-xl p-8">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </div>
          )}
          {result && (
            <div className="max-w-md mx-auto text-center">
              <div className="card-gold-subtle rounded-xl p-8">
                {(() => { const cfg = statusConfig[result.status] || statusConfig.submitted; const Icon = cfg.icon; return (
                  <>
                    <div className={`w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-7 h-7 ${cfg.color}`} />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-primary mb-2">{cfg.label}</h3>
                    <p className="text-muted-foreground text-sm mb-1">Code: <span className="font-mono font-bold">{result.application_code}</span></p>
                    <p className="text-muted-foreground text-sm mb-1 capitalize">Type: {result.consultation_type}</p>
                    <p className="text-muted-foreground text-sm mb-6">Last updated: {new Date(result.updated_at).toLocaleDateString()}</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Link to="/book"><Button className="bg-gold text-navy hover:bg-gold/90 text-sm font-semibold">Book Consultation</Button></Link>
                      <Link to="/contact"><Button variant="outline" className="text-sm">Contact Us</Button></Link>
                    </div>
                  </>
                ); })()}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ApplicationStatus;
