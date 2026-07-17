import OperationClaimsSuccessPage from "./OperationClaimsSuccessPage";
import { LegacyFormPortal } from "@/components/intake/LegacyFormPortal";
import { UnifiedOcsRoutingForm } from "@/components/intake/UnifiedOcsRoutingForm";

export default function OcsBillingHubPage() {
  return (
    <>
      <OperationClaimsSuccessPage />
      <LegacyFormPortal targetId="ocs-routing-form">
        <UnifiedOcsRoutingForm />
      </LegacyFormPortal>
    </>
  );
}
