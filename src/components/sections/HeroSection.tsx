import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, ChevronRight, Check, Award, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-bg-new.png";

const SERVICES = [
  { id: "spmu-brows", name: "SPMU Brows", price: "$400+" },
  { id: "spmu-eyeliner", name: "SPMU Eyeliner", price: "$350+" },
  { id: "spmu-lips", name: "SPMU Lips / Lip Blushing", price: "$450+" },
  { id: "browxenna", name: "BrowXenna Powder", price: "$40" },
];

const BADGES = [
  { icon: Award, label: "Certified LTL® Trainer" },
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
    <section className="relative flex items-center justify-center overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(280, 15%, 8%, 0.78) 0%, hsla(280, 18%, 12%, 0.62) 100%)" }} />
      </div>

      <div className="section-container relative z-10 py-8 sm:py-24 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 sm:gap-14 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-4 sm:mb-7">
              <span className="inline-block text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-white/60 border-b border-white/15 pb-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                Permanent Makeup Chicago
              </span>
            </div>
            <h1 className="animate-hero-fade-in mb-4 sm:mb-8 text-white text-3xl sm:text-5xl lg:text-[3.75rem] leading-[0.95]" style={{ letterSpacing: '-0.025em', fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 900, fontStyle: 'italic', textShadow: '0 2px 30px rgba(0,0,0,0.3)' }}>
              Long-Lasting Beauty,<br />
              <span className="hero-gradient-text">Effortlessly Yours</span>
            </h1>
            <p className="animate-hero-fade-in-up mb-4 sm:mb-10 max-w-lg text-sm sm:text-lg text-white/80 leading-relaxed mx-auto lg:mx-0" style={{ fontWeight: 400, fontFamily: "'Inter', system-ui, sans-serif", animationDelay: '0.15s' }}>
              Expert micropigmentation by certified Long-Time-Liner® Regional Trainer.
              Enhance your natural beauty with results that last.
            </p>

            <div className="hidden sm:flex flex-col items-center lg:items-start gap-4 sm:flex-row animate-hero-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero-outline" size="lg" className="rounded-full text-lg px-8 h-13 font-bold" asChild data-testid="button-call-hero">
                <a href="tel:+17087372333">
                  <Phone className="mr-2 h-4 w-4" />
                  (708) 737-2333
                </a>
              </Button>
            </div>

            <div className="hidden sm:flex mt-12 items-center justify-center lg:justify-start gap-3 animate-hero-fade-in-up" style={{ animationDelay: '0.45s' }}>
              {BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2.5 whitespace-nowrap">
                  <Icon className="h-4 w-4 text-white/80 shrink-0" />
                  <span className="text-[13px] font-semibold text-white/90" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[420px] shrink-0">
            <div className="rounded-2xl bg-white p-6 sm:p-8" style={{ boxShadow: '0 25px 60px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1)' }}>
              <h2 className="text-lg sm:text-xl text-foreground mb-0.5" style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 900 }}>Book Your Appointment</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>Select one or more services</p>
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
                          ? "border-purple-400 bg-purple-50"
                          : "border-gray-300 hover:border-purple-300"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                          isSelected
                            ? "gradient-bg border-transparent"
                            : "border-gray-300 group-hover:border-purple-300"
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

      {/* bottom fade removed */}
    </section>
  );
}
