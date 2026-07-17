import BeyondTheYellowPage from "./BeyondTheYellowPage";
import { LegacyFormPortal } from "@/components/intake/LegacyFormPortal";
import { UnifiedBtyForm } from "@/components/intake/UnifiedBtyForm";

export default function BtyBillingHubPage() {
  return (
    <>
      <BeyondTheYellowPage />
      <LegacyFormPortal targetId="bty-story-form">
        <UnifiedBtyForm />
      </LegacyFormPortal>
    </>
  );
}
