import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, CheckSquare, Download } from "lucide-react";

const sampleResources = [
  { title: "Business Plan Template", type: "Template", category: "Business", summary: "A comprehensive template to structure your business plan for investors and stakeholders." },
  { title: "Career Transition Guide", type: "Guide", category: "Career", summary: "Step-by-step guide for professionals navigating a career change or industry switch." },
  { title: "Study Abroad Checklist", type: "Checklist", category: "Travel", summary: "Everything you need to prepare for your study abroad journey, organized by timeline." },
  { title: "Visa Application Guide", type: "Guide", category: "Travel", summary: "Detailed walkthrough of the visa application process for popular study destinations." },
  { title: "Interview Preparation Kit", type: "Guide", category: "Career", summary: "Proven strategies and frameworks to ace your next job or admissions interview." },
  { title: "Market Entry Strategy", type: "Article", category: "Business", summary: "How to evaluate and enter new markets with a data-driven approach." },
];

const typeIcons: Record<string, typeof FileText> = {
  Template: FileText,
  Guide: BookOpen,
  Checklist: CheckSquare,
  Article: FileText,
};

const Resources = () => (
  <div>
    <section className="bg-navy section-padding">
      <div className="container-wide">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 block">Resources</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Knowledge Hub</h1>
          <p className="text-primary-foreground/70 text-lg">Guides, templates, and tools to support your journey.</p>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleResources.map((r) => {
            const Icon = typeIcons[r.type] || FileText;
            return (
              <div key={r.title} className="bg-card border border-border rounded-xl p-6 card-hover">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">{r.category}</span>
                  <span className="text-xs text-muted-foreground">/</span>
                  <span className="text-xs text-muted-foreground">{r.type}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-primary mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{r.summary}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                  <Download className="w-4 h-4" /> Access Resource
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="bg-navy section-padding">
      <div className="container-narrow text-center">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">Need Personalized Guidance?</h2>
        <p className="text-primary-foreground/70 mb-8">Our consultants can help you apply these resources to your unique situation.</p>
        <Link to="/book"><Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">Book Consultation</Button></Link>
      </div>
    </section>
  </div>
);

export default Resources;
