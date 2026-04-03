import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, X, CalendarIcon, Send, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import serviceLips from "@/assets/service-lips-new.jpg";
import serviceEyebrows from "@/assets/service-eyebrows.jpg";
import serviceEyeliner from "@/IMAGE 2026-01-22 19:24:05.jpg";

const BOOKING_SERVICES = [
  "Permanent Lips",
  "Eyebrow Micropigmentation",
  "Eyeliner Enhancement",
  "BrowXenna",
];

const TIME_SLOTS = [
  { value: "morning", label: "Morning (9AM - 12PM)" },
  { value: "afternoon", label: "Afternoon (12PM - 4PM)" },
  { value: "evening", label: "Evening (4PM - 7PM)" },
];

const services = [
  {
    id: "lips",
    title: "Permanent Lips",
    description:
      "Enhance your natural lip color with ombre lips and lip contours with full shading. Wake up every day with beautiful, perfectly defined lips.",
    image: serviceLips,
    link: "/treatments#lips",
  },
  {
    id: "eyebrows",
    title: "Eyebrow Micropigmentation",
    description:
      "From hair strokes to ombré brows, achieve perfectly shaped eyebrows that frame your face beautifully. Natural-looking results that last.",
    image: serviceEyebrows,
    link: "/treatments#eyebrows",
  },
  {
    id: "eyeliner",
    title: "Eyeliner Enhancement",
    description:
      "From subtle lashline enhancement to shaded eyeliner, define your eyes with precision micropigmentation for a polished look every day.",
    image: serviceEyeliner,
    link: "/treatments#eyeliner",
  },
];

export function ServicesSection() {
  const [showBooking, setShowBooking] = useState(false);
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const booking = {
      id: crypto.randomUUID(),
      full_name: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      service_type: formData.get("service") as string,
      preferred_date: date ? format(date, "yyyy-MM-dd") : "",
      preferred_time: formData.get("time") as string,
      notes: "",
      status: "new" as const,
      created_at: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    setTimeout(() => {
      toast.success("Booking request submitted! We'll confirm your appointment soon.");
      setIsSubmitting(false);
      setShowBooking(false);
      setDate(undefined);
    }, 800);
  };

  return (
    <section className="section-padding bg-primary">
      <div className="section-container">
        <div className="mx-auto mb-6 md:mb-10 max-w-2xl text-center animate-fade-up">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/80">
            Treatment
          </p>
          <h2 className="heading-lg mb-4 text-white">We Offer</h2>
          <p className="text-lg text-white/90">
            Professional permanent makeup treatments tailored to enhance your natural beauty 
            with long-lasting, stunning results.
          </p>
        </div>

        <div className="grid gap-4 md:gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="group card-hover flex flex-col overflow-hidden rounded-2xl bg-card border border-gray-300 animate-fade-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={`${service.title} - Permanent Makeup Chicago`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-heading text-2xl font-bold text-primary-foreground">
                  {service.title}
                </h3>
              </div>
              <div className="flex flex-1 flex-col p-4 md:p-6">
                <p className="mb-6 flex-1 text-muted-foreground">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold"
            onClick={() => setShowBooking(true)}
            data-testid="services-book-now-btn"
          >
            Book Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-primary font-semibold" asChild>
            <a href="tel:+17087372333">
              <Phone className="mr-2 h-5 w-5" />
              (708) 737-2333
            </a>
          </Button>
        </div>
      </div>

      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowBooking(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 md:p-8 shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowBooking(false)}
              className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100 transition-colors"
              data-testid="close-booking-modal"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>Book an Appointment</h2>
            <p className="text-sm text-muted-foreground mb-5">Fill in your details and we'll confirm within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="modal-fullName" className="text-sm">Full Name *</Label>
                  <Input id="modal-fullName" name="fullName" required placeholder="Your full name" className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="modal-phone" className="text-sm">Phone *</Label>
                  <Input id="modal-phone" name="phone" type="tel" required placeholder="(123) 456-7890" className="h-10" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="modal-email" className="text-sm">Email *</Label>
                <Input id="modal-email" name="email" type="email" required placeholder="your@email.com" className="h-10" />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm">Service *</Label>
                <Select name="service" required>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {BOOKING_SERVICES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-sm">Preferred Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-10 w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Preferred Time *</Label>
                  <Select name="time" required>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          <span className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5" />
                            {t.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="w-full h-11 text-base"
                disabled={isSubmitting}
                data-testid="modal-submit-booking"
              >
                {isSubmitting ? "Submitting..." : (
                  <>
                    Request Appointment
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                We'll contact you within 24 hours to confirm.
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
