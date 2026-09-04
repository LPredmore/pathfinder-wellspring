import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import OperationClaimsSuccessPage from "./OperationClaimsSuccessPage";
import { LegacyFormPortal } from "@/components/intake/LegacyFormPortal";
import { UnifiedOcsRoutingForm } from "@/components/intake/UnifiedOcsRoutingForm";
import { OcsIndustryCopyEnhancements } from "@/components/ocs/OcsIndustryCopyEnhancements";
import { OcsVisualEnhancements } from "@/components/ocs/OcsVisualEnhancements";
import "@/components/ocs/ocs-visual-enhancements.css";

export default function OcsBillingHubPage() {
  // Direct entry point (/operation-claims-success?form=routing) remains intact
  // so historical/reference access and the existing routing form continue to work.
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
      <Helmet>
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <OperationClaimsSuccessPage />
      <OcsVisualEnhancements />
      <OcsIndustryCopyEnhancements />
      <LegacyFormPortal targetId="ocs-routing-form">
        <UnifiedOcsRoutingForm />
      </LegacyFormPortal>
    </>
  );
}
