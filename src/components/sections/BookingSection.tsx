import { useState } from "react";
import { CalendarIcon, Send, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const SERVICES = [
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

interface BookingSectionProps {
  variant?: "banner" | "full" | "hero";
}

export function BookingSection({ variant = "full" }: BookingSectionProps) {
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
      notes: formData.get("notes") as string,
      status: "new" as const,
      created_at: new Date().toISOString(),
    };

    // Store in localStorage for now — replace with your Replit DB later
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    setTimeout(() => {
      toast.success("Booking request submitted! We'll confirm your appointment soon.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
      setDate(undefined);
    }, 800);
  };

  if (variant === "hero") {
    return (
      <div className="rounded-2xl bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 p-4 sm:p-6 md:p-8">
        <h2 className="text-base sm:text-lg md:text-xl font-heading font-semibold mb-3 sm:mb-4 text-primary-foreground text-center">
          Book Your Appointment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2 sm:gap-3 grid-cols-2 lg:grid-cols-4">
            <Input
              name="fullName"
              required
              placeholder="Full Name"
              className="h-10 sm:h-12 text-sm bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 autofill:shadow-[inset_0_0_0px_1000px_hsla(280,35%,22%,0.6)] autofill:[-webkit-text-fill-color:white]"
            />
            <Input
              name="phone"
              type="tel"
              required
              placeholder="Phone Number"
              className="h-10 sm:h-12 text-sm bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 autofill:shadow-[inset_0_0_0px_1000px_hsla(280,35%,22%,0.6)] autofill:[-webkit-text-fill-color:white]"
            />
            <Input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="h-10 sm:h-12 text-sm bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 autofill:shadow-[inset_0_0_0px_1000px_hsla(280,35%,22%,0.6)] autofill:[-webkit-text-fill-color:white]"
            />
            <Select name="service" required>
              <SelectTrigger className="h-10 sm:h-12 text-sm bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground [&>span]:text-primary-foreground/50 [&>span[data-state]]:text-primary-foreground data-[state=open]:text-primary-foreground">
                <SelectValue placeholder="Select Service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-2 sm:mt-3 grid gap-2 sm:gap-3 grid-cols-2 lg:grid-cols-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-10 sm:h-12 w-full justify-start text-left font-normal text-sm bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground",
                    !date && "text-primary-foreground/50"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary-foreground" />
                  {date ? format(date, "PPP") : "Preferred Date"}
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

            <Select name="time" required>
              <SelectTrigger className="h-10 sm:h-12 text-sm bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground [&>span]:text-primary-foreground/50 [&>span[data-state]]:text-primary-foreground">
                <SelectValue placeholder="Preferred Time" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              name="notes"
              placeholder="Notes (optional)"
              className="h-10 sm:h-12 text-sm bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 autofill:shadow-[inset_0_0_0px_1000px_hsla(280,35%,22%,0.6)] autofill:[-webkit-text-fill-color:white]"
            />

            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="h-10 sm:h-12 w-full glow-button text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : (
                <>
                  Book Now
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <section className="relative bg-accent py-10 md:py-14">
        <div className="section-container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="heading-md mb-3 text-accent-foreground">
              Book Your Appointment
            </h2>
            <p className="mb-8 text-accent-foreground/80">
              Schedule your consultation today and take the first step toward effortless beauty.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-5xl"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Input
                name="fullName"
                required
                placeholder="Full Name"
                className="h-12 bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/50"
              />
              <Input
                name="phone"
                type="tel"
                required
                placeholder="Phone Number"
                className="h-12 bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/50"
              />
              <Input
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className="h-12 bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/50"
              />
              <Select name="service" required>
                <SelectTrigger className="h-12 bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground [&>span]:text-accent-foreground/50 data-[state=open]:[&>span]:text-accent-foreground">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start text-left font-normal bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/20",
                      !date && "text-accent-foreground/50"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Preferred Date"}
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

              <Select name="time" required>
                <SelectTrigger className="h-12 bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground [&>span]:text-accent-foreground/50">
                  <SelectValue placeholder="Preferred Time" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                name="notes"
                placeholder="Special requests (optional)"
                className="h-12 bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/50"
              />

              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="h-12 w-full glow-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    Book Now
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Hidden fields for banner variant */}
            <input type="hidden" name="service" value="" />
          </form>
        </div>
      </section>
    );
  }

  // Full variant (for Contact page)
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              Schedule Your Visit
            </p>
            <h2 className="heading-md mb-4">Book an Appointment</h2>
            <p className="text-muted-foreground">
              Fill out the form below and we'll confirm your appointment within 24 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-lg"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" name="fullName" required placeholder="Your full name" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" required placeholder="(123) 456-7890" className="h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" name="email" type="email" required placeholder="your@email.com" className="h-12" />
            </div>

            <div className="space-y-2">
              <Label>Service Type *</Label>
              <Select name="service" required>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Preferred Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 w-full justify-start text-left font-normal",
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

              <div className="space-y-2">
                <Label>Preferred Time *</Label>
                <Select name="time" required>
                  <SelectTrigger className="h-12">
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

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any special requests or information we should know..."
                className="min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="w-full glow-button h-13 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : (
                <>
                  Request Appointment
                  <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              We'll contact you within 24 hours to confirm your appointment.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
