import { Helmet } from "react-helmet-async";
import { Award, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/sections/PageHero";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CTASection } from "@/components/sections/CTASection";
import aboutBirute from "@/assets/about-birute.jpg";
import aboutHeroBg from "@/assets/about-hero.jpg";

const certifications = [
  "BH Brow Henna Workshop",
  "Deluxe Brows Nano Master Class",
  "Brow Sketchnology",
  "'FEEL GOOD' Intensive Permanent Make-up Training",
  "Purebeau Master Training Seminar",
  "Long-Time-Liner Conture Make-up GmbH (Munich)",
  "Long-Time-Liner Conture Make-up GmbH (Beverly Hills)",
];

const trainingTopics = [
  "Perfect pre-drawing and pigmentation technique",
  "Device overview",
  "Hygiene and legal regulations",
  "Colour theory",
  "Quality control",
  "Eyebrow pigmentation",
  "Ombré brows",
  "Lashline enhancement and eyeliners",
  "Lip contours with full shading",
  "Ombré lips",
  "Individual consultation",
  "Fundamentals of retouching semi-permanent make-up",
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Birute Francis | Certified Permanent Makeup Artist Chicago</title>
        <meta
          name="description"
          content="Meet Birute Francis, a certified Long-Time-Liner® Regional Trainer with extensive training in permanent makeup. Expert microblading and micropigmentation in Chicago."
        />
        <link rel="canonical" href="https://bfpermanentfrancis.com/about" />
      </Helmet>
      <Layout>
        <PageHero
          title="About Permanent Makeup"
          subtitle="About"
          backgroundImage={aboutHeroBg}
        />

        {/* About Birute */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative animate-fade-up">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={aboutBirute}
                    alt="Birute Francis - Certified Permanent Makeup Artist"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 rounded-lg bg-white/90 backdrop-blur-sm px-4 py-3 shadow-lg">
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">Long-Time-Liner®</p>
                    <p className="font-heading text-lg text-foreground" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Regional Trainer</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-2xl border-4 border-primary/20 -z-10" />
              </div>

              {/* Content */}
              <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="heading-lg mb-6">Birute Francis</h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  Birute Francis, a Long-Time-Liner Regional Trainer, boasts a track record of 
                  achievements in top brand pigments and devices. She is a trusted expert in 
                  microblading in Chicago and is highly knowledgeable about permanent makeup.
                </p>
                <p className="mb-8 text-muted-foreground">
                  She holds certifications from renowned courses and has completed training at 
                  Long-Time-Liner Conture Make-up GmbH centers in Munich and Beverly Hills. 
                  Her expertise spans across all areas of permanent makeup, from eyebrows and 
                  eyeliner to lips.
                </p>

                <div className="rounded-xl bg-secondary p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-6 w-6 text-primary" />
                    <h3 className="text-lg">Certifications</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Certified to lead specialized courses in line with the Long-Time-Liner 
                    Conture Make-up approach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding section-soft">
          <div className="section-container">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Certifications */}
              <div className="animate-fade-up">
                <h2 className="heading-md mb-8">Professional Certifications</h2>
                <ul className="space-y-4">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-3">
                      <span className="text-primary/40 mt-1.5 text-xs">●</span>
                      <span className="text-muted-foreground">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Training Topics */}
              <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="heading-md mb-8">Elite Training Seminars Include</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {trainingTopics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-primary/40 mt-1.5 text-xs">●</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ReviewsSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default About;
