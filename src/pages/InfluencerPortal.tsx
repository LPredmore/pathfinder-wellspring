import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PlatformIcon, buildSocialUrl } from "@/components/icons/PlatformIcon";
import type { Tables } from "@/integrations/supabase/types";

type Influencer = Tables<"influencers">;
type Platform = Tables<"influencer_platforms">;

export default function InfluencerPortal() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/", { replace: true });
      return;
    }

    const fetchData = async () => {
      const { data: inf } = await supabase
        .from("influencers")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!inf) {
        setLoading(false);
        return;
      }

      setInfluencer(inf);

      const { data: plats } = await supabase
        .from("influencer_platforms")
        .select("*")
        .eq("influencer_id", inf.id);

      setPlatforms(plats ?? []);
      setLoading(false);
    };

    fetchData();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="container-wide py-16 space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Layout>
    );
  }

  if (!influencer) {
    return (
      <Layout>
        <div className="container-wide py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">No Profile Found</h1>
          <p className="text-muted-foreground mt-2">
            We couldn't find a Mission Partner profile linked to your account.
          </p>
        </div>
      </Layout>
    );
  }

  const displayName = influencer.pref_name || influencer.first_name;
  const avatarUrl = influencer.avatar_url
    ? `https://asjhkidpuhqodryczuth.supabase.co/storage/v1/object/public/avatars/${influencer.avatar_url}`
    : undefined;

  return (
    <Layout>
      <div className="container-wide py-12 max-w-3xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="text-2xl">
              {influencer.first_name[0]}
              {influencer.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {displayName} {influencer.last_name}
            </h1>
            <p className="text-muted-foreground">{influencer.email}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{influencer.state}</Badge>
              <Badge variant="outline">{influencer.status}</Badge>
            </div>
          </div>
        </div>

        {/* Personal Mission */}
        {influencer.personal_mission && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{influencer.personal_mission}</p>
            </CardContent>
          </Card>
        )}

        {/* Veteran Connection */}
        {influencer.veteran_connection && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Veteran Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{influencer.veteran_connection}</p>
            </CardContent>
          </Card>
        )}

        {/* Social Platforms */}
        {platforms.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Social Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {platforms.map((p) => {
                  const url = p.platform_name && p.handle
                    ? buildSocialUrl(p.platform_name, p.handle)
                    : null;

                  return (
                    <div key={p.id} className="flex items-center gap-3">
                      <PlatformIcon
                        platform={p.platform_name ?? ""}
                        className="h-5 w-5 text-muted-foreground"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-foreground">
                          {p.platform_name}
                        </span>
                        {p.handle && (
                          <>
                            {" — "}
                            {url ? (
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                @{p.handle}
                              </a>
                            ) : (
                              <span className="text-muted-foreground">@{p.handle}</span>
                            )}
                          </>
                        )}
                      </div>
                      {p.follower_count != null && (
                        <span className="text-sm text-muted-foreground">
                          {p.follower_count.toLocaleString()} followers
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
