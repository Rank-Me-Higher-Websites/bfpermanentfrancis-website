import { Link } from "react-router-dom";
import { Award, GraduationCap } from "lucide-react";
import aboutLips from "@/assets/about-lips.jpg";

const certifications = [
  "BH Brow Henna Workshop",
  "Deluxe Brows Nano Master Class",
  "Brow Sketchnology",
  "FEEL GOOD Intensive PMU Training",
  "Purebeau Master Training Seminar",
  "Long-Time-Liner Conture Make-up GmbH (Munich & Beverly Hills)",
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

export function AboutSection() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)' }}>
                <img
                  src={aboutLips}
                  alt="Permanent Lips Before and After"
                  className="w-full object-cover aspect-[3/4] lg:aspect-[4/5]"
                  data-testid="img-about-lips"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-primary/20 -z-10" />
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <span className="section-label">
                Why Choose Us
              </span>
              <h2 className="heading-lg mb-4">Birute Francis</h2>
              <div className="divider-soft mb-6 lg:mx-0 lg:ml-0" />
              <p className="mb-4 text-[16px] leading-[1.8]">
                Birute Francis, a Long-Time-Liner Regional Trainer, boasts a track record of achievements
                in top brand pigments and devices. She holds certifications from renowned courses including
                BH Brow Henna Workshop, Deluxe Brows Nano Master Class, Brow Sketchnology, and "FEEL GOOD"
                Intensive Permanent Make-up Training.
              </p>
              <p className="mb-6 text-[16px] leading-[1.8]">
                She is a trusted expert in microblading in Chicago and permanent makeup, delivering
                natural-looking, long-lasting results with precision and artistry.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[15px] font-medium text-primary hover:text-primary/70 transition-colors"
                data-testid="link-about-learn-more"
              >
                Learn more about our expertise
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 section-dark">
        <div className="section-container">
          <div className="text-center mb-10 animate-fade-up">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-3 text-white/60" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Expertise & Training
            </span>
            <h2 className="heading-lg mb-3 text-white">Certifications</h2>
            <div className="w-16 h-0.5 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <Award className="h-4.5 w-4.5 text-white/70" />
                <span className="text-[13px] font-semibold uppercase tracking-wider text-white/80" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Certifications</span>
              </div>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2.5" data-testid={`cert-${cert.slice(0,10)}`}>
                    <span className="mt-[7px] text-[7px] text-white/50">●</span>
                    <span className="text-[13.5px] leading-relaxed text-white/80">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-4 mt-6 md:mt-0">
                <GraduationCap className="h-4.5 w-4.5 text-white/70" />
                <span className="text-[13px] font-semibold uppercase tracking-wider text-white/80" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Training Topics</span>
              </div>
              <ul className="space-y-2">
                {trainingTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2.5">
                    <span className="mt-[7px] text-[7px] text-white/50">●</span>
                    <span className="text-[13.5px] leading-relaxed text-white/80">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
