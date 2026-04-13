import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(280, 15%, 12%, 0.75) 0%, hsla(280, 20%, 18%, 0.65) 100%)" }} />
      </div>

      <div className="section-container relative z-10 py-20 text-center">
        <div className="mx-auto max-w-3xl ">
          {subtitle && (
            <span className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-white/60 mb-5" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              {subtitle}
            </span>
          )}
          <h1 className="heading-xl mb-8 text-white">
            {title}
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="cta" size="lg" className="rounded-full" asChild data-testid="pagehero-treatments-btn">
              <Link to="/treatments">
                View Treatments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" className="rounded-full" asChild data-testid="pagehero-call-btn">
              <a href="tel:+17087372333">
                <Phone className="mr-2 h-4 w-4" />
                (708) 737-2333
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
