import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Clock, CheckCircle2, FileText, MessageSquare } from "lucide-react";

const mockStatuses: Record<string, { status: string; note: string; updates: { date: string; status: string; note: string }[] }> = {};

const ApplicationStatus = () => {
  const [code, setCode] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
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
            <Input
              placeholder="Enter application code (e.g. ALC-XXXX-XX)"
              value={code}
              onChange={(e) => { setCode(e.target.value); setSearched(false); }}
              className="bg-card"
            />
            <Button type="submit" className="bg-gold text-navy hover:bg-gold/90 font-semibold" disabled={!code.trim()}>
              <Search className="w-4 h-4" />
            </Button>
          </form>

          {searched && (
            <div className="max-w-md mx-auto text-center">
              <div className="bg-off-white rounded-xl p-8">
                <Clock className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-serif text-lg font-semibold text-primary mb-2">Application Under Review</h3>
                <p className="text-muted-foreground text-sm mb-1">Code: <span className="font-mono font-bold">{code}</span></p>
                <p className="text-muted-foreground text-sm mb-6">Our team is reviewing your submission. You will be notified of any updates via email.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/book"><Button className="bg-gold text-navy hover:bg-gold/90 text-sm font-semibold">Book Consultation</Button></Link>
                  <Link to="/contact"><Button variant="outline" className="text-sm">Contact Us</Button></Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ApplicationStatus;
