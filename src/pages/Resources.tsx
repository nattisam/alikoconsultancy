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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((r) => {
                const Icon = typeIcons[r.resource_type] || FileText;
                return (
                  <div key={r.id} className="bg-card border border-border rounded-xl overflow-hidden card-hover group">
                    {r.thumbnail_url && (
                      <div className="aspect-[16/9] bg-muted overflow-hidden">
                        <img src={r.thumbnail_url} alt={r.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" loading="lazy" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {r.consultation_type && (
                          <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${categoryColors[r.consultation_type] || "bg-muted text-muted-foreground"}`}>{r.consultation_type}</span>
                        )}
                        <span className="flex items-center gap-1 text-xs text-muted-foreground capitalize"><Icon className="w-3 h-3" />{r.resource_type}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-primary mb-2">{r.title}</h3>
                      {r.description && <p className="text-muted-foreground text-sm leading-relaxed mb-4">{r.description}</p>}
                      {r.file_url ? (
                        <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all">
                          <Download className="w-4 h-4" /> Download Resource
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <FileText className="w-4 h-4" /> Coming soon
                        </span>
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
