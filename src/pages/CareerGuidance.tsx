import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCheck, BookOpen, Award, Compass, ArrowRight, PenTool, FileText, Mail, CheckCircle2, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import pillarCareer from "@/assets/pillar-career.jpg";

const programs = [
  { icon: UserCheck, title: "1-on-1 Mentorship", desc: "Personalized guidance from industry professionals aligned with your career goals.", cardClass: "card-navy" },
  { icon: BookOpen, title: "Career Workshops", desc: "Hands-on workshops covering resume building, interview skills, and personal branding.", cardClass: "card-forest" },
  { icon: Award, title: "Leadership Development", desc: "Structured programs designed to accelerate your professional growth and leadership potential.", cardClass: "card-teal" },
  { icon: Compass, title: "Career Transition Support", desc: "Expert support for professionals navigating career changes or entering new industries.", cardClass: "card-navy" },
];

const successMetrics = [
  { value: "200+", label: "Mentees Placed" },
  { value: "85%", label: "Career Advancement" },
  { value: "50+", label: "Industry Mentors" },
  { value: "4.9/5", label: "Client Rating" },
];

const writingGuide = [
  { name: "Professional CV / Resume", desc: "A well-structured document highlighting your education, skills, work experience, and achievements. Essential for every application.", tips: ["Tailor it to each position or program", "Use action verbs and quantify achievements", "Keep it to 1–2 pages maximum", "Include relevant extracurricular activities"] },
  { name: "Personal Statement", desc: "A critical 1-page essay outlining your life journey, character, academic interests, relevant skills, and motivation for a specific course or role.", tips: ["Use a story-driven tone", "Mention soft skills naturally", "Stay within 500–750 words", "Show genuine motivation"] },
  { name: "Statement of Purpose (SOP)", desc: "A 1–2 page essay defining your academic/professional journey, career goals, and motivation. Ideal for graduate applications and career pivots.", tips: ["Maintain a professional tone", "Connect past experience to future goals", "Stay within 500–1,000 words", "Be specific about why this program/company"] },
  { name: "Motivational Letter", desc: "A one-page document explaining why you are applying, why you are a perfect fit, and your future goals.", tips: ["Keep it concise and professional", "Highlight unique value you bring", "Show awareness of the organization", "Stay within 500–750 words"] },
];

const professorOutreach = [
  { step: "1", title: "Prepare Your Profile", desc: "Ensure your email name is professional and your CV is polished before reaching out." },
  { step: "2", title: "Research the University & Department", desc: "Understand the professor's research interests and recent publications." },
  { step: "3", title: "Find the Right Professor", desc: "Identify professors whose research aligns with your interests using university faculty pages." },
  { step: "4", title: "Craft a Compelling Email", desc: "Write a concise, personalized email expressing genuine interest in their work and how your skills align." },
];

const CareerGuidance = () => (
  <div>
    {/* Hero with Image */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${pillarCareer})` }} />
      <div className="absolute inset-0 bg-navy/85" />
      <div className="relative container-wide px-4 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-4 block">Career Guidance & Mentorship</span>
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

    {/* Metrics Bar */}
    <section className="bg-card border-b border-border">
      <div className="container-wide py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {successMetrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-serif text-3xl font-bold text-accent mb-1">{m.value}</p>
              <p className="text-muted-foreground text-sm">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Programs */}
    <section className="section-padding bg-gradient-warm">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">Programs & Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Tailored programs to accelerate your professional journey.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div key={p.title} className={`${p.cardClass} rounded-xl p-8 card-hover group`}>
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/15 flex items-center justify-center mb-5">
                <p.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary-foreground mb-2">{p.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CV & Essay Writing Guide - Moved to Resources/Knowledge Hub */}
    <section className="section-padding bg-off-white">
      <div className="container-wide">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">
            <PenTool className="w-7 h-7 inline-block mr-2 text-accent -mt-1" />
            CV & Application Writing Resources
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Access our comprehensive guides, templates, and tips for crafting compelling CVs, resumes, and application documents.</p>
          <Link to="/resources">
            <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-5">
              <ArrowRight className="w-4 h-4 mr-2" /> Visit Knowledge Hub
            </Button>
          </Link>
        </div>
      </div>
    </section>

    {/* Professor Outreach Guide */}
    <section className="section-padding bg-warm-beige">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">
            <Mail className="w-7 h-7 inline-block mr-2 text-accent -mt-1" />
            How to Reach Out to Professors
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">A step-by-step guide for contacting professors for research and graduate opportunities.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {professorOutreach.map((s, i) => {
            const cardStyles = ["card-navy-subtle", "card-gold-subtle", "card-teal-subtle", "card-forest-subtle"];
            return (
              <div key={s.step} className={`${cardStyles[i]} rounded-xl p-6 text-center card-hover`}>
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-bold text-lg">{s.step}</span>
                </div>
                <h3 className="font-serif text-base font-semibold text-primary mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Image + Text Section */}
    <section className="section-padding bg-off-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
            <img src={pillarCareer} alt="Career mentorship session" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">Your Career Partner</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you are starting out, seeking advancement, or making a career change, our mentors bring real-world experience and proven strategies to guide you.
            </p>
            <ul className="space-y-3 mb-8">
              {["Personalized career roadmaps", "Industry-specific mentors", "Interview and resume coaching", "Networking opportunities", "Financial aid & scholarship guidance", "English proficiency exam preparation"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/book?pillar=career">
              <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold">Get Started <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="relative container-narrow text-center section-padding">
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
