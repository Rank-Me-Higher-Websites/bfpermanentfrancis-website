import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ctaBg from "@/assets/cta-bg.jpg";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(240, 8%, 10%, 0.75) 0%, hsla(350, 15%, 18%, 0.65) 100%)" }} />

      <div className="section-container relative z-10">
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <h2 className="heading-lg mb-5 text-white">
            Ready to Enhance Your Natural Beauty?
          </h2>
          <p className="mb-8 text-base md:text-lg text-white/70 font-light leading-relaxed">
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
