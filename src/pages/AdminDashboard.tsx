import { useEffect, useState } from "react";
import { Loader2, LogIn, Save, Settings } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Source-project site configuration remains available to authorized Website
 * admins. Legacy influencer/contact management was intentionally removed; the
 * Billing Hub relationship-management application is canonical for that data.
 */
export default function AdminDashboard() {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authLoading || roleLoading || !isAdmin) return;
    let cancelled = false;
    setLoading(true);
    const load = async () => {
      const { data, error } = await (supabase.from("site_config" as any) as any)
        .select("key, value")
        .in("key", ["welcome_email_subject", "welcome_email_body"]);
      if (cancelled) return;
      if (error) {
        toast.error("Unable to load Website settings.");
        setLoading(false);
        return;
      }
      for (const row of (data ?? []) as { key: string; value: string }[]) {
        if (row.key === "welcome_email_subject") setEmailSubject(row.value);
        if (row.key === "welcome_email_body") setEmailBody(row.value);
      }
      setLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, [authLoading, isAdmin, roleLoading]);

  const save = async () => {
    setSaving(true);
    for (const entry of [
      { key: "welcome_email_subject", value: emailSubject },
      { key: "welcome_email_body", value: emailBody },
    ]) {
      const { error } = await supabase
        .from("site_config")
        .upsert({ ...entry, updated_at: new Date().toISOString() }, { onConflict: "key" });
      if (error) {
        toast.error("Unable to save Website settings.");
        setSaving(false);
        return;
      }
    }
    toast.success("Website settings saved.");
    setSaving(false);
  };

  const submitLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setSigningIn(true);
    setLoginError("");
    const { error } = await signIn(loginEmail.trim().toLowerCase(), loginPassword);
    if (error) setLoginError("Unable to sign in with those credentials.");
    setSigningIn(false);
  };

  if (authLoading) return null;

  if (!user) {
    return (
      <Layout>
        <div className="container-narrow py-12">
          <Card className="mx-auto max-w-md">
            <CardHeader><CardTitle>Website admin sign in</CardTitle><CardDescription>For authorized Website administrators only.</CardDescription></CardHeader>
            <CardContent>
              <form onSubmit={submitLogin} className="space-y-4">
                <div><label htmlFor="admin-email" className="text-sm font-medium">Email</label><Input id="admin-email" type="email" required value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} className="mt-1" /></div>
                <div><label htmlFor="admin-password" className="text-sm font-medium">Password</label><Input id="admin-password" type="password" required value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} className="mt-1" /></div>
                {loginError && <p role="alert" className="text-sm text-destructive">{loginError}</p>}
                <Button type="submit" disabled={signingIn} className="w-full gap-2">{signingIn ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <LogIn className="h-4 w-4" aria-hidden />} Sign in</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (roleLoading) return null;

  if (!isAdmin) {
    return (
      <Layout><div className="container-narrow py-12 text-center"><h1 className="text-2xl font-bold">Access denied</h1><p className="mt-2 text-muted-foreground">This account is not a Website administrator.</p><Button className="mt-6" variant="outline" onClick={signOut}>Sign out</Button></div></Layout>
    );
  }

  return (
    <Layout>
      <div className="container-wide py-12">
        <div className="mb-6 flex items-center gap-3">
          <Settings className="h-6 w-6" aria-hidden />
          <h1 className="text-3xl font-bold text-foreground">Website settings</h1>
        </div>
        <Card className="max-w-4xl">
          <CardHeader>
            <CardTitle>Legacy email-template archive</CardTitle>
            <CardDescription>
              These source-project values are retained for unrelated Website administration and historical reference. The retired creator-interest workflow no longer sends this template or creates login credentials.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <><Skeleton className="h-10 w-full" /><Skeleton className="h-48 w-full" /></>
            ) : (
              <>
                <div>
                  <label htmlFor="legacy-email-subject" className="text-sm font-medium text-foreground">Subject</label>
                  <Input id="legacy-email-subject" value={emailSubject} onChange={(event) => setEmailSubject(event.target.value)} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Body</label>
                  <RichTextEditor value={emailBody} onChange={setEmailBody} className="mt-1" />
                </div>
                <Button onClick={save} disabled={saving} className="gap-2">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Save className="h-4 w-4" aria-hidden />}
                  Save settings
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
