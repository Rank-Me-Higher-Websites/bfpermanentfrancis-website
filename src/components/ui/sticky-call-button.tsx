import { Phone } from "lucide-react";

export function StickyCallButton() {
  return (
    <a
      href="tel:+17087372333"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 md:hidden"
      aria-label="Call us now"
      data-testid="button-sticky-call"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
