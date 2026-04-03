import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
// Using real gallery images for services
import serviceLips from "@/assets/service-lips-new.jpg";
import serviceEyebrows from "@/assets/service-eyebrows.jpg";
import serviceEyeliner from "@/IMAGE 2026-01-22 19:24:05.jpg";

const services = [
  {
    id: "lips",
    title: "Permanent Lips",
    description:
      "Enhance your natural lip color with ombre lips and lip contours with full shading. Wake up every day with beautiful, perfectly defined lips.",
    image: serviceLips,
    link: "/treatments#lips",
  },
  {
    id: "eyebrows",
    title: "Eyebrow Micropigmentation",
    description:
      "From hair strokes to ombré brows, achieve perfectly shaped eyebrows that frame your face beautifully. Natural-looking results that last.",
    image: serviceEyebrows,
    link: "/treatments#eyebrows",
  },
  {
    id: "eyeliner",
    title: "Eyeliner Enhancement",
    description:
      "From subtle lashline enhancement to shaded eyeliner, define your eyes with precision micropigmentation for a polished look every day.",
    image: serviceEyeliner,
    link: "/treatments#eyeliner",
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-8 md:mb-16 max-w-2xl text-center animate-fade-up">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Treatment
          </p>
          <h2 className="heading-lg mb-4">We Offer</h2>
          <p className="text-lg text-muted-foreground">
            Professional permanent makeup treatments tailored to enhance your natural beauty 
            with long-lasting, stunning results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-4 md:gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="group card-hover flex flex-col overflow-hidden rounded-2xl bg-card border border-gray-300 animate-fade-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={`${service.title} - Permanent Makeup Chicago`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-heading text-2xl font-bold text-primary-foreground">
                  {service.title}
                </h3>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4 md:p-6">
                <p className="mb-6 flex-1 text-muted-foreground">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button variant="cta" size="lg" asChild>
            <Link to="/treatments">
              View Treatments
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
            <a href="tel:+17087372333">
              <Phone className="mr-2 h-5 w-5" />
              (708) 737-2333
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
