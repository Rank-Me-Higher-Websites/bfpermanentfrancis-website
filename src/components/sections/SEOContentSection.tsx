import { Link } from "react-router-dom";

export function SEOContentSection() {
  return (
    <section className="section-padding-sm bg-background">
      <div className="section-container">
        <article className="mx-auto max-w-4xl prose prose-lg">
          <div className="">
            <h2 className="heading-md mb-6 text-center">
              Chicago's Premier Permanent Makeup Studio
            </h2>
            
            <p className="text-muted-foreground mb-6">
              At BF Permanent Francis, we specialize in professional <strong>permanent makeup in Chicago</strong> and 
              the surrounding areas. Our certified Long-Time-Liner® Regional Trainer, Birute Francis, brings years 
              of expertise in <Link to="/treatments" className="text-primary hover:text-primary/80">micropigmentation 
              treatments</Link> including eyebrow micropigmentation, permanent eyeliner, and lip enhancement.
            </p>

            <p className="text-muted-foreground mb-6">
              Using only the highest quality <Link to="/products" className="text-primary hover:text-primary/80">
              LONG-TIME-LINER® products</Link>, we ensure safe, long-lasting results that enhance your natural beauty. 
              Our pigments are organic and inorganic, free from heavy metals, sterile, cruelty-free, and maintain 
              excellent color stability.
            </p>

            <p className="text-muted-foreground mb-6">
              Whether you're looking for subtle <strong>lash line enhancement</strong>, dramatic <strong>ombré brows</strong>, 
              or beautiful <strong>lip blush</strong>, our personalized approach ensures results that complement your 
              unique features. We also offer <Link to="/training" className="text-primary hover:text-primary/80">
              professional PMU training courses</Link> for aspiring permanent makeup artists.
            </p>

            <p className="text-muted-foreground">
              Visit our studio at La Passion Beauty Salon in Lemont, IL, conveniently serving clients from 
              <strong> Chicago, Lemont, Orland Park, Naperville</strong>, and surrounding communities. 
              <Link to="/contact" className="text-primary hover:text-primary/80 ml-1">Contact us today</Link> to 
              schedule your consultation and discover the confidence that comes with effortless, long-lasting beauty.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
