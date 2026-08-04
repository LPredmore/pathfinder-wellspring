import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { captureDonationAcquisition } from "@/lib/donationAttribution";

export function DonationAttributionManager() {
  const location = useLocation();

  useEffect(() => {
    captureDonationAcquisition(
      location.search,
      `${location.pathname}${location.search}`,
      document.referrer,
    );
  }, [location.pathname, location.search]);

  return null;
}
