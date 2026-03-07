import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { CreatorApplicationForm } from "@/components/forms/CreatorApplicationForm";
import { Card, CardContent } from "@/components/ui/card";

const CreatorApply = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <SEO
        title="Apply — Beyond the Yellow | ValorWell"
        description="Apply to become a Mission Partner in ValorWell's Beyond the Yellow campaign and help secure therapy hours for veterans."
        canonical="https://valorwell.org/beyondtheyellow/apply"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://valorwell.org/" },
          { name: "Beyond the Yellow", url: "https://valorwell.org/beyondtheyellow" },
          { name: "Apply", url: "https://valorwell.org/beyondtheyellow/apply" },
        ]}
      />

      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <CreatorApplicationForm inline />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreatorApply;
