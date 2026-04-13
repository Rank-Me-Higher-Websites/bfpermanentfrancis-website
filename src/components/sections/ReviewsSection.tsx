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
    <section className="section-padding section-dark">
      <div className="section-container">
        <div className="mx-auto mb-8 md:mb-10 max-w-2xl text-center ">
          <span className="section-label">
            Testimonials
          </span>
          <h2 className="heading-lg mb-3">
            What Our Clients Say
          </h2>
          <div className="divider-soft" />
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 shadow-md"
            aria-label="Previous review"
            data-testid="button-review-prev"
          >
            <ChevronLeft className="h-4 w-4 text-white/80" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 shadow-md"
            aria-label="Next review"
            data-testid="button-review-next"
          >
            <ChevronRight className="h-4 w-4 text-white/80" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-1 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible"
          >
            {reviews.map((review, index) => (
              <article
                key={review.id}
                className="card-elegant flex flex-col p-7 md:p-9 min-w-[300px] max-w-[340px] md:min-w-0 md:max-w-none snap-center flex-shrink-0 md:flex-shrink border border-white/10"
                data-testid={`review-card-${review.id}`}
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="flex-1 text-[16px] text-white/80 leading-[1.8] mb-7 italic">
                  "{review.text}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white/15"
                  />
                  <p className="font-heading text-base font-semibold text-white" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                    {review.name}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-5 md:hidden">
            {reviews.map((r) => (
              <div key={r.id} className="h-1 w-6 rounded-full bg-primary/20" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
