import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/sections/PageHero";
import { BookingSection } from "@/components/sections/BookingSection";
import heroImage from "@/IMAGE 2026-01-22 19:24:08.jpg";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact BF Permanent Francis | Book Consultation Chicago</title>
        <meta
          name="description"
          content="Contact BF Permanent Francis for permanent makeup consultations in Chicago. Call (708) 737-2333 or email francisbirute@yahoo.com. Located in Lemont, IL."
        />
        <link rel="canonical" href="https://bfpermanentfrancis.com/contact" />
      </Helmet>
      <Layout>
        <PageHero
          title="Get in Touch"
          subtitle="Contact"
          backgroundImage={heroImage}
        />

        {/* Booking Form */}
        <BookingSection variant="full" />

        <section className="section-padding-sm section-soft">
          <div className="section-container">
            <div className="mb-10 text-center">
              <span className="section-label">
                Reach Out
              </span>
              <h2 className="heading-md mb-3">Contact Information</h2>
              <div className="divider-soft mb-5" />
              <p className="text-muted-foreground">Reach us directly or visit our studio</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              <div className="card-elegant p-6" data-testid="contact-card-phone">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/8">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      <a href="tel:+17087372333" className="hover:text-primary transition-colors">(708) 737-2333</a>
                      <br />
                      <a href="tel:+13313188113" className="hover:text-primary transition-colors">(331) 318-8113</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-elegant p-6" data-testid="contact-card-email">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/8">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base">Email</h3>
                    <a href="mailto:francisbirute@yahoo.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      francisbirute@yahoo.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-elegant p-6" data-testid="contact-card-address">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/8">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base">Address</h3>
                    <p className="text-sm text-muted-foreground">
                      La Passion Beauty Salon<br />
                      12420 Archer Ave Unit C<br />
                      Lemont, IL 60439
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-elegant p-6" data-testid="contact-card-hours">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/8">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base">Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      By Appointment Only<br />
                      Contact us to schedule
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl h-[300px] card-elegant">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.6456!2d-87.97!3d41.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e4b5c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2s12420%20Archer%20Ave%20Unit%20C%2C%20Lemont%2C%20IL%2060439!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BF Permanent Francis Location - Lemont IL"
              />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
