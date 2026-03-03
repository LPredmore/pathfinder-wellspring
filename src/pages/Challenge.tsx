import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PlatformIcon, buildSocialUrl } from "@/components/icons/PlatformIcon";
import { Button } from "@/components/ui/button";
import flagSkyBackground from "@/assets/flag-sky-background-vertical.png";

interface CreatorPlatform {
  platform_name: string | null;
  handle: string | null;
}

function CompetitorCard({ competitor, platforms, compLink }: { competitor: any; platforms: CreatorPlatform[]; compLink?: string | null }) {
  const name = competitor.pref_name || `${competitor.first_name} ${competitor.last_name}`;
  const hasAvatar = !!competitor.avatar_url;
  const hasMission = !!competitor.personal_mission;

  return (
    <Card className="text-center">
      <CardHeader className="items-center pb-2">
        {hasAvatar && (
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage src={competitor.avatar_url} alt={name} />
            <AvatarFallback className="text-lg font-bold">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {platforms.length > 0 && (
          <div className="flex items-center justify-center gap-3">
            {platforms.map((p, i) => {
              const platformName = p.platform_name || "Other";
              const handle = p.handle || "";
              const url = buildSocialUrl(platformName, handle);
              return url ? (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title={platformName}
                >
                  <PlatformIcon platform={platformName} className="h-5 w-5" />
                </a>
              ) : (
                <span key={i} className="text-muted-foreground flex items-center gap-1 text-sm">
                  <PlatformIcon platform={platformName} className="h-4 w-4" />
                  {handle}
                </span>
              );
            })}
          </div>
        )}
        {hasMission && (
          <p className="text-sm text-muted-foreground italic">"{competitor.personal_mission}"</p>
        )}
        {compLink && (
          <Button asChild className="w-full mt-2">
            <a href={compLink} target="_blank" rel="noopener noreferrer">
              Sponsor This Partner
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function Challenge() {
  const { data, isLoading } = useQuery({
    queryKey: ["current-competitors"],
    queryFn: async () => {
      const { data: competitors, error } = await supabase
        .from("influencers")
        .select("*")
        .eq("is_competing", true)
        .order("created_at", { ascending: true });
      if (error) throw error;

      const ids = competitors.map((c) => c.id);
      if (ids.length === 0) return { competitors, platformMap: new Map<string, CreatorPlatform[]>(), compLinkMap: new Map<string, string>() };

      const { data: platforms, error: pErr } = await supabase
        .from("influencer_platforms")
        .select("influencer_id, platform_name, handle")
        .in("influencer_id", ids);
      if (pErr) throw pErr;

      const platformMap = new Map<string, CreatorPlatform[]>();
      for (const p of platforms) {
        const list = platformMap.get(p.influencer_id) || [];
        list.push({ platform_name: p.platform_name, handle: p.handle });
        platformMap.set(p.influencer_id, list);
      }

      const { data: compData, error: cErr } = await supabase
        .from("current_competitors")
        .select("influencer_id, comp_link")
        .in("influencer_id", ids);
      if (cErr) throw cErr;

      const compLinkMap = new Map<string, string>();
      for (const c of compData) {
        if (c.influencer_id && c.comp_link) {
          compLinkMap.set(c.influencer_id, c.comp_link);
        }
      }

      return { competitors, platformMap, compLinkMap };
    },
  });

  const competitors = data?.competitors ?? [];
  const platformMap = data?.platformMap ?? new Map<string, CreatorPlatform[]>();
  const compLinkMap = data?.compLinkMap ?? new Map<string, string>();

  return (
    <Layout>
      <SEO
        title="Current Challenge | Beyond the Yellow"
        description="Meet our Mission Partners competing to secure therapy hours for veterans and military families."
        canonical="/challenge"
      />

      <div
        className="relative bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${flagSkyBackground})` }}
      >
        <div className="absolute inset-0 bg-white/85" />

        {/* Hero */}
        <section className="relative z-10 hero-gradient py-10 md:py-14">
          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Current Challenge
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch our Mission Partners compete to secure therapy hours for veterans and military families.
            </p>
          </div>
        </section>

        {/* Mission Partners */}
        <section className="relative z-10 section-padding">
          <div className="container-wide">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Meet Our Mission Partners
            </h2>
            <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
              These are the heroes who answered the call for our heroes. We encourage everyone to go check out their social media profiles and show them the same support they are showing our veterans. And pick one to donate through.
            </p>
            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading…</p>
            ) : competitors.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Mission Partners will appear here once the challenge begins.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {competitors.map((c) => (
                  <CompetitorCard key={c.id} competitor={c} platforms={platformMap.get(c.id) || []} compLink={compLinkMap.get(c.id)} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Leaderboard + Thermometer */}
        <section className="relative z-10 section-padding section-alt">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-primary">
                <CardHeader className="text-center">
                  <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-2xl">Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-hidden w-full" style={{ paddingTop: "240px" }}>
                    <iframe
                      title="Donation form powered by Zeffy"
                      className="absolute inset-0 w-full h-full border-0"
                      src="https://www.zeffy.com/embed/leaderboard/creator-challenge-sponsor-a-veteran"
                      allowTransparency
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/30">
                <CardHeader className="text-center">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-2xl">Campaign Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-hidden w-full" style={{ paddingTop: "120px" }}>
                    <iframe
                      title="Donation thermometer powered by Zeffy"
                      className="absolute inset-0 w-full h-full border-0"
                      src="https://www.zeffy.com/embed/thermometer/creator-challenge-sponsor-a-veteran"
                      allowTransparency
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
