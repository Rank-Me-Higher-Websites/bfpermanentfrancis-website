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

      <section className="section-padding section-dark">
        <div className="section-container">
          <div className="text-center mb-8 animate-fade-up">
            <span className="section-label">
              Expertise & Training
            </span>
            <h2 className="heading-lg mb-3">Certifications</h2>
            <div className="divider-soft mb-0" />
          </div>

          <div className="grid gap-5 md:grid-cols-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="rounded-xl bg-white p-7" style={{ boxShadow: '0 8px 30px -6px rgba(0,0,0,0.12)' }}>
              <div className="flex items-center gap-2.5 mb-5 pb-3" style={{ borderBottom: '1px solid #eee' }}>
                <Award className="h-5 w-5" style={{ color: 'hsl(280 50% 58%)' }} />
                <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: '#1a1a2e', fontFamily: "'Inter', system-ui, sans-serif" }}>Certifications</span>
              </div>
              <ul className="space-y-2.5">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2.5" data-testid={`cert-${cert.slice(0,10)}`}>
                    <span className="mt-[7px] text-[8px]" style={{ color: 'hsl(280 50% 58%)' }}>●</span>
                    <span className="text-[14px] leading-relaxed" style={{ color: '#2a2a2a' }}>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white p-7" style={{ boxShadow: '0 8px 30px -6px rgba(0,0,0,0.12)' }}>
              <div className="flex items-center gap-2.5 mb-5 pb-3" style={{ borderBottom: '1px solid #eee' }}>
                <GraduationCap className="h-5 w-5" style={{ color: 'hsl(280 50% 58%)' }} />
                <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: '#1a1a2e', fontFamily: "'Inter', system-ui, sans-serif" }}>Training Topics</span>
              </div>
              <ul className="space-y-2.5">
                {trainingTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2.5">
                    <span className="mt-[7px] text-[8px]" style={{ color: 'hsl(280 50% 58%)' }}>●</span>
                    <span className="text-[14px] leading-relaxed" style={{ color: '#2a2a2a' }}>{topic}</span>
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
