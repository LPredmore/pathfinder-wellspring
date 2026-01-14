import { useEffect } from "react";
import { Layout } from "@/components/layout";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "givebutter-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { id: string },
        HTMLElement
      >;
    }
  }
}

const Donate = () => {
  useEffect(() => {
    // Load Givebutter widget script
    const script = document.createElement("script");
    script.src = "https://widgets.givebutter.com/latest.umd.cjs?acct=Va6YNEvelLe8kJru&p=other";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
            Support Our Mission
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Your contribution helps veterans who can't wait months for VA care.
          </p>
          
          {/* Givebutter widget will render here */}
          <div className="flex justify-center">
            <givebutter-widget id="Va6YNEvelLe8kJru"></givebutter-widget>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
