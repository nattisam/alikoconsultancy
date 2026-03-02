import { Link } from "react-router-dom";
import { Briefcase, GraduationCap, Plane, ArrowRight, Phone, ClipboardCheck, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const pillars = [
  {
    icon: Briefcase,
    title: "Business Consulting",
    description: "Strategic guidance for entrepreneurs and SMEs. From market entry to operational excellence.",
    href: "/business-consulting",
    cta: "Explore Business Services",
  },
  {
    icon: GraduationCap,
    title: "Career Guidance & Mentorship",
    description: "Expert career coaching and mentorship to help you navigate your professional journey with confidence.",
    href: "/career-guidance",
    cta: "Find Your Path",
  },
  {
    icon: Plane,
    title: "Travel Advisory",
    description: "Comprehensive travel consulting for students, families, and professionals. Visa, relocation, and study abroad.",
    href: "/travel-advisory",
    cta: "Start Your Journey",
  },
];

const processSteps = [
  { icon: Phone, title: "Discovery Call", description: "We start with an in-depth conversation to understand your goals, challenges, and aspirations." },
  { icon: ClipboardCheck, title: "Assessment & Strategy", description: "Our experts analyze your situation and craft a tailored roadmap aligned with your objectives." },
  { icon: Users, title: "Implementation Support", description: "Hands-on guidance through every step of your journey with dedicated support." },
  { icon: TrendingUp, title: "Follow-up & Guidance", description: "Ongoing mentorship and follow-up to ensure lasting success and continuous growth." },
];

const testimonials = [
  { name: "Sarah M.", role: "Startup Founder", quote: "Aliko Consultancy transformed our business strategy. Their expertise helped us secure funding and scale operations within 6 months.", pillar: "Business" },
  { name: "James K.", role: "Graduate Student", quote: "The career mentorship program gave me clarity on my path. I landed my dream role at a Fortune 500 company.", pillar: "Career" },
  { name: "Amira R.", role: "International Student", quote: "From visa application to university enrollment, the travel advisory team made my study abroad journey seamless.", pillar: "Travel" },
];

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative container-wide px-4 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in">
              Your Next Chapter{" "}
              <span className="text-gradient-gold">Starts Here</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.15s" }}>
              Premium consultancy in Business, Career, and Travel Advisory.
              We provide expert guidance tailored to your unique goals, helping you succeed with confidence.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/book">
                <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold text-base px-8 py-6">
                  Book Consultation
                </Button>
              </Link>
              <Link to="/business-consulting">
                <Button variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8 py-6">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="section-padding bg-off-white">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Our Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three pillars of consultancy designed to guide individuals and organizations toward their goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar) => (
              <Link
                key={pillar.title}
                to={pillar.href}
                className="group bg-card rounded-xl p-8 border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-6">
                  <pillar.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{pillar.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all">
                  {pillar.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Who We Serve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Entrepreneurs & SMEs", desc: "Strategic business consulting to help you launch, grow, and scale your ventures with confidence." },
              { title: "Students & Job Seekers", desc: "Career guidance, mentorship programs, and study abroad support to unlock your full potential." },
              { title: "Travelers & Families", desc: "Comprehensive travel advisory for visas, relocation, and international transitions." },
            ].map((item) => (
              <div key={item.title} className="text-center px-4">
                <h3 className="font-serif text-lg font-semibold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-warm-beige">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Our Process</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A proven, straightforward approach to delivering results.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-6 h-6 text-gold" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2 block">
                  Step {i + 1}
                </span>
                <h3 className="font-serif text-lg font-semibold text-primary mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-xl p-8">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-4">
                  {t.pillar}
                </span>
                <p className="text-foreground text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-sm text-primary">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy section-padding">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Schedule a free discovery call and let us help you chart the path to your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book">
              <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold text-base px-8 py-6">
                Book Consultation
              </Button>
            </Link>
            <Link to="/apply">
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
