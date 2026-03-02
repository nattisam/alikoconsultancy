import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Target, Users, ArrowRight } from "lucide-react";

const services = [
  { icon: Target, title: "Market Entry Strategy", desc: "Navigate new markets with data-driven insights and proven frameworks." },
  { icon: BarChart3, title: "Operational Excellence", desc: "Streamline processes and optimize performance across your organization." },
  { icon: TrendingUp, title: "Growth & Scaling", desc: "Develop sustainable growth strategies tailored to your business stage." },
  { icon: Users, title: "Team & Leadership", desc: "Build high-performing teams and develop leadership capabilities." },
];

const BusinessConsulting = () => (
  <div>
    <section className="bg-navy section-padding">
      <div className="container-wide">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 block">Business Consulting</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Strategic Guidance for Ambitious Businesses
          </h1>
          <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
            We partner with entrepreneurs and SMEs to build resilient strategies, optimize operations, and unlock growth opportunities.
          </p>
          <Link to="/book?pillar=business">
            <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">
              Book a Business Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-wide">
        <h2 className="font-serif text-3xl font-bold text-primary mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-card border border-border rounded-xl p-8 card-hover">
              <s.icon className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-serif text-lg font-semibold text-primary mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-off-white">
      <div className="container-wide">
        <h2 className="font-serif text-3xl font-bold text-primary mb-4">Industries We Serve</h2>
        <p className="text-muted-foreground mb-8">We bring cross-sector expertise to every engagement.</p>
        <div className="flex flex-wrap gap-3">
          {["Technology", "Healthcare", "Finance", "Retail", "Manufacturing", "Education", "Real Estate", "Non-Profit"].map((ind) => (
            <span key={ind} className="px-4 py-2 bg-card border border-border rounded-full text-sm text-primary font-medium">{ind}</span>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-navy section-padding">
      <div className="container-narrow text-center">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">Let's Build Your Strategy</h2>
        <p className="text-primary-foreground/70 mb-8">Schedule a consultation to discuss how we can help your business thrive.</p>
        <Link to="/book?pillar=business">
          <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">Book a Business Consultation</Button>
        </Link>
      </div>
    </section>
  </div>
);

export default BusinessConsulting;
