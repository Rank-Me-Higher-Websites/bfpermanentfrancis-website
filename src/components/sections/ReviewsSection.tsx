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
  return (
    <section className="section-padding section-dark">
      <div className="section-container">
        <div className="mx-auto mb-3 md:mb-10 max-w-2xl text-center ">
          <span className="section-label">
            Testimonials
          </span>
          <h2 className="heading-lg mb-2 md:mb-3">
            What Our Clients Say
          </h2>
          <div className="divider-soft" />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-8">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="card-elegant flex flex-col p-4 md:p-9 border border-white/10"
              data-testid={`review-card-${review.id}`}
            >
              <div className="flex gap-0.5 md:gap-1 mb-2 md:mb-6">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 md:h-5 md:w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="flex-1 text-[13px] md:text-[16px] text-white/80 leading-[1.5] md:leading-[1.8] mb-3 md:mb-7 italic">
                "{review.text}"
              </blockquote>

              <div className="flex items-center gap-3 md:gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="h-8 w-8 md:h-12 md:w-12 rounded-full object-cover ring-2 ring-white/15"
                />
                <p className="font-heading text-sm md:text-base font-semibold text-white" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                  {review.name}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
