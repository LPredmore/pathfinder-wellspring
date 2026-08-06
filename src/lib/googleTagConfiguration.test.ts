import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(
  new URL("../../index.html", import.meta.url),
  "utf8",
);

describe("sitewide Google tag configuration", () => {
  it("loads the canonical Analytics tag and current Ads destination once", () => {
    expect(indexHtml).toContain(
      "https://www.googletagmanager.com/gtag/js?id=G-H5X3D2DGKB",
    );
    expect(indexHtml.match(/gtag\("config", "G-H5X3D2DGKB"\)/g)).toHaveLength(1);
    expect(indexHtml.match(/gtag\("config", "AW-16798905432"\)/g)).toHaveLength(1);
    expect(indexHtml.match(/googletagmanager\.com\/gtag\/js/g)).toHaveLength(1);
  });

  it("does not restore retired Google destinations", () => {
    expect(indexHtml).not.toContain("G-TZMBM6V5DW");
    expect(indexHtml).not.toContain("AW-11339741081");
  });
});
