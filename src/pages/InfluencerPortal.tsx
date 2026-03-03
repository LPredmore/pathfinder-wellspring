import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlatformIcon, buildSocialUrl } from "@/components/icons/PlatformIcon";
import { Pencil, Check, X, Plus, Trash2, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Influencer = Tables<"influencers">;
type Platform = Tables<"influencer_platforms">;

const PLATFORM_OPTIONS = [
  "BlueSky", "Facebook", "Instagram", "LinkedIn", "Patreon",
  "Reddit", "SnapChat", "TikTok", "Twitch", "X", "YouTube",
];

export default function InfluencerPortal() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit states
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Platform editing
  const [addingPlatform, setAddingPlatform] = useState(false);
  const [newPlatformName, setNewPlatformName] = useState("");
  const [newPlatformHandle, setNewPlatformHandle] = useState("");
  const [newPlatformFollowers, setNewPlatformFollowers] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/", { replace: true });
      return;
    }
    fetchData();
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    if (!user) return;
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

  const startEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  const saveField = async (field: string) => {
    if (!influencer) return;
    setSaving(true);

    try {
      if (field === "email") {
        // Update auth email
        const { error: authError } = await supabase.auth.updateUser({ email: editValue });
        if (authError) throw authError;

        // Update influencers table
        const { error } = await supabase
          .from("influencers")
          .update({ email: editValue })
          .eq("id", influencer.id);
        if (error) throw error;

        setInfluencer({ ...influencer, email: editValue });
        toast.success("Email updated. Check your new email for a confirmation link.");
      } else if (field === "pref_name") {
        const { error } = await supabase
          .from("influencers")
          .update({ pref_name: editValue || null })
          .eq("id", influencer.id);
        if (error) throw error;
        setInfluencer({ ...influencer, pref_name: editValue || null });
        toast.success("Display name updated.");
      } else if (field === "personal_mission") {
        const { error } = await supabase
          .from("influencers")
          .update({ personal_mission: editValue || null })
          .eq("id", influencer.id);
        if (error) throw error;
        setInfluencer({ ...influencer, personal_mission: editValue || null });
        toast.success("Personal mission updated.");
      }

      setEditingField(null);
      setEditValue("");
    } catch (err: any) {
      toast.error(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !influencer) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }

    setUploadingAvatar(true);
    try {
      const ext = file.name.split(".").pop();
      const filePath = `${influencer.id}/photo.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const fullUrl = `https://asjhkidpuhqodryczuth.supabase.co/storage/v1/object/public/avatars/${filePath}`;

      const { error: updateError } = await supabase
        .from("influencers")
        .update({ avatar_url: fullUrl })
        .eq("id", influencer.id);
      if (updateError) throw updateError;

      setInfluencer({ ...influencer, avatar_url: fullUrl });
      toast.success("Profile photo updated.");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload avatar.");
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  const addPlatform = async () => {
    if (!influencer || !newPlatformName || !newPlatformHandle) return;
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("influencer_platforms")
        .insert({
          influencer_id: influencer.id,
          platform_name: newPlatformName,
          handle: newPlatformHandle,
          follower_count: newPlatformFollowers ? parseInt(newPlatformFollowers) : null,
        })
        .select()
        .single();
      if (error) throw error;

      setPlatforms([...platforms, data]);
      setAddingPlatform(false);
      setNewPlatformName("");
      setNewPlatformHandle("");
      setNewPlatformFollowers("");
      toast.success("Platform added.");
    } catch (err: any) {
      toast.error(err.message || "Failed to add platform.");
    } finally {
      setSaving(false);
    }
  };

  const removePlatform = async (platformId: number) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("influencer_platforms")
        .delete()
        .eq("id", platformId);
      if (error) throw error;

      setPlatforms(platforms.filter((p) => p.id !== platformId));
      toast.success("Platform removed.");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove platform.");
    } finally {
      setSaving(false);
    }
  };

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
    ? influencer.avatar_url.startsWith("http")
      ? influencer.avatar_url
      : `https://asjhkidpuhqodryczuth.supabase.co/storage/v1/object/public/avatars/${influencer.avatar_url}`
    : undefined;

  return (
    <Layout>
      <div className="container-wide py-12 max-w-3xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback className="text-2xl">
                {influencer.first_name[0]}
                {influencer.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => avatarInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            >
              {uploadingAvatar ? (
                <Loader2 className="h-5 w-5 text-white animate-spin" />
              ) : (
                <Camera className="h-5 w-5 text-white" />
              )}
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {editingField === "pref_name" ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Display name"
                    className="h-9 w-48"
                  />
                  <Button size="icon" variant="ghost" onClick={() => saveField("pref_name")} disabled={saving}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={cancelEdit}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-foreground">
                    {displayName} {influencer.last_name}
                  </h1>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => startEdit("pref_name", influencer.pref_name || "")}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1">
              {editingField === "email" ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="email"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="h-8 w-64"
                  />
                  <Button size="icon" variant="ghost" onClick={() => saveField("email")} disabled={saving}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={cancelEdit}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground">{influencer.email}</p>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => startEdit("email", influencer.email)}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>

            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{influencer.state}</Badge>
              <Badge variant="outline">{influencer.status}</Badge>
            </div>
          </div>
        </div>

        {/* Personal Mission */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Personal Mission</CardTitle>
            {editingField !== "personal_mission" && (
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => startEdit("personal_mission", influencer.personal_mission || "")}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {editingField === "personal_mission" ? (
              <div className="space-y-3">
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={4}
                  maxLength={2000}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveField("personal_mission")} disabled={saving}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                {influencer.personal_mission || "No personal mission set."}
              </p>
            )}
          </CardContent>
        </Card>

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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Social Platforms</CardTitle>
            {!addingPlatform && (
              <Button size="sm" variant="outline" onClick={() => setAddingPlatform(true)}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            )}
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
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => removePlatform(p.id)}
                      disabled={saving}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                );
              })}

              {platforms.length === 0 && !addingPlatform && (
                <p className="text-sm text-muted-foreground">No platforms added yet.</p>
              )}

              {addingPlatform && (
                <div className="border rounded-lg p-4 space-y-3">
                  <Select value={newPlatformName} onValueChange={setNewPlatformName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLATFORM_OPTIONS.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Handle or URL"
                    value={newPlatformHandle}
                    onChange={(e) => setNewPlatformHandle(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Follower count (optional)"
                    value={newPlatformFollowers}
                    onChange={(e) => setNewPlatformFollowers(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={addPlatform}
                      disabled={saving || !newPlatformName || !newPlatformHandle}
                    >
                      {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                      Add Platform
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setAddingPlatform(false);
                        setNewPlatformName("");
                        setNewPlatformHandle("");
                        setNewPlatformFollowers("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
