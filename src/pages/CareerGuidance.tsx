import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCheck, BookOpen, Award, Compass } from "lucide-react";

const programs = [
  { icon: UserCheck, title: "1-on-1 Mentorship", desc: "Personalized guidance from industry professionals aligned with your career goals." },
  { icon: BookOpen, title: "Career Workshops", desc: "Hands-on workshops covering resume building, interview skills, and personal branding." },
  { icon: Award, title: "Leadership Development", desc: "Structured programs designed to accelerate your professional growth and leadership potential." },
  { icon: Compass, title: "Career Transition Support", desc: "Expert support for professionals navigating career changes or entering new industries." },
];

const CareerGuidance = () => (
  <div>
    <section className="bg-navy section-padding">
      <div className="container-wide">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 block">Career Guidance & Mentorship</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Navigate Your Career with Confidence
          </h1>
          <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
            Connect with experienced mentors and access tailored programs designed to help you achieve your professional aspirations.
          </p>
          <Link to="/book?pillar=career">
            <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">
              Book a Mentorship Session
            </Button>
          </Link>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-wide">
        <h2 className="font-serif text-3xl font-bold text-primary mb-10">Programs & Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div key={p.title} className="bg-card border border-border rounded-xl p-8 card-hover">
              <p.icon className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-serif text-lg font-semibold text-primary mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-navy section-padding">
      <div className="container-narrow text-center">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">Ready to Find Your Path?</h2>
        <p className="text-primary-foreground/70 mb-8">Book a mentorship session and start building the career you deserve.</p>
        <Link to="/book?pillar=career">
          <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">Book a Mentorship Session</Button>
        </Link>
      </div>
    </section>
  </div>
);

export default CareerGuidance;
