import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, BookOpen, CheckSquare, Download, PenTool, CheckCircle2, ExternalLink, Globe, GraduationCap } from "lucide-react";
import resourcesThumb from "@/assets/resources-thumb.jpg";
import resBizPlan from "@/assets/res-biz-plan.jpg";
import resCareerGuide from "@/assets/res-career-guide.jpg";
import resTravelChecklist from "@/assets/res-travel-checklist.jpg";
import resInterview from "@/assets/res-interview.jpg";
import resMarketResearch from "@/assets/res-market-research.jpg";
import resStudyGuide from "@/assets/res-study-guide.jpg";

const fallbackThumbs = [resBizPlan, resCareerGuide, resTravelChecklist, resInterview, resMarketResearch, resStudyGuide];

const typeIcons: Record<string, typeof FileText> = {
  template: FileText,
  guide: BookOpen,
  checklist: CheckSquare,
  article: FileText,
};

const categoryColors: Record<string, string> = {
  business: "bg-accent/10 text-accent",
  career: "bg-secondary/10 text-secondary",
  travel: "bg-primary/10 text-primary",
};

const writingGuide = [
  { name: "Professional CV / Resume", desc: "A well-structured document highlighting your education, skills, work experience, and achievements. Essential for every application.", tips: ["Tailor it to each position or program", "Use action verbs and quantify achievements", "Keep it to 1–2 pages maximum", "Include relevant extracurricular activities"] },
  { name: "Personal Statement", desc: "A critical 1-page essay outlining your life journey, character, academic interests, relevant skills, and motivation for a specific course or role.", tips: ["Use a story-driven tone", "Mention soft skills naturally", "Stay within 500–750 words", "Show genuine motivation"] },
  { name: "Statement of Purpose (SOP)", desc: "A 1–2 page essay defining your academic/professional journey, career goals, and motivation. Ideal for graduate applications and career pivots.", tips: ["Maintain a professional tone", "Connect past experience to future goals", "Stay within 500–1,000 words", "Be specific about why this program/company"] },
  { name: "Motivational Letter", desc: "A one-page document explaining why you are applying, why you are a perfect fit, and your future goals.", tips: ["Keep it concise and professional", "Highlight unique value you bring", "Show awareness of the organization", "Stay within 500–750 words"] },
];

const usefulPlatforms = [
  { name: "Corsava", url: "https://www.corsava.com", desc: "Discover your ideal college fit through a gamified card-sorting activity that prioritizes campus culture, academic, and residential preferences." },
  { name: "Scholarships.com", url: "https://www.scholarships.com", desc: "Comprehensive scholarship search database with thousands of opportunities." },
  { name: "IEFA.org", url: "https://www.iefa.org", desc: "International Financial Aid & College Scholarship Search for international students." },
  { name: "ScholarshipPortal", url: "https://www.scholarshipportal.com", desc: "EU-focused scholarships and funding opportunities across Europe." },
  { name: "Fulbright Program", url: "https://www.fulbright.org", desc: "U.S. Government-funded international educational exchange program." },
  { name: "DAAD Scholarship Database", url: "https://www.daad.de", desc: "Germany's main scholarship database for international students." },
];

const universityRankings = [
  { name: "QS World University Rankings", url: "https://www.topuniversities.com" },
  { name: "Times Higher Education (THE)", url: "https://www.timeshighereducation.com" },
  { name: "US News Global Rankings", url: "https://www.usnews.com/education/best-global-universities" },
];

type Resource = {
  id: string;
  title: string;
  description: string | null;
  resource_type: string;
  consultation_type: string | null;
  thumbnail_url: string | null;
  file_url: string | null;
};

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("resources")
        .select("id, title, description, resource_type, consultation_type, thumbnail_url, file_url")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      setResources((data as Resource[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${resourcesThumb})` }} />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative container-wide px-4 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-4 block">Resources</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Knowledge Hub</h1>
            <p className="text-primary-foreground/70 text-lg">Guides, templates, tools, and curated links to support your journey.</p>
          </div>
        </div>
      </section>

      {/* CV & Application Writing Guide */}
      <section className="section-padding bg-off-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              <PenTool className="w-7 h-7 inline-block mr-2 text-accent -mt-1" />
              CV & Application Writing Guide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Master the art of writing compelling professional documents that get results.</p>
          </div>

          <Accordion type="single" collapsible>
            {writingGuide.map((item) => (
              <AccordionItem key={item.name} value={item.name} className="bg-card border border-border rounded-xl mb-3 px-6">
                <AccordionTrigger className="font-serif text-base font-semibold text-primary hover:no-underline">
                  {item.name}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm mb-4">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Useful Links & Platforms */}
      <section className="section-padding bg-warm-beige">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              <Globe className="w-7 h-7 inline-block mr-2 text-accent -mt-1" />
              Useful Links & Platforms
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Curated scholarship databases, university search tools, and resources shared with our clients.</p>
          </div>

          <div className="mb-10">
            <h3 className="font-serif text-xl font-semibold text-primary mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent" />
              Scholarship & University Search
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {usefulPlatforms.map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-xl p-6 card-hover group">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-serif text-base font-semibold text-primary">{p.name}</h4>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-primary mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              World University Rankings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {universityRankings.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="card-navy rounded-xl p-6 card-hover group flex items-center justify-between">
                  <h4 className="font-serif text-base font-semibold text-primary-foreground">{r.name}</h4>
                  <ExternalLink className="w-4 h-4 text-accent" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">Downloadable Resources</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Guides, templates, and checklists to help you at every stage.</p>
          </div>
          {loading ? (
            <p className="text-center text-muted-foreground py-12">Loading resources…</p>
          ) : resources.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No resources available yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {resources.map((r, index) => {
                const Icon = typeIcons[r.resource_type] || FileText;
                return (
                  <div key={r.id} className="group bg-card rounded-xl overflow-hidden border border-border card-hover">
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={r.thumbnail_url || fallbackThumbs[index % fallbackThumbs.length]}
                        alt={r.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 lg:p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-accent" />
                        </div>
                        {r.consultation_type && (
                          <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${categoryColors[r.consultation_type] || "bg-muted text-muted-foreground"}`}>{r.consultation_type}</span>
                        )}
                        <span className="text-xs text-muted-foreground capitalize">{r.resource_type}</span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-primary mb-3">{r.title}</h3>
                      {r.description && <p className="text-muted-foreground text-sm leading-relaxed mb-5">{r.description}</p>}
                      {r.file_url ? (
                        <a href={r.file_url} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-6 py-5 w-full">
                            <Download className="w-4 h-4 mr-2" /> Access Material
                          </Button>
                        </a>
                      ) : (
                        <Button variant="outline" className="w-full py-5 cursor-default opacity-60" disabled>
                          <FileText className="w-4 h-4 mr-2" /> Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
};

export default Resources;
