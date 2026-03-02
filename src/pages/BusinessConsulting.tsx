import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Target, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import pillarBusiness from "@/assets/pillar-business.jpg";

const services = [
  { icon: Target, title: "Market Entry Strategy", desc: "Navigate new markets with data-driven insights and proven frameworks.", cardClass: "card-navy" },
  { icon: BarChart3, title: "Operational Excellence", desc: "Streamline processes and optimize performance across your organization.", cardClass: "card-forest" },
  { icon: TrendingUp, title: "Growth & Scaling", desc: "Develop sustainable growth strategies tailored to your business stage.", cardClass: "card-teal" },
  { icon: Users, title: "Team & Leadership", desc: "Build high-performing teams and develop leadership capabilities.", cardClass: "card-navy" },
];

const outcomes = [
  "Revenue growth acceleration",
  "Operational cost reduction",
  "Market expansion strategy",
  "Leadership development",
  "Process optimization",
  "Investor readiness",
];

const BusinessConsulting = () => (
  <div>
    {/* Hero with Image */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pillarBusiness})` }} />
      <div className="absolute inset-0 bg-navy/85" />
      <div className="relative container-wide px-4 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-4 block">Business Consulting</span>
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

    {/* Services Grid */}
    <section className="section-padding bg-gradient-warm">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Comprehensive solutions for every stage of your business journey.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className={`${s.cardClass} rounded-xl p-8 card-hover group`}>
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/15 flex items-center justify-center mb-5">
                <s.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary-foreground mb-2">{s.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Outcomes Section */}
    <section className="section-padding bg-off-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">Outcomes You Can Expect</h2>
            <p className="text-muted-foreground mb-8">We focus on measurable results that drive real business impact.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {outcomes.map((o) => (
                <div key={o} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-primary font-medium">{o}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={pillarBusiness} alt="Business consulting session" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    {/* Industries */}
    <section className="section-padding bg-gradient-cool">
      <div className="container-wide">
        <h2 className="font-serif text-3xl font-bold text-primary mb-4 text-center">Industries We Serve</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-xl mx-auto">We bring cross-sector expertise to every engagement.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "Technology", style: "card-navy-subtle" },
            { name: "Healthcare", style: "card-teal-subtle" },
            { name: "Finance", style: "card-gold-subtle" },
            { name: "Retail", style: "card-forest-subtle" },
            { name: "Manufacturing", style: "card-navy-subtle" },
            { name: "Education", style: "card-teal-subtle" },
            { name: "Real Estate", style: "card-gold-subtle" },
            { name: "Non-Profit", style: "card-forest-subtle" },
          ].map((ind) => (
            <div key={ind.name} className={`${ind.style} rounded-xl px-5 py-5 text-center card-hover`}>
              <span className="text-sm font-semibold text-primary">{ind.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="relative container-narrow text-center section-padding">
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
