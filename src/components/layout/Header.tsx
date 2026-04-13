import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoBf from "@/assets/logo-bf.webp";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Treatments", href: "/treatments" },
  { name: "Products", href: "/products" },
  { name: "Training", href: "/training" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-border/30">
      <nav className="section-container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" data-testid="link-home-logo">
          <div className="flex h-12 items-center rounded-lg gradient-bg px-3">
            <img src={logoBf} alt="BF Permanent Francis Logo" className="h-9 w-auto" />
          </div>
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-7">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link text-[13px] tracking-wide transition-colors pb-1 ${
                isActive(item.href)
                  ? "gradient-text font-medium nav-link-active"
                  : "text-foreground/80 font-medium hover:text-foreground"
              }`}
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              data-testid={`nav-${item.name.toLowerCase().replace(/\s/g, '-')}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <Button variant="cta" size="default" className="rounded-full px-6" asChild data-testid="button-call-header">
            <a href="tel:+17087372333">
              <Phone className="mr-2 h-4 w-4" />
              (708) 737-2333
            </a>
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" data-testid="button-menu-toggle">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-8 py-8">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <div className="flex h-10 items-center rounded-lg gradient-bg px-3">
                    <img src={logoBf} alt="BF Permanent Francis" className="h-7 w-auto" />
                  </div>
                </Link>
                <nav className="flex flex-col gap-5">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? "gradient-text"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                      data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <Button variant="cta" size="lg" className="w-full rounded-full" asChild>
                  <a href="tel:+17087372333">
                    <Phone className="mr-2 h-4 w-4" />
                    (708) 737-2333
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
