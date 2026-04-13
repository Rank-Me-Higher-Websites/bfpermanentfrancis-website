import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import heroImage from "@/IMAGE 2026-01-22 19:23:46.jpg";

const courses = [
  {
    id: "linergist",
    title: "LINERGIST®",
    subtitle: "For Experienced PMU Professionals",
    certificate: "LINERGIST®",
    requirements: "PMU Artist certificate",
    duration: "3 days, all day",
    price: "$3,500",
    priceNote: "plus applicable VAT",
    description:
      "Focused permanent make-up training for experienced micropigmentation (PMU) professionals, combined with basic training. For PMU Artists switching from other micropigmentation systems with knowledge of pre-drawing techniques.",
    features: [
      "Intensive 3-day seminar",
      "For experienced PMU artists",
      "Switch from other systems",
      "Complete theory & practical",
      "LINERGIST® certification",
    ],
  },
  {
    id: "eyebrows",
    title: "STEP-BY-STEP – EYEBROWS",
    subtitle: "Eyebrow Stylist Certification",
    certificate: "Eyebrow Stylist",
    requirements: "Education as a beautician or make up artist",
    duration: "3 days, all day",
    price: "$3,000",
    priceNote: "plus LONG-TIME-LINER® device (mandatory)",
    description:
      "Focused individual 3-day training seminar – including all theory and practical sections needed to get started with eyebrow micropigmentation.",
    features: [
      "Complete theory & practical",
      "Individual training",
      "Device purchase included",
      "All materials provided",
      "Eyebrow Stylist certification",
    ],
  },
  {
    id: "lips",
    title: "STEP BY STEP - LIPS",
    subtitle: "Lip Stylist Certification",
    certificate: "Lip Stylist",
    requirements: "Education as a beautician or make up artist",
    duration: "3 days, all day",
    price: "$3,000",
    priceNote: "plus LONG-TIME-LINER® device (mandatory)",
    description:
      "Focused individual 3-day training seminar – including all theory and practical sections needed to get started with lip micropigmentation.",
    features: [
      "Complete theory & practical",
      "Individual training",
      "Device purchase included",
      "All materials provided",
      "Lip Stylist certification",
    ],
  },
  {
    id: "eyeliner",
    title: "STEP BY STEP - EYELINER",
    subtitle: "Eyeliner Stylist Certification",
    certificate: "Eyeliner Stylist",
    requirements: "Education as a beautician or make up artist",
    duration: "3 days, all day",
    price: "$3,000",
    priceNote: "plus LONG-TIME-LINER® device (mandatory)",
    description:
      "Focused individual 3-day training seminar – including all theory and practical sections needed to get started with eyeliner micropigmentation.",
    features: [
      "Complete theory & practical",
      "Individual training",
      "Device purchase included",
      "All materials provided",
      "Eyeliner Stylist certification",
    ],
  },
];

const Training = () => {
  return (
    <>
      <Helmet>
        <title>Permanent Makeup Training Chicago | PMU Certification Courses</title>
        <meta
          name="description"
          content="Professional permanent makeup training courses in Chicago. Become a certified LINERGIST®, Eyebrow, Lip, or Eyeliner Stylist. Long-Time-Liner® certified training."
        />
        <link rel="canonical" href="https://bfpermanentfrancis.com/training" />
      </Helmet>
      <Layout>
        <PageHero
          title="Permanent Makeup Classes"
          subtitle="Training"
          backgroundImage={heroImage}
        />

        {/* Courses Grid */}
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="grid gap-4 md:gap-8 md:grid-cols-2 items-stretch">
              {courses.map((course, index) => (
                <Card
                  key={course.id}
                  className="h-full flex flex-col card-hover "
                  
                >
                  <CardContent className="flex flex-col flex-1 p-4 md:p-8">
                    <div className="mb-3 md:mb-6">
                      <p className="text-xs md:text-sm font-medium uppercase tracking-widest text-primary mb-1 md:mb-2">
                        {course.subtitle}
                      </p>
                      <h2 className="heading-sm !text-base md:!text-xl">{course.title}</h2>
                    </div>

                    <p className="text-xs md:text-base text-muted-foreground mb-3 md:mb-6">{course.description}</p>

                    <div className="space-y-1.5 md:space-y-3 mb-3 md:mb-6">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Award className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        <span className="text-xs md:text-sm">
                          <strong>Certificate:</strong> {course.certificate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        <span className="text-xs md:text-sm">
                          <strong>Duration:</strong> {course.duration}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                        <span className="text-xs md:text-sm">
                          <strong>Cost:</strong> {course.price}{" "}
                          <span className="text-muted-foreground">({course.priceNote})</span>
                        </span>
                      </div>
                    </div>

                    <ul className="flex-1 space-y-1 md:space-y-2 mb-4 md:mb-8">
                      {course.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                          <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button variant="cta" className="mt-auto w-full h-8 md:h-10 text-xs md:text-sm rounded-full" asChild>
                      <Link to="/booking">
                        Book Now
                        <ArrowRight className="ml-1.5 md:ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-5 md:mt-12 rounded-xl md:rounded-2xl bg-secondary/50 p-4 md:p-8 text-center">
              <h3 className="heading-sm mb-2 md:mb-4 !text-base md:!text-xl">Ready to Start Your PMU Career?</h3>
              <p className="mb-1 md:mb-2 text-xs md:text-base text-muted-foreground max-w-2xl mx-auto">
                Training seminars can be booked throughout the year. Please contact us to check 
                availability for your desired date.
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-6">
                Requirements vary by course. All prices are net excluding applicable VAT.
              </p>
              <Button variant="cta" size="lg" className="rounded-full text-sm md:text-base h-9 md:h-11" asChild>
                <Link to="/contact">
                  Contact Us to Book
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <CTASection />
      </Layout>
    </>
  );
};

export default Training;
