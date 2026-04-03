import { Link } from "react-router-dom";
import { Award, CheckCircle, GraduationCap } from "lucide-react";
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
      <section className="section-padding bg-primary">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative animate-fade-up">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={aboutLips}
                  alt="Permanent Lips Before and After"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-6 left-6 rounded-lg bg-white/20 backdrop-blur-sm px-4 py-3 text-white shadow-lg">
                  <p className="text-xs font-medium uppercase tracking-wider">Long-Time-Liner®</p>
                  <p className="font-heading text-lg font-semibold">Regional Trainer</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-2xl border-4 border-white/20 -z-10" />
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/80">
                Why Choose Us
              </p>
              <h2 className="heading-lg mb-6 text-white">Birute Francis</h2>
              <p className="mb-6 text-lg text-white/90">
                Birute Francis, a Long-Time-Liner Regional Trainer, boasts a track record of achievements 
                in top brand pigments and devices. She holds certifications from renowned courses including 
                BH Brow Henna Workshop, Deluxe Brows Nano Master Class, Brow Sketchnology, and "FEEL GOOD" 
                Intensive Permanent Make-up Training. Birute has also excelled in Purebeau Master Training 
                Seminar and completed training at Long-Time-Liner Conture Make-up GmbH centers in Munich 
                and Beverly Hills.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-medium text-white hover:text-white/80 transition-colors"
              >
                Learn more about our expertise
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-white">
        <div className="section-container">
          <div className="text-center mb-6 animate-fade-up">
            <p className="mb-1 text-sm font-medium uppercase tracking-widest text-primary">
              Expertise & Training
            </p>
            <h2 className="heading-lg">Certifications & Specializations</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="rounded-xl border border-gray-300 bg-gray-50/50 p-5">
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-200">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-base font-bold">Certifications</h3>
              </div>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm leading-snug">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-gray-300 bg-gray-50/50 p-5">
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-200">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-base font-bold">Elite Training Seminars</h3>
              </div>
              <ul className="space-y-2">
                {trainingTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm leading-snug">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block rounded-xl overflow-hidden border border-gray-300">
              <img
                src={certPhoto}
                alt="Professional micropigmentation equipment"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
