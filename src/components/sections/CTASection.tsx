import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ctaBg from "@/assets/cta-bg.jpg";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

      {/* Content */}
      <div className="section-container relative z-10">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <h2 className="heading-lg mb-6 text-primary-foreground">
            Ready to Enhance Your Natural Beauty?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            Book your consultation today and discover how permanent makeup can simplify your 
            daily routine while keeping you looking your best around the clock.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="cta" size="lg" className="glow-button" asChild>
              <Link to="/contact">
                Book Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="tel:+17087372333">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
