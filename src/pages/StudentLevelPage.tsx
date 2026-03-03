import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, Compass, BookOpen, Info, Globe, Calendar, PenTool, GraduationCap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import bgHighschool from "@/assets/bg-highschool.jpg";
import bgUndergraduate from "@/assets/bg-undergraduate.jpg";
import bgGraduate from "@/assets/bg-graduate.jpg";
import bgPhd from "@/assets/bg-phd.jpg";

const guidanceSteps = [
  { step: 1, title: "General Overview & Introduction", desc: "Deep-dive into the guidance process, discussing your first steps, how to start, and setting clear goals for your application journey." },
  { step: 2, title: "Scholarship Research & Opportunities", desc: "Research universities, explore scholarship databases, understand deadlines, and learn how to rank and prioritize your choices." },
  { step: 3, title: "Essay, CV & Extracurricular", desc: "Learn to craft compelling Common App essays, personal statements, SOPs, motivational letters, and supplemental essays." },
  { step: 4, title: "Essay & CV Deep-Dive", desc: "Hands-on session with examples and detailed feedback on essay writing techniques and CV optimization." },
  { step: 5, title: "Professor Emails & Financial Aid", desc: "Master the art of reaching out to professors, understanding financial aid types, and preparing applications for funding." },
  { step: 6, title: "English Language & Standardized Exams", desc: "Overview of required exams (TOEFL, IELTS, GRE, GMAT), minimum scores, accepted countries, and test waiver options." },
  { step: 7, title: "Visa Application Guidance", desc: "Step-by-step overview of visa application processes for different countries, including tips and common requirements." },
];

const usefulPlatforms = [
  { name: "Corsava", url: "https://www.corsava.com", desc: "Discover your ideal college fit through a gamified card-sorting activity." },
  { name: "Scholarships.com", url: "https://www.scholarships.com", desc: "Comprehensive scholarship search database." },
  { name: "IEFA.org", url: "https://www.iefa.org", desc: "International Financial Aid & College Scholarship Search." },
  { name: "ScholarshipPortal", url: "https://www.scholarshipportal.com", desc: "EU-focused scholarships and funding opportunities." },
  { name: "Fulbright Program", url: "https://www.fulbright.org", desc: "U.S. Government-funded international exchange program." },
  { name: "DAAD Scholarship Database", url: "https://www.daad.de", desc: "Germany's main scholarship database for international students." },
];

const universityRankings = [
  { name: "QS World University Rankings", url: "https://www.topuniversities.com" },
  { name: "Times Higher Education (THE)", url: "https://www.timeshighereducation.com" },
  { name: "US News Global Rankings", url: "https://www.usnews.com/education/best-global-universities" },
];

const applicationDeadlines = [
  { region: "USA (Undergrad)", details: [
    "Early Decision: Nov 1–15",
    "Regular Decision: Jan 1–15",
    "Rolling Admission: After January (applying after July not recommended for internationals)",
  ]},
  { region: "USA (Master's)", details: [
    "Fall Intake: August – February",
    "Spring Intake: Starts from January",
  ]},
  { region: "Canada (Master's)", details: ["Fall Intake: January – February"] },
  { region: "UK (Undergrad)", details: ["October 15 is usually the deadline"] },
  { region: "Europe", details: ["January – April"] },
  { region: "China", details: ["September Intake: December – April"] },
];

const essayTypes = [
  { name: "Common App Essay", desc: "Personal statement submitted to multiple US colleges. Showcases character, background, and unique voice.", tone: "Personal, emotional, reflective", wordLimit: "450–650 words", audience: "US Undergrad" },
  { name: "Personal Statement", desc: "A critical 1-page essay outlining your life journey, character, academic interests, and motivation.", tone: "Story-driven", wordLimit: "500–750 words", audience: "General" },
  { name: "Statement of Purpose (SOP)", desc: "A 1–2 page essay defining your academic/professional journey and career goals.", tone: "Professional", wordLimit: "500–1,000 words", audience: "Master's & PhD" },
  { name: "Motivational Letter", desc: "Explains why you're applying, why you're a perfect fit, and your future goals.", tone: "Professional", wordLimit: "500–750 words", audience: "General" },
  { name: "Supplemental Essay", desc: "Short, school-specific prompts required in addition to the main essay. Common in US & Canada.", tone: "Semi-professional", wordLimit: "250–450 words", audience: "US & Canada" },
];

