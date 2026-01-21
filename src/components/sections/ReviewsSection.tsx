import { Star } from "lucide-react";
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
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center animate-fade-up">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
            Our Lovely Customers
          </p>
          <h2 className="heading-lg mb-4">
            We Take Pride in What Our Customers Say About Us!
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <article
              key={review.id}
              className="card-hover flex flex-col rounded-2xl bg-card p-8 animate-fade-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Author */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-heading font-semibold">{review.name}</p>
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-muted-foreground">
                "{review.text}"
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
