import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function LocationSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center animate-fade-up">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Visit Us
          </p>
          <h2 className="heading-lg mb-4">Our Location</h2>
          <p className="text-lg text-muted-foreground">
            Located at La Passion Beauty Salon in Lemont, Illinois. We serve clients from 
            Chicago and the surrounding areas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          {/* Map */}
          <div className="animate-fade-up rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-full min-h-[400px]">
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
          <div className="animate-fade-up grid gap-6" style={{ animationDelay: "0.2s" }}>
            {/* Address Card */}
            <div className="card-hover rounded-xl bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-heading text-lg font-semibold">Address</h3>
                  <p className="text-muted-foreground">
                    La Passion Beauty Salon<br />
                    12420 Archer Ave Unit C<br />
                    Lemont, IL 60439
                  </p>
                  <a
                    href="https://maps.google.com/maps?q=12420+Archer+Ave+Unit+C+Lemont+IL+60439"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="card-hover rounded-xl bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-heading text-lg font-semibold">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+17087372333" className="hover:text-primary">(708) 737-2333</a>
                    <br />
                    <a href="tel:+13313188113" className="hover:text-primary">(331) 318-8113</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="card-hover rounded-xl bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-heading text-lg font-semibold">Email</h3>
                  <a
                    href="mailto:francisbirute@yahoo.com"
                    className="text-muted-foreground hover:text-primary"
                  >
                    francisbirute@yahoo.com
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="card-hover rounded-xl bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-heading text-lg font-semibold">Hours</h3>
                  <p className="text-muted-foreground">
                    By Appointment Only<br />
                    <span className="text-sm">Contact us to schedule your consultation</span>
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
