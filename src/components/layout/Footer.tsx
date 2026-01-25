import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import logoBf from "@/assets/logo-bf.webp";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
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
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logoBf} alt="BF Permanent Francis" className="h-16 w-auto" />
            </Link>
            <p className="text-sm text-accent-foreground/70 mb-6">
              Long-Lasting Beauty, Effortlessly Yours: Discover the Power of Permanent Makeup by LONG-TIME-LINER®.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1AdAYWJBYw/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/b.f_permanent"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-accent-foreground/70 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-accent-foreground/70 transition-colors hover:text-primary"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+17087372333"
                  className="flex items-start gap-3 text-sm text-accent-foreground/70 transition-colors hover:text-primary"
                >
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>(708) 737-2333</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+13313188113"
                  className="flex items-start gap-3 text-sm text-accent-foreground/70 transition-colors hover:text-primary"
                >
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>(331) 318-8113</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:francisbirute@yahoo.com"
                  className="flex items-start gap-3 text-sm text-accent-foreground/70 transition-colors hover:text-primary"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>francisbirute@yahoo.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/maps?q=12420+Archer+Ave+Unit+C+Lemont+IL+60439"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-accent-foreground/70 transition-colors hover:text-primary"
                >
                  <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    La Passion Beauty Salon<br />
                    12420 Archer Ave Unit C<br />
                    Lemont, IL 60439
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-accent-foreground/10">
        <div className="section-container py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-accent-foreground/50">
              © {new Date().getFullYear()} BF Permanent Francis. All rights reserved.
            </p>
            <p className="text-sm text-accent-foreground/50">
              Permanent Makeup Chicago | Long-Time-Liner® Certified
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
