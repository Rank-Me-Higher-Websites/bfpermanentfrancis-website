import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import treatmentLips from "@/assets/treatment-lips.jpg";
import treatmentEyebrows from "@/assets/treatment-eyebrows.jpg";
import treatmentEyeliner from "@/assets/treatment-eyeliner.jpg";
import treatmentBrowxenna from "@/assets/treatment-browxenna.jpg";
import treatmentsHeroBg from "@/assets/treatments-hero.jpg";

const treatments = [
  {
    id: "lips",
    title: "Permanent Lips",
    subtitle: "Lip Contours & Ombré Lips",
    description:
      "Enhance your natural lip color and shape with our permanent lip treatments. From subtle lip blush to full lip contours with shading, wake up every day with beautiful, perfectly defined lips.",
    image: treatmentLips,
    benefits: [
      "Natural-looking color enhancement",
      "Fuller appearance without fillers",
      "No more lipstick bleeding or fading",
      "Simplified daily makeup routine",
      "Long-lasting results (1-3 years)",
      "Customized to your skin tone",
    ],
    duration: "2-3 hours",
    healing: "7-14 days",
  },
  {
    id: "eyebrows",
    title: "Eyebrow Micropigmentation",
    subtitle: "Hair Strokes & Ombré Brows",
    description:
      "Achieve perfectly shaped eyebrows that frame your face beautifully. Our techniques range from natural hair strokes to soft ombré effects, creating brows that look effortlessly perfect.",
    image: treatmentEyebrows,
    benefits: [
      "Natural hair-like strokes",
      "Soft powder/ombré effect available",
      "Fill in sparse or thin areas",
      "Correct asymmetry",
      "Waterproof and smudge-proof",
      "Wake up with perfect brows",
    ],
    duration: "2-3 hours",
    healing: "7-14 days",
  },
  {
    id: "eyeliner",
    title: "Eyeliner Enhancement",
    subtitle: "Lash Line & Shaded Eyeliner",
    description:
      "Define your eyes with precision micropigmentation. From subtle lashline enhancement that makes your lashes appear fuller to dramatic shaded eyeliner, achieve a polished look that lasts.",
    image: treatmentEyeliner,
    benefits: [
      "Subtle lash line enhancement",
      "Classic eyeliner definition",
      "Shaded/smoky effect options",
      "Makes lashes appear fuller",
      "No more smudging or fading",
      "Perfect for sensitive eyes",
    ],
    duration: "1.5-2 hours",
    healing: "5-10 days",
  },
  {
    id: "browhenna",
    title: "BrowXenna Treatment",
    subtitle: "Brow Henna Coloring",
    description:
      "A semi-permanent brow tinting treatment using natural henna. Perfect for those who want enhanced brows without the commitment of permanent makeup.",
    image: treatmentBrowxenna,
    benefits: [
      "Natural henna formula",
      "No harsh chemicals",
      "Stains skin for fuller look",
      "Lasts 2-4 weeks on skin",
      "6-8 weeks on hair",
      "Great for testing brow shapes",
    ],
    duration: "45 minutes",
    healing: "No downtime",
  },
];

const Treatments = () => {
  return (
    <>
      <Helmet>
        <title>Permanent Makeup Treatments Chicago | Lips, Eyebrows, Eyeliner</title>
        <meta
          name="description"
          content="Expert permanent makeup treatments in Chicago. Lip micropigmentation, eyebrow microblading, eyeliner enhancement. Long-Time-Liner® certified. Book today!"
        />
        <link rel="canonical" href="https://bfpermanentfrancis.com/treatments" />
      </Helmet>
      <Layout>
        <PageHero
          title="Our Services"
          subtitle="Treatments"
          backgroundImage={treatmentsHeroBg}
        />

        {/* Treatments */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="space-y-24">
              {treatments.map((treatment, index) => (
                <article
                  key={treatment.id}
                  id={treatment.id}
                  className={`grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`animate-fade-up ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      <img
                        src={treatment.image}
                        alt={`${treatment.title} - Permanent Makeup Chicago`}
                        className="h-full w-full object-cover aspect-[4/3]"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`animate-fade-up ${index % 2 === 1 ? "lg:order-1" : ""}`}
                    style={{ animationDelay: "0.2s" }}
                  >
                    <span className="inline-block text-xs font-light uppercase tracking-[0.2em] text-primary mb-3">
                      {treatment.subtitle}
                    </span>
                    <h2 className="heading-lg mb-4">{treatment.title}</h2>
                    <p className="mb-6 text-lg text-muted-foreground">{treatment.description}</p>

                    {/* Duration & Healing */}
                    <div className="mb-6 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">Duration: {treatment.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                        <span className="text-sm">Healing: {treatment.healing}</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-8">
                      <h3 className="mb-4 text-lg">Benefits</h3>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {treatment.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="cta" size="lg" className="rounded-full" asChild>
                      <Link to="/contact">
                        Book Consultation
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </Layout>
    </>
  );
};

export default Treatments;