const essayDos = [
  "Be specific: name programs, professors, clubs, and campus values",
  "Show alignment: connect their offerings to your goals",
  "Make it personal: reference your experiences, not just their brochure",
  "Stick to the word limit",
];

const essayDonts = [
  "Don't copy-paste between schools",
  "Don't focus on prestige alone",
  "Don't list facts without tying them to your own journey",
];

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

      {/* Our Structured Guidance Process */}
      <section className="section-padding bg-off-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">Our 7-Session Guidance Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A structured, step-by-step approach conducted via Zoom sessions with resources shared at every stage to ensure your success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {guidanceSteps.map((s, i) => {
              const cardStyles = ["card-navy", "card-forest", "card-teal", "card-navy", "card-forest", "card-teal", "card-navy"];
              return (
                <div key={s.step} className={`${cardStyles[i]} rounded-xl p-6 card-hover`}>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-3 block">Session {s.step}</span>
                  <h3 className="font-serif text-lg font-semibold text-primary-foreground mb-2">{s.title}</h3>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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

      {/* Application Deadlines */}
      <section className="section-padding bg-warm-beige">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              <Calendar className="w-7 h-7 inline-block mr-2 text-accent -mt-1" />
              Application Deadlines by Region
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Plan ahead with key deadlines for universities worldwide.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {applicationDeadlines.map((d) => (
              <div key={d.region} className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-serif text-lg font-semibold text-primary mb-4">{d.region}</h3>
                <ul className="space-y-2">
                  {d.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Essay Writing Guide */}
      <section className="section-padding bg-gradient-cool">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              <PenTool className="w-7 h-7 inline-block mr-2 text-accent -mt-1" />
              Essay Writing Guide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Understanding the different types of application essays and how to craft them effectively.</p>
          </div>

          <Accordion type="single" collapsible className="mb-10">
            {essayTypes.map((essay) => (
              <AccordionItem key={essay.name} value={essay.name} className="bg-card border border-border rounded-xl mb-3 px-6">
                <AccordionTrigger className="font-serif text-base font-semibold text-primary hover:no-underline">
                  <span className="flex items-center gap-3">
                    {essay.name}
                    <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{essay.audience}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm mb-3">{essay.desc}</p>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">Tone: {essay.tone}</span>
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium">{essay.wordLimit}</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-forest-subtle rounded-xl p-8">
              <h3 className="font-serif text-xl font-semibold text-primary mb-4">✓ Do's</h3>
              <ul className="space-y-3">
                {essayDos.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-navy-subtle rounded-xl p-8">
              <h3 className="font-serif text-xl font-semibold text-primary mb-4">✗ Don'ts</h3>
              <ul className="space-y-3">
                {essayDonts.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-foreground">
                    <Info className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Useful Platforms & Rankings */}
      <section className="section-padding bg-off-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              <Globe className="w-7 h-7 inline-block mr-2 text-accent -mt-1" />
              Useful Platforms & Resources
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Curated tools and databases to help you research universities and find scholarships.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {usefulPlatforms.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="bg-card border border-border rounded-xl p-6 card-hover group">
                <h3 className="font-serif text-base font-semibold text-primary mb-2 group-hover:text-accent transition-colors">{p.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                <span className="inline-flex items-center gap-2 text-xs font-medium text-accent mt-3">
                  Visit Site <ArrowRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>

          <div className="card-gold-subtle rounded-xl p-8">
            <h3 className="font-serif text-xl font-semibold text-primary mb-5">
              <GraduationCap className="w-5 h-5 inline-block mr-2 text-accent -mt-1" />
              World University Rankings
            </h3>
            <p className="text-muted-foreground text-sm mb-4">Filter by country, subject, and tuition affordability to find your best fit.</p>
            <div className="flex flex-wrap gap-4">
              {universityRankings.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
                  {r.name} <ArrowRight className="w-3 h-3" />
                </a>
              ))}
            </div>
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
