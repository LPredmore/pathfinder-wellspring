import { Layout } from "./Layout";
import { SEO } from "@/components/SEO";

interface PageShellProps {
  name: string;
  path: string;
}

export function PageShell({ name, path }: PageShellProps) {
  return (
    <Layout>
      <SEO title={`${name} — ValorWell`} description={`${name} — page rebuild pending.`} canonical={path} noIndex />
      <div className="container-narrow py-16">
        <h1 className="text-3xl font-semibold text-foreground">{name}</h1>
        <p className="mt-4 text-muted-foreground">Page rebuild pending.</p>
      </div>
    </Layout>
  );
}
