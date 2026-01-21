import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { CTASection } from "@/components/sections/CTASection";

// Import real gallery images from original website
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";

const galleryImages = [
  { src: gallery1, alt: "Permanent Makeup Result - Before and After" },
  { src: gallery2, alt: "Eyebrow Micropigmentation - Natural Brows" },
  { src: gallery3, alt: "Lip Enhancement - Ombre Lips Result" },
  { src: gallery4, alt: "Permanent Eyeliner - Lash Enhancement" },
  { src: gallery5, alt: "Microblading Result - Hair Strokes" },
  { src: gallery6, alt: "Lip Blush - Natural Color Enhancement" },
  { src: gallery7, alt: "Ombre Brows - Powder Effect" },
  { src: gallery8, alt: "Permanent Makeup Transformation" },
  { src: gallery9, alt: "Eyebrow Shaping - Perfect Arch" },
  { src: gallery10, alt: "Cosmetic Tattooing Result" },
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
        {/* Hero */}
        <section className="section-padding-sm" style={{ background: "var(--section-gradient)" }}>
          <div className="section-container">
            <div className="mx-auto max-w-3xl text-center animate-fade-up">
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
                Gallery
              </p>
              <h1 className="heading-xl mb-6">Stunning Transformations</h1>
              <p className="text-lg text-muted-foreground">
                Browse our portfolio of permanent makeup results. Each treatment is customized 
                to enhance natural beauty and deliver long-lasting, stunning results.
              </p>
            </div>
          </div>
        </section>

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
