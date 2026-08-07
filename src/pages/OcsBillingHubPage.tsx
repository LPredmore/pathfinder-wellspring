import { useEffect } from "react";
import OperationClaimsSuccessPage from "./OperationClaimsSuccessPage";
import { LegacyFormPortal } from "@/components/intake/LegacyFormPortal";
import { UnifiedOcsRoutingForm } from "@/components/intake/UnifiedOcsRoutingForm";
import { OcsIndustryCopyEnhancements } from "@/components/ocs/OcsIndustryCopyEnhancements";
import { OcsVisualEnhancements } from "@/components/ocs/OcsVisualEnhancements";
import "@/components/ocs/ocs-visual-enhancements.css";

export default function OcsBillingHubPage() {
  // Direct entry point (/operation-claims-success?form=routing) so Google Ads'
  // guided conversion setup can land straight on the routing form.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("form") !== "routing") {
      return;
    }

    const timer = window.setTimeout(() => {
      document
        .getElementById("ocs-routing-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <OperationClaimsSuccessPage />
      <OcsVisualEnhancements />
      <OcsIndustryCopyEnhancements />
      <LegacyFormPortal targetId="ocs-routing-form">
        <UnifiedOcsRoutingForm />
      </LegacyFormPortal>
    </>
  );
}
