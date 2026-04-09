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
              <span className="inline-block text-xs font-light uppercase tracking-[0.2em] text-primary mb-4">
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
          <div className="text-center mb-10 animate-fade-up">
            <span className="inline-block text-xs font-light uppercase tracking-[0.2em] text-primary mb-4">
              Expertise & Training
            </span>
            <h2 className="heading-lg mb-3">Certifications</h2>
            <div className="divider-soft mb-0" />
          </div>

          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/8">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl">Certifications</h3>
              </div>
              <ul className="space-y-3 mb-10">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-3 text-[15px]" data-testid={`cert-${cert.slice(0,10)}`}>
                    <span className="text-primary/40 mt-1.5 text-xs">●</span>
                    <span className="text-muted-foreground">{cert}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/8">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl">Elite Training</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-8">
                <ul className="space-y-3">
                  {trainingTopics.slice(0, Math.ceil(trainingTopics.length / 2)).map((topic) => (
                    <li key={topic} className="flex items-start gap-3 text-[15px]">
                      <span className="text-primary/40 mt-1.5 text-xs">●</span>
                      <span className="text-muted-foreground">{topic}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {trainingTopics.slice(Math.ceil(trainingTopics.length / 2)).map((topic) => (
                    <li key={topic} className="flex items-start gap-3 text-[15px]">
                      <span className="text-primary/40 mt-1.5 text-xs">●</span>
                      <span className="text-muted-foreground">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hidden lg:block rounded-2xl overflow-hidden">
              <img
                src={certPhoto}
                alt="Professional micropigmentation equipment"
                className="h-full w-full object-cover rounded-2xl"
                data-testid="img-cert-photo"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
