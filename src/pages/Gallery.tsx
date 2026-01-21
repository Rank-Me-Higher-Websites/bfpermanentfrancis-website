import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { CTASection } from "@/components/sections/CTASection";
import serviceLips from "@/assets/service-lips.jpg";
import serviceEyebrows from "@/assets/service-eyebrows.jpg";
import serviceEyeliner from "@/assets/service-eyeliner.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import biruteFrancis from "@/assets/birute-francis.jpg";

const galleryImages = [
  { src: serviceLips, alt: "Permanent Lip Makeup Result - Ombre Lips Chicago" },
  { src: serviceEyebrows, alt: "Eyebrow Micropigmentation Result - Perfect Brows Chicago" },
  { src: serviceEyeliner, alt: "Permanent Eyeliner Result - Lash Enhancement Chicago" },
  { src: heroBg, alt: "Permanent Makeup Treatment in Progress" },
  { src: biruteFrancis, alt: "Birute Francis - Certified PMU Artist" },
  { src: serviceLips, alt: "Beautiful Lip Blush Results" },
  { src: serviceEyebrows, alt: "Ombre Brow Transformation" },
  { src: serviceEyeliner, alt: "Subtle Eyeliner Enhancement" },
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
