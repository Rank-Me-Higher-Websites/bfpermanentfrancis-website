import { Link } from "react-router-dom";
import { Award, Clock, Heart, Shield, CheckCircle } from "lucide-react";
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

const highlights = [
  {
    icon: Award,
    title: "Certified Trainer",
    description: "Long-Time-Liner® Regional Trainer with elite certifications",
  },
  {
    icon: Clock,
    title: "Years of Experience",
    description: "Track record of achievements in top brand pigments and devices",
  },
  {
    icon: Shield,
    title: "Premium Products",
    description: "Using only highest quality LONG-TIME-LINER® equipment and pigments",
  },
  {
    icon: Heart,
    title: "Natural Results",
    description: "Enhancing your natural beauty with precise micropigmentation",
  },
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

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-10 md:mb-14 animate-fade-up">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Expertise & Training
            </p>
            <h2 className="heading-lg">Certifications & Specializations</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold">Certifications</h3>
              </div>
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold">Elite Training Seminars</h3>
              </div>
              <ul className="space-y-3">
                {trainingTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 md:mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="card-hover rounded-xl border border-gray-200 p-4 md:p-6 text-center animate-fade-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="mx-auto mb-2 md:mb-4 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-5 w-5 md:h-7 md:w-7 text-primary" />
                </div>
                <h3 className="mb-1 font-heading text-sm md:text-lg font-semibold">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
