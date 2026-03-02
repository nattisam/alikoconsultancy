import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, CheckSquare, Download } from "lucide-react";
import resourcesThumb from "@/assets/resources-thumb.jpg";
import resBusinessPlan from "@/assets/res-business-plan.jpg";
import resCareerTransition from "@/assets/res-career-transition.jpg";
import resStudyAbroad from "@/assets/res-study-abroad.jpg";
import resVisaGuide from "@/assets/res-visa-guide.jpg";
import resInterviewPrep from "@/assets/res-interview-prep.jpg";
import resMarketEntry from "@/assets/res-market-entry.jpg";

const sampleResources = [
  { title: "Business Plan Template", type: "Template", category: "Business", summary: "A comprehensive template to structure your business plan for investors and stakeholders.", image: resBusinessPlan },
  { title: "Career Transition Guide", type: "Guide", category: "Career", summary: "Step-by-step guide for professionals navigating a career change or industry switch.", image: resCareerTransition },
  { title: "Study Abroad Checklist", type: "Checklist", category: "Travel", summary: "Everything you need to prepare for your study abroad journey, organized by timeline.", image: resStudyAbroad },
  { title: "Visa Application Guide", type: "Guide", category: "Travel", summary: "Detailed walkthrough of the visa application process for popular study destinations.", image: resVisaGuide },
  { title: "Interview Preparation Kit", type: "Guide", category: "Career", summary: "Proven strategies and frameworks to ace your next job or admissions interview.", image: resInterviewPrep },
  { title: "Market Entry Strategy", type: "Article", category: "Business", summary: "How to evaluate and enter new markets with a data-driven approach.", image: resMarketEntry },
];

const typeIcons: Record<string, typeof FileText> = {
  Template: FileText,
  Guide: BookOpen,
  Checklist: CheckSquare,
  Article: FileText,
};

const categoryColors: Record<string, string> = {
  Business: "bg-accent/10 text-accent",
  Career: "bg-secondary/10 text-secondary",
  Travel: "bg-primary/10 text-primary",
};

const Resources = () => (
  <div>
    {/* Hero with Image */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${resourcesThumb})` }} />
      <div className="absolute inset-0 bg-navy/85" />
      <div className="relative container-wide px-4 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-4 block">Resources</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Knowledge Hub</h1>
          <p className="text-primary-foreground/70 text-lg">Guides, templates, and tools to support your journey.</p>
        </div>
      </div>
    </section>

    {/* Resources Grid */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleResources.map((r) => {
            const Icon = typeIcons[r.type] || FileText;
            return (
              <div key={r.title} className="bg-card border border-border rounded-xl overflow-hidden card-hover group">
                <div className="aspect-[16/9] bg-muted overflow-hidden">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${categoryColors[r.category] || "bg-muted text-muted-foreground"}`}>{r.category}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Icon className="w-3 h-3" />{r.type}</span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-2">{r.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{r.summary}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all">
                    <Download className="w-4 h-4" /> Access Resource
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="relative container-narrow text-center section-padding">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">Need Personalized Guidance?</h2>
        <p className="text-primary-foreground/70 mb-8">Our consultants can help you apply these resources to your unique situation.</p>
        <Link to="/book"><Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">Book Consultation</Button></Link>
      </div>
    </section>
  </div>
);

export default Resources;
