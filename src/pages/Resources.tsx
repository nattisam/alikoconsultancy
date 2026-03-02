import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, CheckSquare, Download } from "lucide-react";
import resourcesThumb from "@/assets/resources-thumb.jpg";

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
            <p className="text-primary-foreground/70 text-lg">Guides, templates, and tools to support your journey.</p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding">
        <div className="container-wide">
          {loading ? (
            <p className="text-center text-muted-foreground py-12">Loading resources…</p>
          ) : resources.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No resources available yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {resources.map((r) => {
                const Icon = typeIcons[r.resource_type] || FileText;
                return (
                  <div key={r.id} className="group bg-card rounded-xl overflow-hidden border border-border card-hover">
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={r.thumbnail_url || resourcesThumb}
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
