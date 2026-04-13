import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import heroImage from "@/IMAGE 2026-01-22 19:24:11.jpg";

const products = [
  {
    id: "pencils",
    title: "PRE-DRAWING PENCILS",
    description:
      "We only use the quality LONG-TIME-LINER® pre-drawing pencils from Faber-Castell. They're soft, shiny, provide great coverage, and last a long time. These pencils make it easy to create precise micropigmentation pre-drawings with accurate and intense colors. You can mix the colors together to create your desired pre-drawing micropigmentation shade.",
    features: [
      "From Faber-Castell",
      "Soft and shiny",
      "Great coverage",
      "Long-lasting",
      "Precise pre-drawings",
      "Mixable colors",
    ],
  },
  {
    id: "duo",
    title: "CONTURE®-LINER DUO",
    description:
      "The CONTURE®-LINER DUO is likely the best micropigmentation device available. This precise PMU device has an electronic safety controller and can connect two precision micropigmentation liners. The safety controller guarantees accurate, quiet, and balanced micropigmentation, with quick color injection times.",
    features: [
      "Electronic safety controller",
      "Connects two liners",
      "Accurate & quiet operation",
      "Balanced micropigmentation",
      "Quick color injection",
      "Professional-grade device",
    ],
  },
  {
    id: "pigments",
    title: "PMU PIGMENTS",
    description:
      "Choose from a wide range of 72 colors suitable for various permanent makeup techniques like lips, eyebrows (ranging from hair strokes to ombre), eyeliner (from enhancing the lash line to creating shaded eyeliner), and camouflage. These colors can be easily mixed to meet your unique preferences.",
    features: [
      "72 color range",
      "Organic & inorganic",
      "Free from heavy metals",
      "No PAH or NDELA",
      "Sterile & cruelty-free",
      "Low allergy risk",
      "Excellent color stability",
      "Minimal retouching needed",
    ],
  },
  {
    id: "starter",
    title: "CONTURE LINER STARTER",
    description:
      "The CONTURE®-LINER DUO is likely the best micropigmentation device available. This precise PMU device has an electronic safety controller and can connect two precision micropigmentation liners. Connecting a second liner offers these benefits: Easy simultaneous use of two colors, Time-saving & Increased efficiency.",
    features: [
      "Dual liner capability",
      "Simultaneous two-color use",
      "Time-saving design",
      "Increased efficiency",
      "Professional starter kit",
      "Complete training solution",
    ],
  },
];

const Products = () => {
  return (
    <>
      <Helmet>
        <title>Long-Time-Liner® Products | Professional PMU Equipment Chicago</title>
        <meta
          name="description"
          content="High-quality Long-Time-Liner® permanent makeup products. Professional PMU devices, pigments, and pre-drawing pencils. Premium micropigmentation equipment."
        />
        <link rel="canonical" href="https://bfpermanentfrancis.com/products" />
      </Helmet>
      <Layout>
        <PageHero
          title="High-Quality Expert Products"
          subtitle="Products"
          backgroundImage={heroImage}
        />

        {/* Products Grid */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="grid gap-8 md:grid-cols-2">
              {products.map((product, index) => (
                <article
                  key={product.id}
                  className="card-hover rounded-2xl bg-card p-8 "
                  
                >
                  <h2 className="heading-sm mb-4">{product.title}</h2>
                  <p className="mb-6 text-muted-foreground">{product.description}</p>
                  
                  <div className="border-t pt-6">
                    <h3 className="mb-4 text-sm uppercase tracking-wider text-primary">
                      Key Features
                    </h3>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-12 rounded-2xl bg-secondary/50 p-8 text-center ">
              <h3 className="heading-sm mb-4">Interested in Long-Time-Liner® Products?</h3>
              <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
                Whether you're a professional looking for equipment or interested in our{" "}
                <Link to="/training" className="text-primary hover:text-primary/80">
                  training programs
                </Link>
                , we can help you get started with premium Long-Time-Liner® products.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Contact us for more information
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <CTASection />
      </Layout>
    </>
  );
};

export default Products;
