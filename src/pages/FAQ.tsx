import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const faqs = [
  { category: "General", q: "What services does Aliko Consultancy offer?", a: "We offer three core services: Business Consulting, Career Guidance & Mentorship, and Travel Advisory including student programs at all academic levels." },
  { category: "General", q: "How do I get started?", a: "You can book a free discovery call through our booking page, submit an application through the application portal, or contact us directly." },
  { category: "Business", q: "What types of businesses do you work with?", a: "We work with startups, SMEs, and established businesses across technology, healthcare, finance, retail, and many other industries." },
  { category: "Career", q: "How does the mentorship program work?", a: "You are matched with an experienced mentor in your field of interest. Sessions are tailored to your goals and can cover career strategy, skill development, and professional networking." },
  { category: "Travel", q: "What student visa support do you provide?", a: "We provide end-to-end support including university selection, application preparation, visa documentation, and pre-departure orientation." },
  { category: "Travel", q: "How long does the travel advisory process take?", a: "Timelines vary by destination and visa type. Typically, the process takes 4 to 12 weeks from initial consultation to visa decision." },
  { category: "General", q: "What is your refund policy?", a: "Please refer to our refund policy page for detailed information on cancellations and refunds." },
];

const FAQ = () => (
  <div>
    <section className="bg-navy section-padding">
      <div className="container-wide">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 block">FAQ</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Frequently Asked Questions</h1>
          <p className="text-primary-foreground/70 text-lg">Find answers to common questions about our services.</p>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 bg-card">
              <AccordionTrigger className="text-left font-serif text-base font-semibold text-primary hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    <section className="bg-navy section-padding">
      <div className="container-narrow text-center">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">Still Have Questions?</h2>
        <p className="text-primary-foreground/70 mb-8">Our team is here to help.</p>
        <Link to="/contact"><Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">Contact Us</Button></Link>
      </div>
    </section>
  </div>
);

export default FAQ;
