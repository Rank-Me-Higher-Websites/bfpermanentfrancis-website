import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ctaBg from "@/assets/cta-bg.jpg";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-10 md:py-28 lg:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(280, 15%, 8%, 0.82) 0%, hsla(280, 18%, 14%, 0.65) 100%)" }} />

      <div className="section-container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-lg mb-3 md:mb-6 text-white !text-2xl md:!text-5xl" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Ready to Enhance Your Natural Beauty?
          </h2>
          <p className="mb-5 md:mb-10 text-base md:text-lg text-white/65 leading-relaxed" style={{ fontWeight: 300 }}>
            Book your consultation today and discover how permanent makeup can simplify your
            daily routine while keeping you looking your best.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="cta" size="lg" className="rounded-full" asChild data-testid="cta-book-now">
              <Link to="/booking">
                Book Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" className="rounded-full" asChild data-testid="cta-call">
              <a href="tel:+17087372333">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
