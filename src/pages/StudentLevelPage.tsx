import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, Compass, BookOpen, Info } from "lucide-react";
import bgHighschool from "@/assets/bg-highschool.jpg";
import bgUndergraduate from "@/assets/bg-undergraduate.jpg";
import bgGraduate from "@/assets/bg-graduate.jpg";
import bgPhd from "@/assets/bg-phd.jpg";

const levelData: Record<string, { title: string; subtitle: string; bg: string; programs: { name: string; desc: string }[]; requirements: string[]; docs: string[]; ctaLabel: string; ctaLink: string }> = {
  "high-school": {
    title: "High School",
    subtitle: "Boarding school and exchange program support for students beginning their international academic journey.",
    bg: bgHighschool,
    programs: [
      { name: "Boarding School Placement", desc: "Expert placement services for top international boarding schools." },
      { name: "Exchange Programs", desc: "Cultural exchange and academic immersion experiences." },
      { name: "Summer Academic Programs", desc: "Summer programs at prestigious institutions worldwide." },
      { name: "Language Immersion", desc: "Intensive language learning experiences abroad." },
    ],
    requirements: ["Academic transcripts", "English proficiency test", "Letter of recommendation", "Personal statement", "Guardian consent"],
    docs: ["Passport copy", "School transcripts", "Recommendation letters", "Financial proof", "Health records"],
    ctaLabel: "Apply for High School Program",
    ctaLink: "/apply?pillar=student&level=HS",
  },
  undergraduate: {
    title: "Undergraduate",
    subtitle: "University admissions guidance, scholarship support, and complete enrollment assistance.",
    bg: bgUndergraduate,
    programs: [
      { name: "University Admissions", desc: "End-to-end support for university applications worldwide." },
      { name: "Scholarship Applications", desc: "Identify and apply for scholarships that match your profile." },
      { name: "Transfer Programs", desc: "Seamless credit transfer and university transition support." },
      { name: "Foundation Year", desc: "Foundation programs for academic readiness." },
    ],
    requirements: ["High school diploma", "Standardized test scores", "English proficiency", "Personal statement", "Letters of recommendation"],
    docs: ["Passport copy", "Transcripts", "Test scores", "Financial documents", "Recommendation letters"],
    ctaLabel: "Apply for Undergraduate Program",
    ctaLink: "/apply?pillar=student&level=UG",
  },
  graduate: {
    title: "Graduate",
    subtitle: "Master's programs, research opportunities, and funding guidance for aspiring professionals.",
    bg: bgGraduate,
    programs: [
      { name: "Master's Admissions", desc: "Strategic guidance for competitive master's program admissions." },
      { name: "Research Placements", desc: "Connect with research opportunities at leading institutions." },
      { name: "Fellowship Applications", desc: "Secure prestigious fellowships and grants." },
      { name: "Professional Development", desc: "Advance your career with targeted graduate programs." },
    ],
    requirements: ["Bachelor's degree", "GRE/GMAT (program dependent)", "Research statement", "Professional CV", "Academic references"],
    docs: ["Passport copy", "Degree certificates", "Transcripts", "CV/Resume", "Research proposal"],
    ctaLabel: "Apply for Graduate Program",
    ctaLink: "/apply?pillar=student&level=Grad",
  },
  phd: {
    title: "PhD",
    subtitle: "Expert advisory on the doctoral journey: understanding the process, requirements, and steps to pursue a PhD.",
    bg: bgPhd,
    programs: [
      { name: "PhD Process Overview", desc: "Understand the full doctoral journey from research interest to completion." },
      { name: "Research Proposal Guidance", desc: "Learn how to craft a compelling research proposal that stands out." },
      { name: "Supervisor Matching Advice", desc: "Guidance on identifying and approaching supervisors aligned with your interests." },
      { name: "Funding Landscape", desc: "Explore available funding options, grants, and scholarship pathways for doctoral studies." },
    ],
    requirements: ["Master's degree (typically required)", "Clear research interest", "Publication record (preferred)", "Strong academic references", "Alignment with a potential supervisor"],
    docs: ["Degree certificates", "Research proposal draft", "CV with publications", "Reference letters", "Statement of purpose"],
    ctaLabel: "Book PhD Advisory Session",
    ctaLink: "/book?pillar=student",
  },
};

const StudentLevelPage = () => {
  const { level } = useParams<{ level: string }>();
  const data = levelData[level || ""] || levelData.undergraduate;
  const isPhd = level === "phd";

  return (
    <div>
      {/* Hero with level-specific background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.bg})` }} />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="relative container-wide px-4 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-4 block">
              Travel Advisory / {data.title}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              {isPhd ? `${data.title} Advisory` : `${data.title} Programs`}
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-8">{data.subtitle}</p>
            <Link to={data.ctaLink}>
              <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">{data.ctaLabel}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PhD advisory notice */}
      {isPhd && (
        <section className="bg-gradient-warm">
          <div className="container-wide px-4 lg:px-8 py-8">
            <div className="card-gold-subtle rounded-xl p-6 flex items-start gap-4">
              <Info className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-primary mb-1">Advisory Service Only</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our PhD consultancy is purely advisory. We guide you through understanding the doctoral process, what is needed, and the overall steps involved. We do not handle or submit applications on your behalf.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Programs as Cards */}
      <section className="section-padding bg-gradient-warm">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              {isPhd ? "What We Advise On" : "Available Programs"}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {isPhd ? "Our advisory covers key areas of the doctoral journey." : "Choose the program that best fits your academic goals."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.programs.map((p, i) => {
              const styles = ["card-navy", "card-forest", "card-teal", "card-navy"];
              const icons = [Compass, BookOpen, ArrowRight, FileText];
              const Icon = icons[i] || Compass;
              return (
                <div key={p.name} className={`${styles[i]} rounded-xl p-6 card-hover`}>
                  <Icon className="w-6 h-6 text-accent mb-3" />
                  <h3 className="font-serif text-lg font-semibold text-primary-foreground mb-2">{p.name}</h3>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements & Docs */}
      <section className="section-padding bg-gradient-cool">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-gold-subtle rounded-xl p-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">
              {isPhd ? "Typical Requirements" : "Minimum Requirements"}
            </h2>
            <ul className="space-y-3">
              {data.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-teal-subtle rounded-xl p-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-6">
              {isPhd ? "Documents You Should Prepare" : "Documentation Checklist"}
            </h2>
            <ul className="space-y-3">
              {data.docs.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-foreground">
                  <FileText className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--gold)) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative container-narrow text-center section-padding">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">
            {isPhd ? "Need PhD Guidance?" : "Ready to Apply?"}
          </h2>
          <p className="text-primary-foreground/70 mb-8">
            {isPhd ? "Book an advisory session to discuss your doctoral journey." : `Start your ${data.title.toLowerCase()} application today.`}
          </p>
          <Link to={data.ctaLink}>
            <Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">
              {isPhd ? "Book Advisory Session" : "Start Application"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StudentLevelPage;
