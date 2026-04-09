import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-bg.jpg";

const SERVICES = [
  { id: "spmu-brows", name: "SPMU Brows", price: "$400+" },
  { id: "spmu-eyeliner", name: "SPMU Eyeliner", price: "$350+" },
  { id: "spmu-lips", name: "SPMU Lips / Lip Blushing", price: "$450+" },
  { id: "browxenna", name: "BrowXenna Powder", price: "$40" },
];

export function HeroSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleBookNow = () => {
    if (selectedServices.length > 0) {
      navigate(`/booking?service=${selectedServices.join(",")}`);
    } else {
      navigate("/booking");
    }
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(240, 8%, 10%, 0.65) 0%, hsla(350, 15%, 18%, 0.55) 100%)" }} />
      </div>

      <div className="section-container relative z-10 py-6 sm:py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-4 sm:gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left animate-fade-up">
            <div className="mb-3 sm:mb-6">
              <span className="inline-block text-[10px] sm:text-xs font-light uppercase tracking-[0.25em] text-white/70 border-b border-white/20 pb-1">
                Permanent Makeup Chicago
              </span>
            </div>
            <h1 className="mb-3 sm:mb-8 text-white text-3xl sm:text-5xl lg:text-7xl leading-[1.08] drop-shadow-sm" style={{ letterSpacing: '-0.02em', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 }}>
              Long-Lasting Beauty,<br />
              Effortlessly Yours
            </h1>
            <p className="mb-3 sm:mb-10 max-w-md text-xs sm:text-base lg:text-lg text-white/70 leading-relaxed mx-auto lg:mx-0 font-light">
              Expert micropigmentation by certified Long-Time-Liner® Regional Trainer.
              Enhance your natural beauty with results that last.
            </p>

            <div className="hidden sm:flex flex-col items-center lg:items-start gap-4 sm:flex-row">
              <Button variant="hero-outline" size="lg" className="rounded-full" asChild data-testid="button-call-hero">
                <a href="tel:+17087372333">
                  <Phone className="mr-2 h-4 w-4" />
                  (708) 737-2333
                </a>
              </Button>
            </div>

            <div className="hidden sm:flex mt-10 flex-wrap items-center justify-center lg:justify-start gap-4">
              {["Certified LTL® Trainer", "15+ Years Experience", "500+ Clients"].map((label) => (
                <span key={label} className="inline-flex items-center gap-2 text-sm font-medium text-white bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[380px] shrink-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl p-4 sm:p-7">
              <h2 className="text-lg sm:text-xl text-foreground mb-0.5 sm:mb-1" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600 }}>Book Now</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-5" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Select a service to get started</p>
              <div className="space-y-2 sm:space-y-2.5">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    data-testid={`hero-service-${s.id}`}
                    onClick={() => toggleService(s.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 sm:py-3.5 rounded-xl border transition-all text-left text-sm",
                      selectedServices.includes(s.id)
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border hover:border-primary/30 text-foreground/80"
                    )}
                  >
                    <span className="font-medium">{s.name}</span>
                    <span className="text-muted-foreground text-sm">{s.price}</span>
                  </button>
                ))}
              </div>
              <Button
                data-testid="hero-book-now-btn"
                onClick={handleBookNow}
                variant="cta"
                className="w-full mt-4 sm:mt-5 h-11 sm:h-12 text-sm sm:text-[15px] font-medium rounded-xl"
              >
                Book Now <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          <a href="tel:+17087372333" className="sm:hidden w-full text-center py-2 text-white/70 text-xs font-light" data-testid="button-call-mobile">
            <Phone className="inline h-3 w-3 mr-1" />
            Call (708) 737-2333
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
