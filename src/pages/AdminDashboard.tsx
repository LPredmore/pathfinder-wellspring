import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlatformIcon, buildSocialUrl } from "@/components/icons/PlatformIcon";
import {
  ArrowLeft,
  Pencil,
  Plus,
  Trash2,
  Camera,
  Loader2,
  Search,
  Save,
  Settings,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Influencer = Tables<"influencers">;
type Platform = Tables<"influencer_platforms">;

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
] as const;

const STATUS_OPTIONS = [
  "new", "reviewing", "contacted", "interviewed",
  "approved", "rejected", "waitlisted", "withdrawn",
];

const PLATFORM_OPTIONS = [
  "BlueSky","Facebook","Instagram","LinkedIn","Patreon",
  "Reddit","SnapChat","TikTok","Twitch","X","YouTube",
];

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const navigate = useNavigate();

  // List state
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [allPlatforms, setAllPlatforms] = useState<Platform[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Detail state
  const [selected, setSelected] = useState<Influencer | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  // Edit states
  const [editingHeader, setEditingHeader] = useState(false);
  const [headerEdits, setHeaderEdits] = useState({
    pref_name: "",
    first_name: "",
    last_name: "",
    email: "",
    state: "",
    status: "",
    is_competing: false,
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Platform add
  const [addingPlatform, setAddingPlatform] = useState(false);
  const [newPlatformName, setNewPlatformName] = useState("");
  const [newPlatformHandle, setNewPlatformHandle] = useState("");
  const [newPlatformFollowers, setNewPlatformFollowers] = useState("");

  // Settings tab state
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);

  // Auth/role gate
  useEffect(() => {
    if (authLoading || roleLoading) return;
    if (!user || !isAdmin) {
      navigate("/", { replace: true });
    }
  }, [user, isAdmin, authLoading, roleLoading, navigate]);

  // Fetch list
  useEffect(() => {
    if (authLoading || roleLoading || !isAdmin) return;
    fetchList();
    fetchEmailSettings();
  }, [isAdmin, authLoading, roleLoading]);

  const fetchList = async () => {
    setListLoading(true);
    const [infRes, platRes] = await Promise.all([
      supabase.from("influencers").select("*").order("created_at", { ascending: false }),
      supabase.from("influencer_platforms").select("*"),
    ]);
    setInfluencers(infRes.data ?? []);
    setAllPlatforms(platRes.data ?? []);
    setListLoading(false);
  };

  const fetchEmailSettings = async () => {
    setSettingsLoading(true);
    try {
      const { data } = await supabase
        .from("site_config")
        .select("key, value")
        .in("key", ["welcome_email_subject", "welcome_email_body"]);
      if (data) {
        for (const row of data) {
          if (row.key === "welcome_email_subject") setEmailSubject(row.value);
          if (row.key === "welcome_email_body") setEmailBody(row.value);
        }
      }
    } catch (err) {
      console.error("Failed to load email settings", err);
    } finally {
      setSettingsLoading(false);
    }
  };

  const saveEmailSettings = async () => {
    setSettingsSaving(true);
    try {
      for (const { key, value } of [
        { key: "welcome_email_subject", value: emailSubject },
        { key: "welcome_email_body", value: emailBody },
      ]) {
        const { error } = await supabase
          .from("site_config")
          .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
        if (error) throw error;
      }
      toast.success("Email template saved.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save email template.");
    } finally {
      setSettingsSaving(false);
    }
  };

  const openDetail = (inf: Influencer) => {
    setSelected(inf);
    setPlatforms(allPlatforms.filter((p) => p.influencer_id === inf.id));
    setEditingHeader(false);
    setEditingField(null);
    setAddingPlatform(false);
  };

  const backToList = () => {
    setSelected(null);
    fetchList(); // refresh after potential edits
  };

  // --- Filtering ---
  const filtered = influencers.filter((inf) => {
    if (statusFilter !== "all" && inf.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const haystack = `${inf.first_name} ${inf.last_name} ${inf.pref_name ?? ""} ${inf.email}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  // --- Detail edit helpers ---
  const startHeaderEdit = () => {
    if (!selected) return;
    setEditingHeader(true);
    setHeaderEdits({
      pref_name: selected.pref_name || "",
      first_name: selected.first_name,
      last_name: selected.last_name,
      email: selected.email,
      state: selected.state,
      status: selected.status,
      is_competing: selected.is_competing,
    });
  };

  const saveHeader = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const updates: Record<string, any> = {
        pref_name: headerEdits.pref_name || null,
        first_name: headerEdits.first_name,
        last_name: headerEdits.last_name,
        email: headerEdits.email,
        state: headerEdits.state,
        status: headerEdits.status,
        is_competing: headerEdits.is_competing,
      };

      const { error } = await supabase
        .from("influencers")
        .update(updates)
        .eq("id", selected.id);
      if (error) throw error;

      setSelected({ ...selected, ...updates });
      setEditingHeader(false);
      toast.success("Profile updated.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const startFieldEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const saveField = async (field: string) => {
    if (!selected) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("influencers")
        .update({ [field]: editValue || null })
        .eq("id", selected.id);
      if (error) throw error;

      setSelected({ ...selected, [field]: editValue || null });
      setEditingField(null);
      setEditValue("");
      toast.success("Updated.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selected) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file."); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB."); return; }

    setUploadingAvatar(true);
    try {
      const ext = file.name.split(".").pop();
      const filePath = `${selected.id}/photo.${ext}`;
      const { error: upErr } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
      if (upErr) throw upErr;

      const fullUrl = `https://asjhkidpuhqodryczuth.supabase.co/storage/v1/object/public/avatars/${filePath}`;
      const { error: dbErr } = await supabase.from("influencers").update({ avatar_url: fullUrl }).eq("id", selected.id);
      if (dbErr) throw dbErr;

      setSelected({ ...selected, avatar_url: fullUrl });
      toast.success("Avatar updated.");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload avatar.");
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  const addPlatform = async () => {
    if (!selected || !newPlatformName || !newPlatformHandle) return;
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("influencer_platforms")
        .insert({
          influencer_id: selected.id,
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
      const { error } = await supabase.from("influencer_platforms").delete().eq("id", platformId);
      if (error) throw error;
      setPlatforms(platforms.filter((p) => p.id !== platformId));
      toast.success("Platform removed.");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove platform.");
    } finally {
      setSaving(false);
    }
  };

  // --- Loading / gate ---
  if (authLoading || roleLoading) {
    return (
      <Layout>
        <div className="container-wide py-16 space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) return null;

  // --- Detail View ---
  if (selected) {
    const displayName = selected.pref_name || selected.first_name;
    const avatarUrl = selected.avatar_url
      ? selected.avatar_url.startsWith("http")
        ? selected.avatar_url
        : `https://asjhkidpuhqodryczuth.supabase.co/storage/v1/object/public/avatars/${selected.avatar_url}`
      : undefined;

    return (
      <Layout>
        <div className="container-wide py-12 max-w-3xl mx-auto space-y-8">
          <Button variant="ghost" onClick={backToList} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to list
          </Button>

          {/* Profile Header */}
          <div className="flex items-start gap-6">
            <div className="relative group">
              <Avatar className="h-20 w-20">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="text-2xl">
                  {selected.first_name[0]}{selected.last_name[0]}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => avatarInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                {uploadingAvatar ? <Loader2 className="h-5 w-5 text-white animate-spin" /> : <Camera className="h-5 w-5 text-white" />}
              </button>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>

            <div className="flex-1">
              {editingHeader ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">First Name</label>
                      <Input value={headerEdits.first_name} onChange={(e) => setHeaderEdits({ ...headerEdits, first_name: e.target.value })} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Last Name</label>
                      <Input value={headerEdits.last_name} onChange={(e) => setHeaderEdits({ ...headerEdits, last_name: e.target.value })} className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Display Name</label>
                    <Input value={headerEdits.pref_name} onChange={(e) => setHeaderEdits({ ...headerEdits, pref_name: e.target.value })} placeholder="Display name (optional)" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Email</label>
                    <Input type="email" value={headerEdits.email} onChange={(e) => setHeaderEdits({ ...headerEdits, email: e.target.value })} className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">State</label>
                      <Select value={headerEdits.state} onValueChange={(val) => setHeaderEdits({ ...headerEdits, state: val })}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Status</label>
                      <Select value={headerEdits.status} onValueChange={(val) => setHeaderEdits({ ...headerEdits, status: val })}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-muted-foreground">Competing</label>
                    <input
                      type="checkbox"
                      checked={headerEdits.is_competing}
                      onChange={(e) => setHeaderEdits({ ...headerEdits, is_competing: e.target.checked })}
                      className="h-4 w-4"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveHeader} disabled={saving}>
                      {saving && <Loader2 className="h-4 w-4 animate-spin mr-1" />} Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingHeader(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-foreground">{displayName}</h1>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={startHeaderEdit}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground mt-0.5">{selected.first_name} {selected.last_name}</p>
                  <p className="text-sm text-muted-foreground">{selected.email}</p>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <Badge variant="secondary">{selected.state}</Badge>
                    <Badge variant="outline">{selected.status}</Badge>
                    {selected.is_competing && <Badge>Competing</Badge>}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Personal Mission */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Personal Mission</CardTitle>
              {editingField !== "personal_mission" && (
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => startFieldEdit("personal_mission", selected.personal_mission || "")}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {editingField === "personal_mission" ? (
                <div className="space-y-3">
                  <Textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} rows={4} maxLength={2000} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => saveField("personal_mission")} disabled={saving}>
                      {saving && <Loader2 className="h-4 w-4 animate-spin mr-1" />} Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { setEditingField(null); setEditValue(""); }}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">{selected.personal_mission || "No personal mission set."}</p>
              )}
            </CardContent>
          </Card>

          {/* Veteran Connection */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Veteran Connection</CardTitle>
              {editingField !== "veteran_connection" && (
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => startFieldEdit("veteran_connection", selected.veteran_connection || "")}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {editingField === "veteran_connection" ? (
                <div className="space-y-3">
                  <Textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} rows={4} maxLength={2000} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => saveField("veteran_connection")} disabled={saving}>
                      {saving && <Loader2 className="h-4 w-4 animate-spin mr-1" />} Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { setEditingField(null); setEditValue(""); }}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">{selected.veteran_connection || "Not set."}</p>
              )}
            </CardContent>
          </Card>

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
                  const url = p.platform_name && p.handle ? buildSocialUrl(p.platform_name, p.handle) : null;
                  return (
                    <div key={p.id} className="flex items-center gap-3">
                      <PlatformIcon platform={p.platform_name ?? ""} className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <span className="font-medium text-foreground">{p.platform_name}</span>
                        {p.handle && (
                          <>
                            {" — "}
                            {url ? (
                              <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{p.handle}</a>
                            ) : (
                              <span className="text-muted-foreground">{p.handle}</span>
                            )}
                          </>
                        )}
                        {p.follower_count != null && (
                          <span className="text-xs text-muted-foreground ml-2">({p.follower_count.toLocaleString()} followers)</span>
                        )}
                      </div>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removePlatform(p.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  );
                })}
                {platforms.length === 0 && !addingPlatform && (
                  <p className="text-sm text-muted-foreground">No platforms added.</p>
                )}
                {addingPlatform && (
                  <div className="space-y-3 border rounded-md p-4">
                    <Select value={newPlatformName} onValueChange={setNewPlatformName}>
                      <SelectTrigger><SelectValue placeholder="Select platform" /></SelectTrigger>
                      <SelectContent>
                        {PLATFORM_OPTIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Input placeholder="Handle / username" value={newPlatformHandle} onChange={(e) => setNewPlatformHandle(e.target.value)} />
                    <Input placeholder="Follower count (optional)" type="number" value={newPlatformFollowers} onChange={(e) => setNewPlatformFollowers(e.target.value)} />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={addPlatform} disabled={saving || !newPlatformName || !newPlatformHandle}>
                        {saving && <Loader2 className="h-4 w-4 animate-spin mr-1" />} Add
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setAddingPlatform(false)}>Cancel</Button>
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

  // --- List View ---
  return (
    <Layout>
      <div className="container-wide py-12 space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>

        <Tabs defaultValue="partners">
          <TabsList>
            <TabsTrigger value="partners" className="gap-1.5">
              <Users className="h-4 w-4" /> Mission Partners
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-1.5">
              <Settings className="h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="partners" className="space-y-6 mt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {listLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No influencers found.</p>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Platforms</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((inf) => {
                      const platformCount = allPlatforms.filter((p) => p.influencer_id === inf.id).length;
                      const avatarSrc = inf.avatar_url
                        ? inf.avatar_url.startsWith("http")
                          ? inf.avatar_url
                          : `https://asjhkidpuhqodryczuth.supabase.co/storage/v1/object/public/avatars/${inf.avatar_url}`
                        : undefined;

                      return (
                        <TableRow
                          key={inf.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => openDetail(inf)}
                        >
                          <TableCell>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={avatarSrc} />
                              <AvatarFallback className="text-xs">{inf.first_name[0]}{inf.last_name[0]}</AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">
                            {inf.pref_name || `${inf.first_name} ${inf.last_name}`}
                            {inf.pref_name && (
                              <span className="text-muted-foreground text-xs ml-1">({inf.first_name} {inf.last_name})</span>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{inf.email}</TableCell>
                          <TableCell><Badge variant="secondary">{inf.state}</Badge></TableCell>
                          <TableCell><Badge variant="outline">{inf.status}</Badge></TableCell>
                          <TableCell className="text-right text-muted-foreground">{platformCount}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Email Template</CardTitle>
                <CardDescription>
                  This email is automatically sent when a new Mission Partner signs up. Use placeholders to personalise the message.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {settingsLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-sm font-medium text-foreground">Subject</label>
                      <Input
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Welcome to ValorWell, {{first_name}}!"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Body</label>
                      <RichTextEditor
                        value={emailBody}
                        onChange={(html) => setEmailBody(html)}
                        placeholder="Hi {{first_name}}, your account has been created…"
                        className="mt-1"
                      />
                    </div>
                    <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Available placeholders:</p>
                      <ul className="list-disc list-inside space-y-0.5">
                        <li><code className="bg-background px-1 rounded">{`{{first_name}}`}</code> — Partner's first name</li>
                        <li><code className="bg-background px-1 rounded">{`{{last_name}}`}</code> — Partner's last name</li>
                        <li><code className="bg-background px-1 rounded">{`{{email}}`}</code> — Partner's login email</li>
                        <li><code className="bg-background px-1 rounded">{`{{password}}`}</code> — Generated temporary password</li>
                      </ul>
                    </div>
                    <Button onClick={saveEmailSettings} disabled={settingsSaving} className="gap-2">
                      {settingsSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      Save Template
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
