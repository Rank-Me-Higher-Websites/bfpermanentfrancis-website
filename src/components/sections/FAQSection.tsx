import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is permanent makeup?",
    answer:
      "Permanent makeup, also known as micropigmentation or cosmetic tattooing, is a technique that deposits pigment into the upper layers of the skin to create long-lasting makeup effects. It can enhance eyebrows, lips, and eyeliner for a natural, polished look that lasts for years.",
  },
  {
    question: "How long does permanent makeup last?",
    answer:
      "Permanent makeup typically lasts 1-3 years, depending on the technique used, your skin type, lifestyle, and how well you follow aftercare instructions. Touch-up sessions are recommended to maintain optimal color and definition.",
  },
  {
    question: "Is the procedure painful?",
    answer:
      "Most clients experience minimal discomfort during the procedure. Topical numbing creams are applied before and during the treatment to ensure your comfort. The sensation is often described as a light scratching or vibration.",
  },
  {
    question: "What is the healing process like?",
    answer:
      "The healing process takes about 7-14 days. During this time, the color will appear darker initially and then soften to the desired shade. You'll receive detailed aftercare instructions to ensure optimal healing and results.",
  },
  {
    question: "Why choose Long-Time-Liner® products?",
    answer:
      "LONG-TIME-LINER® pigments are both organic and inorganic, free from heavy metals, and require minimal retouching. They do not contain PAH or NDELA, are sterile, cruelty-free, have a low allergy risk, and maintain their color stability for beautiful, long-lasting results.",
  },
  {
    question: "Do you offer training courses?",
    answer:
      "Yes! As a certified Long-Time-Liner® Regional Trainer, Birute Francis offers comprehensive training seminars for aspiring permanent makeup artists. Courses include Linergist, Eyebrow Stylist, Lip Stylist, and Eyeliner Stylist certifications.",
  },
];

export function FAQSection() {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center animate-fade-up">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
              FAQ
            </p>
            <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about permanent makeup and our services.
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border bg-card px-6"
              >
                <AccordionTrigger className="text-left font-heading text-lg font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
