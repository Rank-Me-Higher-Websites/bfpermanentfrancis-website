import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Check, ChevronRight, ArrowLeft, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const SERVICES = [
  { id: "spmu-brows", name: "SPMU Brows", price: "$400+", duration: "2-3 hrs" },
  { id: "spmu-eyeliner", name: "SPMU Eyeliner", price: "$350+", duration: "1.5-2 hrs" },
  { id: "spmu-lips", name: "SPMU Lips / Lip Blushing", price: "$450+", duration: "2-3 hrs" },
  { id: "browxenna", name: "BrowXenna Powder", price: "$40", duration: "1 hr" },
];

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
  "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
];

const STEPS = [
  { num: 1, label: "Service" },
  { num: 2, label: "Date & Time" },
  { num: 3, label: "Your Info" },
  { num: 4, label: "Review" },
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("service");
  const [step, setStep] = useState(preselected ? 2 : 1);
  const preselectedList = preselected ? preselected.split(",").filter(Boolean) : [];
  const [selectedServices, setSelectedServices] = useState<string[]>(preselectedList);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ fullName: "", phone: "", email: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const services = SERVICES.filter((s) => selectedServices.includes(s.id));

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedServices.length > 0;
      case 2: return !!selectedDate && !!selectedTime;
      case 3: return formData.fullName && formData.phone && formData.email;
      default: return true;
    }
  };

  const serviceNames = services.map((s) => s.name).join(", ");
  const servicePrices = services.map((s) => s.price).join(" + ");

  const handleSubmit = () => {
    setIsSubmitting(true);
    const booking = {
      id: crypto.randomUUID(),
      full_name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      service_type: serviceNames,
      preferred_date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      preferred_time: selectedTime || "",
      notes: formData.notes,
      status: "new" as const,
      created_at: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(5);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Book an Appointment | BF Permanent Francis</title>
        <meta name="description" content="Book your permanent makeup appointment with Birute Francis, certified SPMU artist." />
      </Helmet>
      <Layout>
        <section className="min-h-screen bg-background py-12 md:py-20">
          <div className="section-container max-w-2xl mx-auto">
            {step <= 4 && (
              <div className="flex items-center justify-center gap-0 mb-10" data-testid="booking-stepper">
                {STEPS.map((s, i) => {
                  const completed = step > s.num;
                  const active = step === s.num;
                  return (
                    <div key={s.num} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all",
                            completed && "gradient-bg border-transparent text-white",
                            active && "gradient-bg border-transparent text-white",
                            !completed && !active && "bg-white border-gray-300 text-gray-400"
                          )}
                        >
                          {completed ? <Check className="w-4 h-4" /> : s.num}
                        </div>
                        <span className="text-[10px] mt-1 text-gray-500 hidden sm:block">{s.label}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={cn("w-10 sm:w-16 h-0.5 mx-1", step > s.num ? "gradient-bg" : "bg-gray-200")} />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {step <= 4 && (
              <p className="text-center text-sm text-gray-500 -mt-6 mb-8">
                Step {step} of 4: {STEPS[step - 1].label}
              </p>
            )}

            <div className="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-10">
              {step === 1 && (
                <div data-testid="step-service">
                  <h2 className="text-2xl mb-1" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Book Now</h2>
                  <p className="text-gray-500 mb-6">Select one or more services</p>
                  <div className="space-y-3">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        data-testid={`service-${s.id}`}
                        onClick={() => toggleService(s.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all text-left",
                          selectedServices.includes(s.id)
                            ? "border-purple-400 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                            selectedServices.includes(s.id)
                              ? "gradient-bg border-transparent"
                              : "border-gray-300"
                          )}>
                            {selectedServices.includes(s.id) && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="font-medium text-gray-900">{s.name}</span>
                        </div>
                        <span className="text-gray-600 font-medium">{s.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div data-testid="step-datetime">
                  <button onClick={() => setStep(1)} className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4" data-testid="back-to-service">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Service
                  </button>
                  <h2 className="text-2xl mb-1" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Pick Date & Time</h2>
                  <p className="text-gray-500 mb-6">Choose your preferred appointment time</p>

                  <div className="border border-gray-200 rounded-xl p-4 mb-6">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(d) => { setSelectedDate(d); setSelectedTime(null); }}
                      disabled={(d) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return d < today || d.getDay() === 0;
                      }}
                      className="mx-auto pointer-events-auto"
                    />
                  </div>

                  {selectedDate && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Available times for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            data-testid={`time-${t.replace(/\s/g, "-")}`}
                            onClick={() => setSelectedTime(t)}
                            className={cn(
                              "py-2 px-3 rounded-lg text-sm font-medium border transition-all",
                              selectedTime === t
                                ? "gradient-bg text-white border-transparent"
                                : "bg-white text-gray-700 border-gray-200 hover:border-purple-300"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div data-testid="step-info">
                  <button onClick={() => setStep(2)} className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4" data-testid="back-to-datetime">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Date & Time
                  </button>
                  <h2 className="text-2xl mb-1" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Your Information</h2>
                  <p className="text-gray-500 mb-6">We'll send your confirmation here</p>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="fullName"
                          data-testid="input-fullname"
                          placeholder="Jane Smith"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="pl-10 h-12 border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="phone"
                          data-testid="input-phone"
                          type="tel"
                          placeholder="(312) 555-0100"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-10 h-12 border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="email"
                          data-testid="input-email"
                          type="email"
                          placeholder="jane@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10 h-12 border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (optional)</Label>
                      <Textarea
                        id="notes"
                        data-testid="input-notes"
                        placeholder="Any special requests..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="min-h-[100px] border-gray-300"
                      />
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5 bg-gray-50">
                      <h3 className="text-lg mb-3" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Your Booking Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium">{serviceNames}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium">{selectedDate ? format(selectedDate, "EEE, MMM d, yyyy") : ""}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-medium">{selectedTime}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Price</span><span className="font-medium gradient-text">{servicePrices}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div data-testid="step-review">
                  <button onClick={() => setStep(3)} className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4" data-testid="back-to-info">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </button>
                  <h2 className="text-2xl mb-1" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Review Your Booking</h2>
                  <p className="text-gray-500 mb-6">Please confirm all details are correct</p>
                  <div className="rounded-xl border border-gray-200 p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500 block">Service</span><span className="font-medium">{serviceNames}</span></div>
                      <div><span className="text-gray-500 block">Price</span><span className="font-medium gradient-text">{servicePrices}</span></div>
                      <div><span className="text-gray-500 block">Duration</span><span className="font-medium">{services.map(s => s.duration).join(" + ")}</span></div>
                      <div><span className="text-gray-500 block">Date</span><span className="font-medium">{selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}</span></div>
                      <div><span className="text-gray-500 block">Time</span><span className="font-medium">{selectedTime}</span></div>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="text-sm space-y-2">
                      <div><span className="text-gray-500">Name:</span> <span className="font-medium">{formData.fullName}</span></div>
                      <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{formData.phone}</span></div>
                      <div><span className="text-gray-500">Email:</span> <span className="font-medium">{formData.email}</span></div>
                      {formData.notes && <div><span className="text-gray-500">Notes:</span> <span className="font-medium">{formData.notes}</span></div>}
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="text-center py-8" data-testid="step-confirmation">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl mb-2" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Booking Confirmed!</h2>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Thank you, {formData.fullName}! We've received your booking for {serviceNames} on {selectedDate ? format(selectedDate, "EEEE, MMMM d") : ""} at {selectedTime}. We'll send a confirmation to {formData.email}.
                  </p>
                  <div className="rounded-xl border border-gray-200 p-5 bg-gray-50 text-left max-w-sm mx-auto mb-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Service</span><span className="font-medium">{serviceNames}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium">{selectedDate ? format(selectedDate, "EEE, MMM d, yyyy") : ""}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-medium">{selectedTime}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Price</span><span className="font-medium gradient-text">{servicePrices}</span></div>
                    </div>
                  </div>
                  <Button
                    data-testid="button-back-home"
                    onClick={() => navigate("/")}
                    className="gradient-bg text-white"
                  >
                    Back to Home
                  </Button>
                </div>
              )}

              {step >= 1 && step <= 4 && (
                <div className="flex gap-3 mt-8">
                  {step > 1 && (
                    <Button
                      data-testid="button-back"
                      variant="outline"
                      className="flex-1 h-12 border-gray-300"
                      onClick={() => setStep(step - 1)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                  )}
                  {step < 4 && (
                    <Button
                      data-testid="button-next"
                      className={cn("flex-1 h-12 gradient-bg text-white", !canProceed() && "opacity-50 cursor-not-allowed")}
                      disabled={!canProceed()}
                      onClick={() => setStep(step + 1)}
                    >
                      Next <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                  {step === 4 && (
                    <Button
                      data-testid="button-confirm"
                      className="flex-1 h-12 gradient-bg text-white"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? "Confirming..." : "Confirm Booking"}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
