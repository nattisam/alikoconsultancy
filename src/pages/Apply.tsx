import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CheckCircle2, Upload } from "lucide-react";

const Apply = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [pillar, setPillar] = useState(searchParams.get("pillar") || "");
  const [level, setLevel] = useState(searchParams.get("level") || "");
  const [submitted, setSubmitted] = useState(false);
  const [appCode] = useState(`ALC-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`);

  if (submitted) {
    return (
      <div className="section-padding">
        <div className="container-narrow text-center">
          <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold text-primary mb-4">Application Submitted!</h1>
          <p className="text-muted-foreground mb-2">Your application code: <span className="font-mono font-bold text-primary">{appCode}</span></p>
          <p className="text-muted-foreground mb-8">Save this code to track your application status. You will also receive it via email.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/application-status"><Button className="bg-gold text-navy hover:bg-gold/90 font-semibold">Track Status</Button></Link>
            <Link to="/"><Button variant="outline">Back to Home</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 block">Application Portal</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Apply Now</h1>
            <p className="text-primary-foreground/70 text-lg">Complete the application form below. Our team will review your submission and respond within 5 business days.</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold", step >= s ? "bg-gold text-navy" : "bg-muted text-muted-foreground")}>{s}</div>
                {s < 4 && <div className={cn("w-8 h-0.5", step > s ? "bg-gold" : "bg-border")} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6 max-w-md mx-auto">
              <h2 className="font-serif text-2xl font-bold text-primary text-center mb-6">Select Your Track</h2>
              <Select value={pillar} onValueChange={setPillar}>
                <SelectTrigger className="bg-card"><SelectValue placeholder="Select a track" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business Consulting</SelectItem>
                  <SelectItem value="career">Career Mentorship</SelectItem>
                  <SelectItem value="travel">Travel Advisory</SelectItem>
                  <SelectItem value="student">Student Program</SelectItem>
                </SelectContent>
              </Select>
              {(pillar === "student" || pillar === "travel") && (
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger className="bg-card"><SelectValue placeholder="Academic level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HS">High School</SelectItem>
                    <SelectItem value="UG">Undergraduate</SelectItem>
                    <SelectItem value="Grad">Graduate</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <Button onClick={() => pillar && setStep(2)} disabled={!pillar} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold py-5">Continue</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 max-w-md mx-auto">
              <h2 className="font-serif text-2xl font-bold text-primary text-center mb-6">Your Information</h2>
              <Input placeholder="Full Name" required className="bg-card" />
              <Input type="email" placeholder="Email Address" required className="bg-card" />
              <Input placeholder="Phone (optional)" className="bg-card" />
              <Input placeholder="Country of Residence" className="bg-card" />
              {pillar === "travel" && <Input placeholder="Destination Country" className="bg-card" />}
              {pillar === "business" && (
                <>
                  <Input placeholder="Company Name" className="bg-card" />
                  <Input placeholder="Industry" className="bg-card" />
                  <Textarea placeholder="Describe your business challenge..." rows={3} className="bg-card" />
                </>
              )}
              {pillar === "career" && (
                <>
                  <Input placeholder="Current Role" className="bg-card" />
                  <Input placeholder="Target Role" className="bg-card" />
                </>
              )}
              {(pillar === "student" && level === "PhD") && <Textarea placeholder="Brief research proposal outline..." rows={3} className="bg-card" />}
              {(pillar === "student" && level === "Grad") && <Textarea placeholder="Research interests..." rows={3} className="bg-card" />}
              <Textarea placeholder="Program goals and motivations" rows={3} className="bg-card" />
              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} className="bg-gold text-navy hover:bg-gold/90 font-semibold">Continue</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 max-w-md mx-auto">
              <h2 className="font-serif text-2xl font-bold text-primary text-center mb-6">Upload Documents</h2>
              <p className="text-muted-foreground text-sm text-center mb-4">Upload required documents for your application. Supported: PDF, DOC, JPG, PNG.</p>
              <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-accent transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Drag files here or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">Max 10MB per file</p>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => setStep(4)} className="bg-gold text-navy hover:bg-gold/90 font-semibold">Continue</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 max-w-md mx-auto">
              <h2 className="font-serif text-2xl font-bold text-primary text-center mb-6">Review & Submit</h2>
              <div className="bg-off-white rounded-lg p-6 text-sm space-y-2">
                <p><span className="font-semibold">Track:</span> {pillar}</p>
                {level && <p><span className="font-semibold">Level:</span> {level}</p>}
                <p className="text-muted-foreground text-xs mt-3">Please review your information before submitting.</p>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                <Button onClick={() => setSubmitted(true)} className="bg-gold text-navy hover:bg-gold/90 font-semibold">Submit Application</Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Apply;
