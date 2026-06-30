import { Layout } from "@/components/layout";
import { SEO, BreadcrumbSchema } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Printer } from "lucide-react";
import { CRISIS_NOTE } from "@/components/authority/AuthorityPage";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="break-inside-avoid">
      <h2 className="text-xl md:text-2xl font-bold text-navy mb-2">{title}</h2>
      <div className="text-foreground/85 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function MissionOnePager() {
  const handlePrint = () => window.print();
  return (
    <Layout>
      <SEO
        title="ValorWell Mission One-Pager | Mission, Model and Support Opportunities"
        description="A concise overview of ValorWell's mission, model, care access work, BestSelfs connection, and ways to support veterans and families."
        canonical="/mission-one-pager"
      />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Mission One-Pager", url: "/mission-one-pager" }]} />

      <section className="py-10 md:py-14 bg-background print:py-4">
        <div className="container-narrow max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 print:hidden">
            <p className="text-sm font-semibold uppercase tracking-widest text-patriot-red">Mission Brief</p>
            <Button onClick={handlePrint} variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
              <Printer className="h-4 w-4 mr-2" /> Download / Print This Page
            </Button>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">ValorWell Mission One-Pager</h1>
          <p className="text-lg text-muted-foreground mb-8">A concise overview of the mission, model, and support opportunities.</p>

          <div className="space-y-7">
            <Block title="Mission">
              <p>ValorWell is building a better support system so veterans and their families can get mental health care, accurate clinical documentation, and practical tools without waiting months, going untreated, or relying on predatory systems.</p>
            </Block>

            <Block title="The Problem">
              <p>Veterans and families face long waits, limited provider access, fragmented systems, confusing coverage barriers, and documentation gaps. When support is too slow or too hard to access, predatory alternatives often fill the gap.</p>
            </Block>

            <Block title="What ValorWell Builds">
              <ul className="list-disc pl-5 space-y-1">
                <li>Mental health care access</li>
                <li>Veteran and family support</li>
                <li>Documentation-aware clinical care</li>
                <li>BestSelfs tools</li>
                <li>Media and education</li>
                <li>Supporter-funded care</li>
                <li>Impact tracking</li>
              </ul>
            </Block>

            <Block title="Why BestSelfs Matters">
              <p>BestSelfs creates practical tools that help families build emotional skills, communication, routines, reading, and growth. Revenue from BestSelfs helps support the larger ValorWell mission.</p>
            </Block>

            <Block title="What Support Funds">
              <ul className="list-disc pl-5 space-y-1">
                <li>Direct therapist costs</li>
                <li>Care access</li>
                <li>Practical tools</li>
                <li>Education</li>
                <li>Media and awareness</li>
                <li>Impact tracking</li>
                <li>Mission infrastructure</li>
              </ul>
            </Block>

            <Block title="Direct Therapist Cost">
              <p><strong>$75 helps cover the direct therapist cost of one session.</strong> That amount helps pay the clinician providing care and does not represent ValorWell's full operating cost.</p>
            </Block>

            <Block title="Ways to Help">
              <ul className="list-disc pl-5 space-y-1">
                <li><Link className="text-patriot-red underline" to="/beyondtheyellow">Go Beyond the Yellow</Link></li>
                <li><Link className="text-patriot-red underline" to="/monthly-supporters">Become a Monthly Supporter</Link></li>
                <li><Link className="text-patriot-red underline" to="/sponsor-care">Sponsor Care</Link></li>
                <li><Link className="text-patriot-red underline" to="/partners">Partner with ValorWell</Link></li>
                <li><Link className="text-patriot-red underline" to="/referral-partners">Refer a veteran or family</Link></li>
                <li>Share the mission</li>
                <li><Link className="text-patriot-red underline" to="/media">Subscribe to ValorWell Media</Link></li>
                <li><Link className="text-patriot-red underline" to="/bestselfs">Subscribe to BestSelfs products</Link></li>
              </ul>
            </Block>

            <Block title="Contact">
              <Card><CardContent className="p-5">
                <p className="mb-3">Email: <a className="text-patriot-red underline" href="mailto:info@valorwell.org">info@valorwell.org</a></p>
                <Button asChild className="bg-patriot-red hover:bg-patriot-red-dark text-white print:hidden">
                  <Link to="/contact">Contact ValorWell</Link>
                </Button>
              </CardContent></Card>
            </Block>

            <p className="text-sm text-muted-foreground border-t pt-4">{CRISIS_NOTE}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
