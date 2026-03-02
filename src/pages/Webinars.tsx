import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, ArrowRight } from "lucide-react";
import webinarThumb from "@/assets/webinar-thumb.jpg";

const sampleWebinars = [
  { title: "Navigating the US Student Visa Process", level: "Undergraduate", date: "March 15, 2026", duration: "60 min", status: "upcoming" as const },
  { title: "Building a Scalable Business Model", level: "Business", date: "March 22, 2026", duration: "45 min", status: "upcoming" as const },
  { title: "Career Transition Masterclass", level: "Career", date: "February 28, 2026", duration: "90 min", status: "past" as const },
  { title: "PhD Application Strategy", level: "PhD", date: "February 10, 2026", duration: "60 min", status: "past" as const },
];

const Webinars = () => (
  <div>
    {/* Hero with Image */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${webinarThumb})` }} />
      <div className="absolute inset-0 bg-navy/85" />
      <div className="relative container-wide px-4 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-4 block">Webinars</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Live & Recorded Sessions</h1>
          <p className="text-primary-foreground/70 text-lg">Join expert-led webinars on business, career, and travel topics.</p>
        </div>
      </div>
    </section>

    {/* Upcoming */}
    <section className="section-padding">
      <div className="container-wide">
        <h2 className="font-serif text-2xl font-bold text-primary mb-8">Upcoming</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {sampleWebinars.filter(w => w.status === "upcoming").map((w) => (
            <div key={w.title} className="bg-card border border-border rounded-xl overflow-hidden card-hover group">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={webinarThumb} alt={w.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-3">{w.level}</span>
                <h3 className="font-serif text-lg font-semibold text-primary mb-3">{w.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{w.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{w.duration}</span>
                </div>
                <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold text-sm">Register Now</Button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-serif text-2xl font-bold text-primary mb-8">Past Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleWebinars.filter(w => w.status === "past").map((w) => (
            <div key={w.title} className="bg-card border border-border rounded-xl overflow-hidden group">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img src={webinarThumb} alt={w.title} className="w-full h-full object-cover opacity-60" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-card/90 flex items-center justify-center">
                    <Video className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{w.level}</span>
                <h3 className="font-serif text-lg font-semibold text-primary mb-3">{w.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{w.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{w.duration}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">Watch Recording <ArrowRight className="w-4 h-4" /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Webinars;
