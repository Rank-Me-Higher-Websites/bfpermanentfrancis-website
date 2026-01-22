import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

import img1 from "@/IMAGE 2026-01-22 19:22:40.jpg";
import img2 from "@/IMAGE 2026-01-22 19:22:42.jpg";
import img3 from "@/IMAGE 2026-01-22 19:22:44.jpg";
import img4 from "@/IMAGE 2026-01-22 19:22:46.jpg";
import img5 from "@/IMAGE 2026-01-22 19:22:48.jpg";
import img6 from "@/IMAGE 2026-01-22 19:22:49.jpg";
import img7 from "@/IMAGE 2026-01-22 19:22:52.jpg";
import img8 from "@/IMAGE 2026-01-22 19:22:54.jpg";
import img9 from "@/IMAGE 2026-01-22 19:22:57.jpg";
import img10 from "@/IMAGE 2026-01-22 19:23:01.jpg";
import img11 from "@/IMAGE 2026-01-22 19:23:04.jpg";
import img12 from "@/IMAGE 2026-01-22 19:23:06.jpg";
import img13 from "@/IMAGE 2026-01-22 19:23:25.jpg";
import img14 from "@/IMAGE 2026-01-22 19:23:46.jpg";
import img15 from "@/IMAGE 2026-01-22 19:23:55.jpg";
import img16 from "@/IMAGE 2026-01-22 19:24:03.jpg";
import img17 from "@/IMAGE 2026-01-22 19:24:05.jpg";
import img18 from "@/IMAGE 2026-01-22 19:24:06.jpg";
import img19 from "@/IMAGE 2026-01-22 19:24:08.jpg";
import img20 from "@/IMAGE 2026-01-22 19:24:11.jpg";
import img21 from "@/IMAGE 2026-01-22 19:24:36.jpg";
import img22 from "@/IMAGE-2025-03-06-23_09_05.jpg";
import img23 from "@/IMAGE-2025-03-06-23_09_07.jpg";
import img24 from "@/IMAGE-2025-03-06-23_09_09.jpg";
import img25 from "@/IMAGE-2025-03-06-23_09_11.jpg";
import img26 from "@/IMAGE-2025-03-06-23_09_14.jpg";
import img27 from "@/IMAGE-2025-03-06-23_09_17.jpg";
import img28 from "@/IMAGE-2025-03-06-23_09_19.jpg";
import img29 from "@/IMAGE-2025-03-06-23_09_21.jpg";
import img30 from "@/IMAGE-2025-03-06-23_09_45.jpg";
import img31 from "@/IMAGE-2025-03-06-23_09_47.jpg";

const galleryImages = [
  { src: img1, alt: "Permanent Makeup Result" },
  { src: img2, alt: "Eyebrow Micropigmentation" },
  { src: img3, alt: "Lip Enhancement Result" },
  { src: img4, alt: "Permanent Makeup Transformation" },
  { src: img5, alt: "Eyebrow Styling" },
  { src: img6, alt: "Lip Blush Result" },
  { src: img7, alt: "Micropigmentation Work" },
  { src: img8, alt: "Permanent Makeup Before and After" },
  { src: img9, alt: "Eyebrow Enhancement" },
  { src: img10, alt: "Lip Color Enhancement" },
  { src: img11, alt: "Brow Transformation" },
  { src: img12, alt: "Permanent Lips Result" },
  { src: img13, alt: "Eyebrow Micropigmentation Result" },
  { src: img14, alt: "Lip Enhancement" },
  { src: img15, alt: "Permanent Makeup Work" },
  { src: img16, alt: "Eyebrow Shaping" },
  { src: img17, alt: "Lip Blush Enhancement" },
  { src: img18, alt: "Micropigmentation Result" },
  { src: img19, alt: "Permanent Makeup Transformation" },
  { src: img20, alt: "Eyebrow Styling Result" },
  { src: img21, alt: "Lip Color Result" },
  { src: img22, alt: "Eyebrow Micropigmentation - Before and After" },
  { src: img23, alt: "Permanent Lips - Red Lips Enhancement" },
  { src: img24, alt: "Lip Enhancement - Ombre Lips Result" },
  { src: img25, alt: "Permanent Lips - Natural Color" },
  { src: img26, alt: "Lip Blush - Subtle Enhancement" },
  { src: img27, alt: "Eyebrow Micropigmentation - Natural Brows" },
  { src: img28, alt: "Permanent Lips - Bold Color" },
  { src: img29, alt: "Ombre Brows - Powder Effect" },
  { src: img30, alt: "Lip Enhancement - Pink Tones" },
  { src: img31, alt: "Eyebrow Shaping - Perfect Arch" },
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
          backgroundImage={img8}
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
