import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const levelData: Record<string, { title: string; subtitle: string; programs: string[]; requirements: string[]; docs: string[] }> = {
  "high-school": {
    title: "High School",
    subtitle: "Boarding school and exchange program support for students beginning their international academic journey.",
    programs: ["Boarding School Placement", "Exchange Programs", "Summer Academic Programs", "Language Immersion"],
    requirements: ["Academic transcripts", "English proficiency test", "Letter of recommendation", "Personal statement", "Guardian consent"],
    docs: ["Passport copy", "School transcripts", "Recommendation letters", "Financial proof", "Health records"],
  },
  undergraduate: {
    title: "Undergraduate",
    subtitle: "University admissions guidance, scholarship support, and complete enrollment assistance.",
    programs: ["University Admissions", "Scholarship Applications", "Transfer Programs", "Foundation Year"],
    requirements: ["High school diploma", "Standardized test scores", "English proficiency", "Personal statement", "Letters of recommendation"],
    docs: ["Passport copy", "Transcripts", "Test scores", "Financial documents", "Recommendation letters"],
  },
  graduate: {
    title: "Graduate",
    subtitle: "Master's programs, research opportunities, and funding guidance for aspiring professionals.",
    programs: ["Master's Admissions", "Research Placements", "Fellowship Applications", "Professional Development"],
    requirements: ["Bachelor's degree", "GRE/GMAT (program dependent)", "Research statement", "Professional CV", "Academic references"],
    docs: ["Passport copy", "Degree certificates", "Transcripts", "CV/Resume", "Research proposal"],
  },
  phd: {
    title: "PhD",
    subtitle: "Doctoral program applications, research placements, and supervisor matching services.",
    programs: ["PhD Admissions", "Research Proposals", "Supervisor Matching", "Funding & Grants"],
    requirements: ["Master's degree", "Research proposal", "Publication record (preferred)", "Academic references", "Supervisor alignment"],
    docs: ["Passport copy", "Degree certificates", "Research proposal", "Publications", "Reference letters"],
  },
};

const levelCodes: Record<string, string> = { "high-school": "HS", undergraduate: "UG", graduate: "Grad", phd: "PhD" };

const StudentLevelPage = () => {
  const { level } = useParams<{ level: string }>();
  const data = levelData[level || ""] || levelData.undergraduate;
  const code = levelCodes[level || ""] || "UG";

  return (
    <div>
      <section className="bg-navy section-padding">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 block">Travel Advisory / {data.title}</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">{data.title} Programs</h1>
            <p className="text-primary-foreground/70 text-lg mb-8">{data.subtitle}</p>
            <Link to={`/apply?pillar=student&level=${code}`}>
              <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">Apply for {data.title} Program</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <h2 className="font-serif text-3xl font-bold text-primary mb-8">Available Programs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.programs.map((p) => (
              <div key={p} className="bg-card border border-border rounded-xl p-6 card-hover">
                <h3 className="font-serif text-lg font-semibold text-primary">{p}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-off-white">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">Minimum Requirements</h2>
            <ul className="space-y-3">
              {data.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-foreground"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">Documentation Checklist</h2>
            <ul className="space-y-3">
              {data.docs.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-foreground"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-navy section-padding">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">Ready to Apply?</h2>
          <p className="text-primary-foreground/70 mb-8">Start your {data.title.toLowerCase()} application today.</p>
          <Link to={`/apply?pillar=student&level=${code}`}>
            <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">Start Application</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StudentLevelPage;
