import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Award, Shield, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-bg.jpg";

const TRUST_BADGES = [
  { icon: Award, label: "Certified LTL® Trainer" },
  { icon: Shield, label: "15+ Years Experience" },
  { icon: Star, label: "500+ Happy Clients" },
];

const SERVICES = [
  { id: "spmu-brows", name: "SPMU Brows", price: "$400+" },
  { id: "spmu-eyeliner", name: "SPMU Eyeliner", price: "$350+" },
  { id: "spmu-lips", name: "SPMU Lips / Lip Blushing", price: "$450+" },
  { id: "browxenna", name: "BrowXenna Powder", price: "$40" },
];

export function HeroSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (selectedService) {
      navigate(`/booking?service=${selectedService}`);
    } else {
      navigate("/booking");
    }
  };

  return (
    <section className="relative min-h-[100svh] sm:min-h-[90vh] flex items-start sm:items-center justify-center overflow-hidden pt-0 sm:pt-0">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-800/50 to-gray-900/60" />
      </div>

      <div className="section-container relative z-10 py-6 sm:py-16 lg:py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left animate-fade-up lg:pt-8">
            <p className="mb-2 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-widest text-white/80">
              Discover the Power of Permanent Makeup Chicago
            </p>
            <h1 className="mb-3 sm:mb-6 text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg" style={{ fontFamily: "var(--font-heading)" }}>
              Long-Lasting Beauty,{" "}
              <span className="block">Effortlessly Yours</span>
            </h1>
            <p className="mb-5 sm:mb-8 max-w-lg text-sm sm:text-lg text-white/90 leading-relaxed mx-auto lg:mx-0">
              Expert micropigmentation services by certified Long-Time-Liner® Regional Trainer. 
              Enhance your natural beauty with permanent eyebrows, lips, and eyeliner.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-4 sm:flex-row">
              <Button variant="hero-outline" size="lg" className="w-full sm:w-auto" asChild data-testid="button-call-hero">
                <a href="tel:+17087372333">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (708) 737-2333
                </a>
              </Button>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2"
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/90" />
                  <span className="text-[11px] sm:text-xs font-medium text-white/90 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[380px] shrink-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="rounded-2xl bg-white shadow-2xl p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>Book Now</h2>
              <p className="text-sm text-gray-500 mb-4">Select a service to get started</p>
              <div className="space-y-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    data-testid={`hero-service-${s.id}`}
                    onClick={() => setSelectedService(selectedService === s.id ? null : s.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left text-sm",
                      selectedService === s.id
                        ? "border-primary border-2 bg-primary/5"
                        : "border-gray-300 border hover:border-gray-400"
                    )}
                  >
                    <span className="font-medium text-gray-900">{s.name}</span>
                    <span className="text-gray-500 font-medium">{s.price}</span>
                  </button>
                ))}
              </div>
              <Button
                data-testid="hero-book-now-btn"
                onClick={handleBookNow}
                variant="cta"
                className="w-full mt-4 h-12 text-base font-semibold rounded-xl"
              >
                Book Now <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
