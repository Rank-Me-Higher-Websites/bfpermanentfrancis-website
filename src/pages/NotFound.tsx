import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | BF Permanent Francis</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>
      <Layout>
        <section className="section-padding flex items-center justify-center min-h-[60vh]">
          <div className="section-container">
            <div className="mx-auto max-w-lg text-center">
              <p className="text-8xl font-heading font-bold text-primary mb-4">404</p>
              <h1 className="heading-lg mb-4">Page Not Found</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Sorry, the page you're looking for doesn't exist or has been moved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" asChild>
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    Go Home
                  </Link>
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default NotFound;
