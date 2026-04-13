import { Helmet } from "react-helmet-async";
import { Phone, Mail, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/sections/PageHero";
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
          ctaLabel="Book an Appointment"
          ctaLink="/booking"
        />

        <section className="section-padding-sm section-soft">
          <div className="section-container">
            <div className="mb-5 md:mb-10 text-center">
              <span className="section-label">
                Reach Out
              </span>
              <h2 className="heading-md mb-3">Contact Information</h2>
              <div className="divider-soft mb-5" />
              <p className="text-muted-foreground">Reach us directly or book your appointment</p>
            </div>

            <div className="grid gap-3 sm:gap-5 sm:grid-cols-3 max-w-4xl mx-auto">
              <div className="rounded-2xl border-2 border-border bg-card p-6" data-testid="contact-card-phone">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/8">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-semibold">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      <a href="tel:+17087372333" className="hover:text-primary transition-colors">(708) 737-2333</a>
                      <br />
                      <a href="tel:+13313188113" className="hover:text-primary transition-colors">(331) 318-8113</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-border bg-card p-6" data-testid="contact-card-email">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/8">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-semibold">Email</h3>
                    <a href="mailto:francisbirute@yahoo.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      francisbirute@yahoo.com
                    </a>
                  </div>
                </div>
              </div>

              <Link
                to="/booking"
                className="rounded-2xl border-2 border-border bg-card p-6 hover:border-primary/50 transition-colors"
                data-testid="contact-card-booking"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full gradient-bg">
                    <CalendarCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-semibold">Book an Appointment</h3>
                    <p className="text-sm text-muted-foreground">
                      Schedule your consultation today
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="mt-5 md:mt-8 text-center">
              <a
                href="tel:+17087372333"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-white font-bold text-base gradient-bg hover:opacity-90 transition-opacity"
                data-testid="button-call"
              >
                <Phone className="h-5 w-5" />
                Call (708) 737-2333
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
