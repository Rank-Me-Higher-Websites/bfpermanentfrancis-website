import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

import heroImage from "@/IMAGE 2026-01-22 19:22:46.jpg";
import img1 from "@/IMAGE-2025-03-06-23_09_05.jpg";
import img2 from "@/IMAGE-2025-03-06-23_09_07.jpg";
import img3 from "@/IMAGE-2025-03-06-23_09_52.jpg";
import img4 from "@/IMAGE-2025-03-06-23_09_09.jpg";
import img5 from "@/IMAGE-2025-03-06-23_09_11.jpg";
import img6 from "@/IMAGE-2025-03-06-23_09_14.jpg";
import img7 from "@/IMAGE-2025-03-06-23_09_17.jpg";
import img8 from "@/IMAGE-2025-03-06-23_09_19.jpg";

const galleryImages = [
  { src: img1, alt: "Eyebrow Micropigmentation - Before and After" },
  { src: img2, alt: "Permanent Lips - Red Lips Enhancement" },
  { src: img3, alt: "Permanent Makeup - Beautiful Result" },
  { src: img4, alt: "Lip Enhancement - Ombre Lips Result" },
  { src: img5, alt: "Permanent Lips - Natural Color" },
  { src: img6, alt: "Lip Blush - Subtle Enhancement" },
  { src: img7, alt: "Eyebrow Micropigmentation - Natural Brows" },
  { src: img8, alt: "Permanent Lips - Bold Color" },
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
          backgroundImage={heroImage}
        />

        {/* Gallery Grid */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg md:rounded-xl card-hover"
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
