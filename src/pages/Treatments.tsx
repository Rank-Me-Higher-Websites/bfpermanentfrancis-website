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
        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="space-y-4 md:space-y-12">
              {treatments.map((treatment, index) => (
                <article
                  key={treatment.id}
                  id={treatment.id}
                  className={`grid gap-3 md:gap-8 lg:grid-cols-2 lg:gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={` ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl">
                      <img
                        src={treatment.image}
                        alt={`${treatment.title} - Permanent Makeup Chicago`}
                        className="h-full w-full object-cover aspect-[16/9] md:aspect-[4/3]"
                      />
                    </div>
                  </div>

                  <div className={` ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <span className="section-label mb-1 md:mb-3">
                      {treatment.subtitle}
                    </span>
                    <h2 className="heading-md md:heading-lg mb-2 md:mb-4">{treatment.title}</h2>
                    <p className="mb-3 md:mb-6 text-sm md:text-lg text-muted-foreground">{treatment.description}</p>

                    <div className="mb-3 md:mb-6 flex flex-wrap gap-2 md:gap-4">
                      <div className="flex items-center gap-1.5 md:gap-2 rounded-full bg-secondary px-3 md:px-4 py-1 md:py-2">
                        <Clock className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                        <span className="text-xs md:text-sm">Duration: {treatment.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 md:gap-2 rounded-full bg-secondary px-3 md:px-4 py-1 md:py-2">
                        <span className="text-xs md:text-sm">Healing: {treatment.healing}</span>
                      </div>
                    </div>

                    <div className="mb-3 md:mb-6">
                      <h3 className="mb-2 md:mb-3 text-sm md:text-lg font-semibold">Benefits</h3>
                      <ul className="grid gap-1 md:gap-2 sm:grid-cols-2">
                        {treatment.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-1.5 md:gap-2 text-muted-foreground">
                            <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0 text-primary mt-0.5" />
                            <span className="text-xs md:text-base">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="cta" size="default" className="rounded-full text-sm md:text-base h-9 md:h-11 px-5 md:px-8" asChild>
                      <Link to="/contact">
                        Book Consultation
                        <ArrowRight className="ml-1.5 md:ml-2 h-4 w-4" />
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
