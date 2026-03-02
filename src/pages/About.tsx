import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Globe, Award, Users } from "lucide-react";

const values = [
  { icon: Heart, title: "Client-Centered", desc: "Every decision we make starts with your goals." },
  { icon: Globe, title: "Globally Connected", desc: "Partnerships and insights spanning continents." },
  { icon: Award, title: "Excellence Driven", desc: "We hold ourselves to the highest professional standards." },
  { icon: Users, title: "Approachable Expertise", desc: "Premium guidance that feels personal and human." },
];

const About = () => (
  <div>
    <section className="bg-navy section-padding">
      <div className="container-wide">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 block">About Us</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Who We Are</h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Aliko Consultancy is a premium multi-pillar consultancy dedicated to empowering individuals and organizations through expert guidance in business, career, and travel advisory.
          </p>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-serif text-3xl font-bold text-primary mb-6">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Founded with a passion for helping people navigate life's biggest transitions, Aliko Consultancy brings together seasoned professionals from business strategy, career development, and international mobility.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We believe that with the right guidance, every person and business can achieve extraordinary outcomes. Our approach is rooted in deep expertise, cultural sensitivity, and a genuine commitment to your success.
          </p>
        </div>
        <div className="bg-off-white rounded-xl p-10">
          <h3 className="font-serif text-xl font-semibold text-primary mb-4">Mission</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            To provide world-class consultancy services that empower individuals and organizations to achieve their goals with clarity, confidence, and lasting impact.
          </p>
          <h3 className="font-serif text-xl font-semibold text-primary mb-4">Vision</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            To be the most trusted consultancy partner for those seeking to transform their businesses, careers, and global journeys.
          </p>
        </div>
      </div>
    </section>

    <section className="section-padding bg-off-white">
      <div className="container-wide">
        <h2 className="font-serif text-3xl font-bold text-primary mb-10 text-center">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-navy section-padding">
      <div className="container-narrow text-center">
        <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">Let's Work Together</h2>
        <p className="text-primary-foreground/70 mb-8">Start a conversation about how we can support your goals.</p>
        <Link to="/book"><Button className="bg-gold text-navy hover:bg-gold/90 font-semibold px-8 py-6">Book Consultation</Button></Link>
      </div>
    </section>
  </div>
);

export default About;
