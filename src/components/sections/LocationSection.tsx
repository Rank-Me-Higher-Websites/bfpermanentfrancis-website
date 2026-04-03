import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function LocationSection() {
  return (
    <section className="section-padding bg-primary">
      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-6 md:mb-10 max-w-2xl text-center animate-fade-up">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-white/80">
            Visit Us
          </p>
          <h2 className="heading-lg mb-2 md:mb-4 text-white">Our Location</h2>
          <p className="text-sm md:text-lg text-white/90">
            Located at La Passion Beauty Salon in Lemont, Illinois. We serve clients from 
            Chicago and the surrounding areas.
          </p>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 items-stretch">
          {/* Map */}
          <div className="animate-fade-up rounded-2xl overflow-hidden shadow-lg h-[250px] md:h-[400px] lg:h-full lg:min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.6456!2d-87.97!3d41.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e4b5c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2s12420%20Archer%20Ave%20Unit%20C%2C%20Lemont%2C%20IL%2060439!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BF Permanent Francis Location"
            />
          </div>

          {/* Contact Info */}
          <div className="animate-fade-up grid gap-3" style={{ animationDelay: "0.2s" }}>
            {/* Address Card */}
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 font-heading text-base font-semibold text-white">Address</h3>
                  <p className="text-white/80 text-sm">
                    La Passion Beauty Salon<br />
                    12420 Archer Ave Unit C<br />
                    Lemont, IL 60439
                  </p>
                  <a
                    href="https://maps.google.com/maps?q=12420+Archer+Ave+Unit+C+Lemont+IL+60439"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-medium text-white hover:text-white/80"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 font-heading text-base font-semibold text-white">Phone</h3>
                  <p className="text-white/80 text-sm">
                    <a href="tel:+17087372333" className="hover:text-white">(708) 737-2333</a>
                    <br />
                    <a href="tel:+13313188113" className="hover:text-white">(331) 318-8113</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 font-heading text-base font-semibold text-white">Email</h3>
                  <a
                    href="mailto:francisbirute@yahoo.com"
                    className="text-white/80 text-sm hover:text-white"
                  >
                    francisbirute@yahoo.com
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 font-heading text-base font-semibold text-white">Hours</h3>
                  <p className="text-white/80 text-sm">
                    By Appointment Only<br />
                    Contact us to schedule your consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
