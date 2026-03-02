import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message Sent", description: "We'll get back to you within 24 hours." });
    }, 1000);
  };

  return (
    <div>
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 block">Contact</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Get in Touch</h1>
            <p className="text-primary-foreground/70 text-lg">We'd love to hear from you. Reach out and we'll respond within 24 hours.</p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Full Name" required className="bg-card" />
                <Input type="email" placeholder="Email Address" required className="bg-card" />
              </div>
              <Input placeholder="Subject" required className="bg-card" />
              <Textarea placeholder="Your message..." rows={5} required className="bg-card" />
              <Button type="submit" disabled={loading} className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-5">
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-primary">Email</p>
                  <p className="text-muted-foreground text-sm">hello@alikoconsultancy.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-primary">Phone</p>
                  <p className="text-muted-foreground text-sm">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-primary">Office</p>
                  <p className="text-muted-foreground text-sm">123 Business Avenue, Suite 100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
