import OperationClaimsSuccessPage from "./OperationClaimsSuccessPage";
import { LegacyFormPortal } from "@/components/intake/LegacyFormPortal";
import { UnifiedOcsRoutingForm } from "@/components/intake/UnifiedOcsRoutingForm";
import { OcsVisualEnhancements } from "@/components/ocs/OcsVisualEnhancements";

export default function OcsBillingHubPage() {
  return (
    <>
      <OperationClaimsSuccessPage />
      <OcsVisualEnhancements />
      <LegacyFormPortal targetId="ocs-routing-form">
        <UnifiedOcsRoutingForm />
      </LegacyFormPortal>
    </>
  );
}
