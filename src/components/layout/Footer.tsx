import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import logoBf from "@/assets/logo-bf.webp";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Treatments", href: "/treatments" },
  { name: "Products", href: "/products" },
  { name: "Training", href: "/training" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Permanent Lips", href: "/treatments#lips" },
  { name: "Eyebrow Micropigmentation", href: "/treatments#eyebrows" },
  { name: "Eyeliner Enhancement", href: "/treatments#eyeliner" },
  { name: "Brow Henna", href: "/treatments#browhenna" },
];

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="section-container py-12 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6" data-testid="link-footer-logo">
              <img src={logoBf} alt="BF Permanent Francis" className="h-14 w-auto opacity-90" />
            </Link>
            <p className="text-sm text-accent-foreground/50 mb-8 leading-relaxed font-light">
              Long-Lasting Beauty, Effortlessly Yours. Discover the power of permanent makeup by Long-Time-Liner®.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/1AdAYWJBYw/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-foreground/10 transition-all hover:bg-primary hover:border-primary hover:text-white"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/b.f_permanent"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-foreground/10 transition-all hover:bg-primary hover:border-primary hover:text-white"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-accent-foreground/70 mb-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-foreground/50 transition-colors hover:text-primary font-light"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-accent-foreground/70 mb-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-accent-foreground/50 transition-colors hover:text-primary font-light"
                    data-testid={`footer-service-${service.name.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-accent-foreground/70 mb-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+17087372333" className="flex items-center gap-3 text-sm text-accent-foreground/50 transition-colors hover:text-primary font-light" data-testid="footer-phone-1">
                  <Phone className="h-4 w-4 text-primary/70 shrink-0" />
                  (708) 737-2333
                </a>
              </li>
              <li>
                <a href="tel:+13313188113" className="flex items-center gap-3 text-sm text-accent-foreground/50 transition-colors hover:text-primary font-light" data-testid="footer-phone-2">
                  <Phone className="h-4 w-4 text-primary/70 shrink-0" />
                  (331) 318-8113
                </a>
              </li>
              <li>
                <a href="mailto:francisbirute@yahoo.com" className="flex items-center gap-3 text-sm text-accent-foreground/50 transition-colors hover:text-primary font-light" data-testid="footer-email">
                  <Mail className="h-4 w-4 text-primary/70 shrink-0" />
                  francisbirute@yahoo.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/maps?q=12420+Archer+Ave+Unit+C+Lemont+IL+60439"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-accent-foreground/50 transition-colors hover:text-primary font-light"
                  data-testid="footer-address"
                >
                  <MapPin className="h-4 w-4 text-primary/70 shrink-0 mt-0.5" />
                  <span>La Passion Beauty Salon<br />12420 Archer Ave Unit C<br />Lemont, IL 60439</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-accent-foreground/5">
        <div className="section-container py-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-xs text-accent-foreground/30 font-light">
              © {new Date().getFullYear()} BF Permanent Francis. All rights reserved.
            </p>
            <p className="text-xs text-accent-foreground/30 font-light">
              Permanent Makeup Chicago | Long-Time-Liner® Certified
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
