import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Award, Shield, Star, ChevronRight, Clock, Heart } from "lucide-react";
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
    <section className="relative min-h-[100svh] flex items-start sm:items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-800/50 to-gray-900/60" />
      </div>

      <div className="section-container relative z-10 py-3 sm:py-16 lg:py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 sm:gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left animate-fade-up lg:pt-8">
            <p className="mb-1 sm:mb-4 text-[10px] sm:text-sm font-medium uppercase tracking-widest text-white/80">
              Discover the Power of Permanent Makeup Chicago
            </p>
            <h1 className="mb-1.5 sm:mb-6 text-white text-3xl sm:text-5xl lg:text-7xl leading-[1.1] drop-shadow-lg">
              Long-Lasting Beauty,{" "}
              <span className="block italic">Effortlessly Yours</span>
            </h1>
            <p className="mb-2 sm:mb-8 max-w-lg text-xs sm:text-base lg:text-lg text-white/85 leading-snug sm:leading-relaxed mx-auto lg:mx-0 font-light">
              Expert micropigmentation services by certified Long-Time-Liner® Regional Trainer. 
              Enhance your natural beauty with permanent eyebrows, lips, and eyeliner.
            </p>

            <div className="hidden sm:flex flex-col items-center lg:items-start gap-3 sm:gap-4 sm:flex-row">
              <Button variant="hero-outline" size="lg" className="w-full sm:w-auto" asChild data-testid="button-call-hero">
                <a href="tel:+17087372333">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (708) 737-2333
                </a>
              </Button>
            </div>

            <div className="hidden sm:flex mt-6 sm:mt-8 flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
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
            <div className="rounded-2xl bg-white shadow-2xl p-3 sm:p-6">
              <h2 className="text-lg sm:text-xl text-gray-900 mb-0.5 sm:mb-1">Book Now</h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">Select a service to get started</p>
              <div className="space-y-1.5 sm:space-y-2">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    data-testid={`hero-service-${s.id}`}
                    onClick={() => toggleService(s.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-xl border transition-all text-left text-xs sm:text-sm",
                      selectedServices.includes(s.id)
                        ? "border-primary border-2 bg-primary/5"
                        : "border-gray-300 border hover:border-gray-400"
                    )}
                  >
                    <span className="font-semibold text-gray-900">{s.name}</span>
                    <span className="text-gray-600 font-semibold">{s.price}</span>
                  </button>
                ))}
              </div>
              <Button
                data-testid="hero-book-now-btn"
                onClick={handleBookNow}
                variant="cta"
                className="w-full mt-2 sm:mt-4 h-10 sm:h-12 text-sm sm:text-base font-semibold rounded-xl"
              >
                Book Now <ChevronRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div className="mt-2 sm:mt-3 grid grid-cols-2 gap-1 sm:gap-1.5">
                {[
                  { icon: Award, text: "Certified LTL® Trainer" },
                  { icon: Clock, text: "15+ Years Experience" },
                  { icon: Shield, text: "Premium Products" },
                  { icon: Heart, text: "Natural Results" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1 sm:gap-1.5 rounded-lg border border-gray-300 bg-gray-50 px-1.5 sm:px-2.5 py-1.5 sm:py-2">
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" />
                    <span className="text-[9px] sm:text-[11px] font-semibold text-gray-800 leading-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a href="tel:+17087372333" className="sm:hidden w-full text-center py-2 text-white text-xs font-medium underline underline-offset-2" data-testid="button-call-mobile">
            <Phone className="inline h-3 w-3 mr-1" />
            Call (708) 737-2333
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
