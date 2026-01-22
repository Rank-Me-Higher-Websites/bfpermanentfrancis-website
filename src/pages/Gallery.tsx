import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

import gallery1 from "@/IMAGE-2025-03-06-23_09_11.jpg";
import gallery2 from "@/IMAGE-2025-03-06-23_09_05.jpg";
import gallery3 from "@/IMAGE-2025-03-06-23_09_09.jpg";
import gallery4 from "@/IMAGE-2025-03-06-23_09_07.jpg";
import gallery5 from "@/IMAGE-2025-03-06-23_09_14.jpg";
import gallery6 from "@/IMAGE-2025-03-06-23_09_21.jpg";
import gallery7 from "@/IMAGE-2025-03-06-23_09_47.jpg";
import gallery8 from "@/IMAGE-2025-03-06-23_09_45.jpg";
import gallery9 from "@/IMAGE-2025-03-06-23_09_19.jpg";
import gallery10 from "@/IMAGE-2025-03-06-23_09_17.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import gallery13 from "@/assets/gallery-13.jpg";
import gallery14 from "@/assets/gallery-14.jpg";
import gallery15 from "@/assets/gallery-15.jpg";
import gallery16 from "@/assets/gallery-16.jpg";
import gallery17 from "@/assets/gallery-17.jpg";
import gallery18 from "@/assets/gallery-18.jpg";
import gallery19 from "@/assets/gallery-19.jpg";

const galleryImages = [
  { src: gallery1, alt: "Eyebrow Micropigmentation - Before and After" },
  { src: gallery2, alt: "Permanent Lips - Red Lips Enhancement" },
  { src: gallery3, alt: "Lip Enhancement - Ombre Lips Result" },
  { src: gallery4, alt: "Permanent Lips - Natural Color" },
  { src: gallery5, alt: "Lip Blush - Subtle Enhancement" },
  { src: gallery6, alt: "Eyebrow Micropigmentation - Natural Brows" },
  { src: gallery7, alt: "Permanent Lips - Bold Color" },
  { src: gallery8, alt: "Ombre Brows - Powder Effect" },
  { src: gallery9, alt: "Lip Enhancement - Pink Tones" },
  { src: gallery10, alt: "Eyebrow Shaping - Perfect Arch" },
  { src: gallery11, alt: "Permanent Makeup Transformation" },
  { src: gallery12, alt: "Lip Blush - Natural Color Enhancement" },
  { src: gallery13, alt: "Eyebrow Micropigmentation Result" },
  { src: gallery14, alt: "Permanent Lips - Stunning Results" },
  { src: gallery15, alt: "Brow Enhancement - Hair Strokes" },
  { src: gallery16, alt: "Lip Color Correction" },
  { src: gallery17, alt: "Eyebrow Transformation" },
  { src: gallery18, alt: "Permanent Makeup - Before and After" },
  { src: gallery19, alt: "Cosmetic Tattooing Result" },
];

const Gallery = () => {
  return (
    <>
      <Helmet>
        <title>Permanent Makeup Gallery | Before & After Chicago</title>
        <meta
          name="description"
          content="View stunning permanent makeup transformations. Before and after photos of eyebrow micropigmentation, lip enhancement, and eyeliner by Birute Francis in Chicago."
        />
        <link rel="canonical" href="https://bfpermanentfrancis.com/gallery" />
      </Helmet>
      <Layout>
        <PageHero
          title="Stunning Transformations"
          subtitle="Gallery"
          backgroundImage={gallery8}
        />

        {/* Gallery Grid */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-xl card-hover animate-fade-up"
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-sm text-primary-foreground">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </Layout>
    </>
  );
};

export default Gallery;
