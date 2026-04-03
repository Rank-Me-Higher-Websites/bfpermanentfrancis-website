import { Star } from "lucide-react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import reviewAmelia from "@/assets/review-amelia.png";
import reviewKaren from "@/assets/review-karen.png";
import reviewElizabeth from "@/assets/review-elizabeth.png";

const reviews = [
  {
    id: 1,
    name: "Amelia Klark",
    image: reviewAmelia,
    rating: 5,
    text: "I couldn't be happier with my permanent lip ombre experience. It has simplified my daily routine, enhanced my natural beauty, and boosted my confidence in the most subtle and elegant way possible!",
  },
  {
    id: 2,
    name: "Karen Rooke",
    image: reviewKaren,
    rating: 5,
    text: "Birute is so skilled at what she does. She made the entire process feel easy and comfortable. I couldn't be any happier with the result! Thank you so much xxx",
  },
  {
    id: 3,
    name: "Elizabeth Ardale",
    image: reviewElizabeth,
    rating: 5,
    text: "The results are nothing short of amazing. Birute ensured that the eyeliner was tailored to my unique eye shape and desired look. It's a game-changer that has me feeling and looking my best every day!",
  },
];

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.85;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-6 md:mb-10 max-w-2xl text-center animate-fade-up">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Our Lovely Customers
          </p>
          <h2 className="heading-lg mb-2 md:mb-4">
            What Our Customers Say
          </h2>
        </div>

        {/* Mobile: horizontal scroll | Desktop: grid */}
        <div className="relative">
          {/* Scroll arrows — mobile only */}
          <button
            onClick={() => scroll("left")}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border shadow-md"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card border border-border shadow-md"
            aria-label="Next review"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-1 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible"
          >
            {reviews.map((review, index) => (
              <article
                key={review.id}
                className="card-hover flex flex-col rounded-2xl bg-card border border-gray-300 p-6 md:p-8 animate-fade-up min-w-[280px] max-w-[320px] md:min-w-0 md:max-w-none snap-center flex-shrink-0 md:flex-shrink"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* Author */}
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-heading font-semibold text-sm md:text-base">{review.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 md:h-4 md:w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="flex-1 text-sm md:text-base text-muted-foreground">
                  "{review.text}"
                </blockquote>
              </article>
            ))}
          </div>

          {/* Scroll indicator dots — mobile only */}
          <div className="flex justify-center gap-1.5 mt-4 md:hidden">
            {reviews.map((r) => (
              <div key={r.id} className="h-1.5 w-1.5 rounded-full bg-primary/30" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
