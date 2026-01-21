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
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      {/* Content */}
      <div className="section-container relative z-10 py-20 text-center">
        <div className="mx-auto max-w-4xl animate-fade-up">
          {subtitle && (
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-foreground/80">
              {subtitle}
            </p>
          )}
          <h1 className="heading-xl mb-8 text-primary-foreground">
            {title}
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="cta" size="lg" className="glow-button" asChild>
              <Link to="/treatments">
                View Treatments
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="tel:+17087372333">
                <Phone className="mr-2 h-5 w-5" />
                (708) 737-2333
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
