import { Link } from "react-router-dom";
import { Award, GraduationCap, CheckCircle } from "lucide-react";
import aboutLips from "@/assets/about-lips.jpg";

const certifications = [
  "BH Brow Henna Workshop",
  "Deluxe Brows Nano Master Class",
  "Brow Sketchnology",
  "FEEL GOOD Intensive PMU Training",
  "Purebeau Master Training Seminar",
  "Long-Time-Liner Conture Make-up GmbH",
];

const trainingTopics = [
  "Pre-drawing & pigmentation technique",
  "Colour theory & device overview",
  "Eyebrow pigmentation & ombré brows",
  "Lashline enhancement & eyeliners",
  "Lip contours with full shading",
  "Retouching semi-permanent make-up",
];

export function AboutSection() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid gap-5 md:gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)' }}>
                <img
                  src={aboutLips}
                  alt="Permanent Lips Before and After"
                  className="w-full object-cover aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5]"
                  data-testid="img-about-lips"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-primary/20 -z-10" />
            </div>

            <div>
              <span className="section-label">
                Why Choose Us
              </span>
              <h2 className="heading-lg mb-2 md:mb-4">Birute Francis</h2>
              <div className="divider-soft mb-3 md:mb-6 lg:mx-0 lg:ml-0" />
              <p className="mb-3 md:mb-4 text-[14px] md:text-[16px] leading-[1.6] md:leading-[1.8]">
                Birute Francis, a Long-Time-Liner Regional Trainer, boasts a track record of achievements
                in top brand pigments and devices. She holds certifications from renowned courses including
                BH Brow Henna Workshop, Deluxe Brows Nano Master Class, Brow Sketchnology, and "FEEL GOOD"
                Intensive Permanent Make-up Training.
              </p>
              <p className="mb-3 md:mb-6 text-[14px] md:text-[16px] leading-[1.6] md:leading-[1.8]">
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

      <section className="py-5 sm:py-14 section-dark">
        <div className="section-container">
          <div className="text-center mb-5 md:mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] mb-3 text-white/50" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Expertise & Training
            </span>
            <h2 className="heading-lg text-white">Certifications</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            <div className="rounded-2xl p-4 sm:p-8" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-3 mb-3 md:mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <Award className="h-5 w-5 text-white/80" />
                </div>
                <h3 className="text-[15px] font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Certifications</h3>
              </div>
              <div className="space-y-2 md:space-y-3">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-start gap-3" data-testid={`cert-${cert.slice(0,10)}`}>
                    <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'hsl(280 50% 75%)' }} />
                    <span className="text-[14px] leading-snug text-white/90">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-4 sm:p-8" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-3 mb-3 md:mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <GraduationCap className="h-5 w-5 text-white/80" />
                </div>
                <h3 className="text-[15px] font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Training Topics</h3>
              </div>
              <div className="space-y-2 md:space-y-3">
                {trainingTopics.map((topic) => (
                  <div key={topic} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'hsl(280 50% 75%)' }} />
                    <span className="text-[14px] leading-snug text-white/90">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
