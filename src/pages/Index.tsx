import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";


const Index = () => {
  return (
    <>
      <Helmet>
        <title>BF Permanent Francis | Permanent Makeup Chicago - Eyebrows, Lips, Eyeliner</title>
        <meta
          name="description"
          content="Expert permanent makeup services in Chicago by certified Long-Time-Liner® trainer. Eyebrow micropigmentation, lip enhancement, eyeliner. Book your consultation today!"
        />
        <meta name="keywords" content="permanent makeup Chicago, microblading, eyebrow micropigmentation, lip tattoo, eyeliner tattoo, Long-Time-Liner, PMU Chicago" />
        <link rel="canonical" href="https://bfpermanentfrancis.com" />
      </Helmet>
      <Layout>
        <HeroSection />
        
        <AboutSection />
        <ServicesSection />
        <ReviewsSection />
        <LocationSection />
        <FAQSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
