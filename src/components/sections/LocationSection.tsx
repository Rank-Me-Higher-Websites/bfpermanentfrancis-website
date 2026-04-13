import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactCards = [
  {
    icon: MapPin,
    title: "Address",
    content: (
      <>
        La Passion Beauty Salon<br />
        12420 Archer Ave Unit C<br />
        Lemont, IL 60439
      </>
    ),
    link: {
      href: "https://maps.google.com/maps?q=12420+Archer+Ave+Unit+C+Lemont+IL+60439",
      text: "Get Directions →",
      external: true,
    },
  },
  {
    icon: Phone,
    title: "Phone",
    content: (
      <>
        <a href="tel:+17087372333" className="hover:opacity-80 transition-opacity">(708) 737-2333</a>
        <br />
        <a href="tel:+13313188113" className="hover:opacity-80 transition-opacity">(331) 318-8113</a>
      </>
    ),
  },
  {
    icon: Mail,
    title: "Email",
    content: (
      <a href="mailto:francisbirute@yahoo.com" className="hover:opacity-80 transition-opacity">
        francisbirute@yahoo.com
      </a>
    ),
  },
  {
    icon: Clock,
    title: "Hours",
    content: (
      <>
        By Appointment Only<br />
        Contact us to schedule
      </>
    ),
  },
];

export function LocationSection() {
  return (
    <section className="section-padding section-dark">
      <div className="section-container">
        <div className="mx-auto mb-5 md:mb-10 max-w-2xl text-center ">
          <span className="section-label">
            Visit Us
          </span>
          <h2 className="heading-lg mb-3">Our Location</h2>
          <div className="divider-soft mb-5" />
          <p className="text-base text-muted-foreground">
            Located at La Passion Beauty Salon in Lemont, Illinois.
          </p>
        </div>

        <div className="grid gap-3 md:gap-8 lg:grid-cols-2 items-stretch">
          <div className=" rounded-2xl overflow-hidden h-[180px] md:h-[420px] lg:h-full lg:min-h-[420px]" style={{ boxShadow: '0 8px 24px -4px rgba(0,0,0,0.3)' }}>
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

          <div className=" grid gap-2 md:gap-4">
            {contactCards.map(({ icon: Icon, title, content, link }) => (
              <div key={title} className="location-card-white rounded-2xl p-3 md:p-7 bg-white" data-testid={`location-card-${title.toLowerCase()}`} style={{ boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)' }}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'hsl(280 50% 95%)' }}>
                    <Icon className="h-5 w-5" style={{ color: 'hsl(280 50% 50%)' }} />
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-base" style={{ color: 'hsl(240 10% 20%)' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'hsl(240 8% 40%)' }}>{content}</p>
                    {link && (
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="location-link mt-2 inline-block text-sm font-medium hover:opacity-80"
                        style={{ color: 'hsl(280 50% 50%)' }}
                      >
                        {link.text}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
