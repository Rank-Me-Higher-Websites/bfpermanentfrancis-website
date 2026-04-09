import { Link } from "react-router-dom";
import { Award, GraduationCap } from "lucide-react";
import aboutLips from "@/assets/about-lips.jpg";
import certPhoto from "@/assets/certifications-photo.png";

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
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative animate-fade-up">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={aboutLips}
                  alt="Permanent Lips Before and After"
                  className="h-full w-full object-cover"
                  data-testid="img-about-lips"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border border-primary/15 -z-10" />
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <span className="section-label">
                Why Choose Us
              </span>
              <h2 className="heading-lg mb-3">Birute Francis</h2>
              <div className="divider-soft mb-6 lg:mx-0 lg:ml-0" />
              <p className="mb-6 text-base leading-relaxed">
                Birute Francis, a Long-Time-Liner Regional Trainer, boasts a track record of achievements
                in top brand pigments and devices. She holds certifications from renowned courses including
                BH Brow Henna Workshop, Deluxe Brows Nano Master Class, Brow Sketchnology, and "FEEL GOOD"
                Intensive Permanent Make-up Training.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/70 transition-colors"
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
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-100">
                <Award className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'hsl(240 10% 20%)' }}>Certifications</h3>
              </div>
              <ul className="space-y-1.5">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2 text-[13px] leading-snug" data-testid={`cert-${cert.slice(0,10)}`}>
                    <span className="mt-1 text-[7px] text-primary">●</span>
                    <span style={{ color: 'hsl(240 10% 20%)' }}>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-100">
                <GraduationCap className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'hsl(240 10% 20%)' }}>Training Topics</h3>
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {trainingTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2 text-[13px] leading-snug">
                    <span className="mt-1 text-[7px] text-primary">●</span>
                    <span style={{ color: 'hsl(240 10% 20%)' }}>{topic}</span>
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
