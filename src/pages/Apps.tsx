import { useEffect } from "react";

export default function Apps() {
  useEffect(() => {
    window.location.replace("https://bestselfs.com");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-muted-foreground">Redirecting…</p>
    </div>
  );
}
