import { Layout } from "@/components/layout";
import { SEO } from "@/components/SEO";
import { Hero } from "@/components/sections";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, Globe } from "lucide-react";

const resources = [
  { title: "Veterans Crisis Line", phone: "988 (Press 1)", description: "24/7 support for veterans in crisis", icon: Phone },
  { title: "Crisis Text Line", phone: "Text HOME to 741741", description: "Free, 24/7 crisis counseling via text", icon: MessageCircle },
  { title: "Military OneSource", phone: "1-800-342-9647", description: "Non-medical counseling and resources", icon: Globe },
];

const UrgentHelp = () => (
  <Layout>
    <SEO 
      title="Urgent Help - Crisis Resources"
      description="If you're in crisis, help is available now. Veterans Crisis Line, Crisis Text Line, and other 24/7 mental health resources for veterans and military families."
      canonical="/urgent-help"
    />
    <Hero title="Urgent Help" subtitle="If you're in crisis, help is available now." ctaText="" ctaLink="" />
    <section className="section-padding">
      <div className="container-narrow">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8 text-center">
          <p className="text-lg font-medium text-foreground">If you are in immediate danger, call 911</p>
        </div>
        <div className="grid gap-6">
          {resources.map((r) => (
            <Card key={r.title}>
              <CardHeader className="flex-row items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><r.icon className="h-5 w-5 text-primary" /></div>
                <div><CardTitle className="text-lg">{r.title}</CardTitle><p className="text-muted-foreground text-sm">{r.description}</p></div>
              </CardHeader>
              <CardContent><p className="font-medium text-primary">{r.phone}</p></CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default UrgentHelp;
