import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, ChevronRight, Check, Award, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-bg.jpg";

const SERVICES = [
  { id: "spmu-brows", name: "SPMU Brows", price: "$400+" },
  { id: "spmu-eyeliner", name: "SPMU Eyeliner", price: "$350+" },
  { id: "spmu-lips", name: "SPMU Lips / Lip Blushing", price: "$450+" },
  { id: "browxenna", name: "BrowXenna Powder", price: "$40" },
];

const BADGES = [
  { icon: Award, label: "Certified LTL\u00AE Trainer" },
  { icon: Clock, label: "15+ Years Experience" },
  { icon: Users, label: "500+ Clients" },
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
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(345, 20%, 8%, 0.82) 0%, hsla(345, 15%, 14%, 0.65) 100%)" }} />
      </div>

      <div className="section-container relative z-10 py-8 sm:py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 sm:gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left animate-fade-up">
            <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] px-4 py-1.5 rounded-full" style={{ color: 'hsl(38 70% 65%)', border: '1px solid hsla(38, 60%, 55%, 0.3)', background: 'hsla(38, 60%, 50%, 0.08)' }}>
                Permanent Makeup Chicago
              </span>
            </div>
            <h1 className="mb-4 sm:mb-8 text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.08]" style={{ letterSpacing: '-0.02em', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 }}>
              Long-Lasting Beauty,<br />
              <span style={{ color: 'hsl(38 70% 65%)' }}>Effortlessly Yours</span>
            </h1>
            <p className="mb-4 sm:mb-10 max-w-lg text-sm sm:text-base lg:text-lg leading-relaxed mx-auto lg:mx-0" style={{ color: 'rgba(255,255,255,0.7)' }}>
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
              {BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-full px-4 py-2.5" style={{ background: 'hsla(38, 60%, 50%, 0.12)', border: '1px solid hsla(38, 60%, 50%, 0.2)' }}>
                  <Icon className="h-4 w-4" style={{ color: 'hsl(38 70% 65%)' }} />
                  <span className="text-sm font-medium text-white/90">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[420px] shrink-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl p-6 sm:p-8" style={{ boxShadow: '0 25px 60px -12px rgba(0,0,0,0.4)' }}>
              <h2 className="text-lg sm:text-xl text-foreground mb-0.5" style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700 }}>Book Your Appointment</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mb-5" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Select one or more services</p>
              <div className="space-y-2.5">
                {SERVICES.map((s) => {
                  const isSelected = selectedServices.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      data-testid={`hero-service-${s.id}`}
                      onClick={() => toggleService(s.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all text-left text-sm group",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/40"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-gray-300 group-hover:border-primary/40"
                        )}>
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className="font-medium text-foreground">{s.name}</span>
                      </div>
                      <span className="font-semibold text-foreground">{s.price}</span>
                    </button>
                  );
                })}
              </div>
              <Button
                data-testid="hero-book-now-btn"
                onClick={handleBookNow}
                variant="cta"
                className="w-full mt-5 h-12 text-[15px] font-semibold rounded-xl"
              >
                Book Now <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                Free consultation included
              </p>
            </div>
          </div>

          <a href="tel:+17087372333" className="sm:hidden w-full text-center py-2 text-white/70 text-xs font-light" data-testid="button-call-mobile">
            <Phone className="inline h-3 w-3 mr-1" />
            Call (708) 737-2333
          </a>
        </div>
      </div>
    </section>
  );
}
