import { Link } from "react-router-dom";
import { ArrowRight, Phone, Award, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingSection } from "./BookingSection";
import heroBg from "@/assets/hero-bg.jpg";

const TRUST_BADGES = [
  { icon: Award, label: "Certified LTL® Trainer" },
  { icon: Shield, label: "15+ Years Experience" },
  { icon: Star, label: "500+ Happy Clients" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] sm:min-h-[90vh] flex items-start sm:items-center justify-center overflow-hidden pt-0 sm:pt-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 py-12 sm:py-20 text-center">
        <div className="mx-auto max-w-4xl animate-fade-up">
          <p className="mb-2 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-widest text-primary-foreground/80">
            Discover the Power of Permanent Makeup Chicago
          </p>
          <h1 className="heading-xl mb-3 sm:mb-6 text-primary-foreground text-3xl sm:text-5xl lg:text-6xl">
            Long-Lasting Beauty,{" "}
            <span className="block">Effortlessly Yours</span>
          </h1>
          <p className="mx-auto mb-5 sm:mb-8 max-w-2xl text-sm sm:text-lg text-primary-foreground/90 leading-relaxed">
            Expert micropigmentation services by certified Long-Time-Liner® Regional Trainer. 
            Enhance your natural beauty with permanent eyebrows, lips, and eyeliner.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row">
            <Button variant="cta" size="lg" className="glow-button w-full sm:w-auto" asChild>
              <Link to="/treatments">
                View Treatments
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" className="w-full sm:w-auto" asChild>
              <a href="tel:+17087372333">
                <Phone className="mr-2 h-5 w-5" />
                (708) 737-2333
              </a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2"
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground/90" />
                <span className="text-[11px] sm:text-xs font-medium text-primary-foreground/90 whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form — compact on mobile, full grid on desktop */}
        <div className="mx-auto mt-6 sm:mt-12 max-w-5xl">
          <BookingSection variant="hero" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
