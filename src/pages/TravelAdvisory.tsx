import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Users, Globe, ArrowRight } from "lucide-react";
import pillarTravel from "@/assets/pillar-travel.jpg";
import studentTravel from "@/assets/student-travel.jpg";

const categories = [
  { icon: GraduationCap, title: "Student Travel", desc: "Study abroad guidance for all academic levels. Visa, applications, and enrollment support.", href: "/travel-advisory/undergraduate" },
  { icon: Users, title: "Visitor Travel", desc: "Tourist and family visit visa consulting, travel planning, and itinerary support.", href: "/contact" },
  { icon: Briefcase, title: "Business Travel", desc: "Corporate relocation, work permits, and business visa advisory services.", href: "/contact" },
  { icon: Globe, title: "Other Travel Consulting", desc: "Immigration consultations, cultural transition support, and custom advisory.", href: "/contact" },
];

const levels = [
  { title: "High School", href: "/travel-advisory/high-school", desc: "Boarding school and exchange program support." },
  { title: "Undergraduate", href: "/travel-advisory/undergraduate", desc: "University admissions and scholarship guidance." },
  { title: "Graduate", href: "/travel-advisory/graduate", desc: "Master's programs, research opportunities, and funding." },
  { title: "PhD", href: "/travel-advisory/phd", desc: "Doctoral program applications and research placements." },
];

const TravelAdvisory = () => (
  <div>
    {/* Hero with Image */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pillarTravel})` }} />
      <div className="absolute inset-0 bg-navy/85" />
      <div className="relative container-wide px-4 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-4 block">Travel Advisory</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Your Global Journey, Simplified
          </h1>
          <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
            Comprehensive travel consulting for students, families, and professionals.
            From visa applications to relocation support, we guide every step.
          </p>
          <Link to="/apply?pillar=travel">
            <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">
              Start Your Travel Process
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Travel Categories */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">Travel Categories</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Specialized services for every type of international journey.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((c) => (
            <Link key={c.title} to={c.href} className="bg-card border border-border rounded-xl p-8 card-hover group">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <c.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary mb-2">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{c.desc}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Student Levels with Image */}
    <section className="section-padding bg-off-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">Student Academic Levels</h2>
            <p className="text-muted-foreground mb-8">Tailored support for every stage of your academic journey.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {levels.map((l) => (
                <Link key={l.title} to={l.href} className="bg-card border border-border rounded-xl p-5 card-hover group">
                  <h3 className="font-serif text-lg font-semibold text-primary mb-1">{l.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{l.desc}</p>
                  <span className="text-sm font-medium text-accent">Explore <ArrowRight className="inline w-3 h-3" /></span>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={studentTravel} alt="Student studying abroad" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="relative container-narrow text-center section-padding">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">Start Your Travel Process</h2>
        <p className="text-primary-foreground/70 mb-8">Submit an application or send us a quick inquiry.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/apply?pillar=travel"><Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">Apply Now</Button></Link>
          <Link to="/contact"><Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6">Contact Us</Button></Link>
        </div>
      </div>
    </section>
  </div>
);

export default TravelAdvisory;
